const RESPONSE_SHEET_NAME = "Risposte";
const RESPONSE_HEADERS = [
  "Inviato il",
  "ID quiz",
  "Quiz",
  "Nome",
  "Cognome",
  "Punteggio",
  "Totale"
];

function doGet() {
  return ContentService.createTextOutput("Endpoint quiz attivo. Puoi chiudere questa pagina.");
}

function testSpreadsheetAccess() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) throw new Error("Aggiungi SPREADSHEET_ID nelle proprietà script.");

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(RESPONSE_SHEET_NAME);
  const message = sheet
    ? `Foglio accessibile: ${spreadsheet.getName()}; scheda ${RESPONSE_SHEET_NAME} presente.`
    : `Foglio accessibile: ${spreadsheet.getName()}; la scheda ${RESPONSE_SHEET_NAME} verrà creata al primo invio.`;
  console.log(message);
  return message;
}

function doPost(event) {
  let payload;
  try {
    payload = JSON.parse(event.parameter.payload || "{}");
    const result = payload.action === "submit"
      ? saveSubmission_(payload)
      : payload.action === "results"
        ? readSubmissions_(payload)
        : { ok: false, error: "Operazione non riconosciuta." };
    return sendMessage_(payload.nonce, result);
  } catch (error) {
    console.error(error);
    const errorCode = error && error.message;
    return sendMessage_(payload && payload.nonce, {
      ok: false,
      error: errorCode === "SPREADSHEET_ID_NOT_CONFIGURED"
        ? "Foglio Google non configurato: aggiungi la proprietà script SPREADSHEET_ID con l’ID del foglio."
        : errorCode === "SPREADSHEET_ACCESS_FAILED"
          ? "Accesso al foglio negato. Verifica SPREADSHEET_ID e che il proprietario del deployment possa modificare il foglio."
          : errorCode === "RESPONSE_SAVE_FAILED"
            ? "Non riesco a scrivere nel foglio. Controlla i permessi di modifica e le protezioni della scheda Risposte."
            : errorCode === "RESPONSE_SHEET_SETUP_FAILED"
              ? "Non riesco a preparare la scheda Risposte. Controlla i permessi di modifica del foglio."
              : errorCode === "QUESTION_COLUMN_CONFLICT"
                ? "Le colonne delle domande nel foglio non corrispondono. Non sono state aggiunte nuove risposte."
              : "Errore durante l’accesso al foglio Google. Controlla l’ID, le autorizzazioni e la scheda Risposte."
    });
  }
}

function saveSubmission_(payload) {
  const answers = payload.answers;
  if (!isText_(payload.quizId, 120) || !isText_(payload.quizTitle, 200) ||
      !isText_(payload.firstName, 80) || !isText_(payload.lastName, 80) ||
      !Array.isArray(answers) || answers.length === 0 || answers.length > 200 ||
      answers.some((answer) => !answer || !isText_(answer.question, 500) ||
        !isText_(answer.selectedAnswer, 1000) || !isText_(answer.correctAnswer, 1000) ||
        typeof answer.isCorrect !== "boolean")) {
    return { ok: false, error: "I dati inviati non sono validi; nessuna risposta è stata salvata." };
  }

  const score = answers.filter((answer) => answer.isCorrect).length;
  const sheet = getResponseSheet_();
  try {
    const firstQuestionColumn = ensureQuestionColumns_(sheet, answers.length);
    const row = new Array(sheet.getLastColumn()).fill("");
    row.splice(0, 7,
      new Date(),
      safeCell_(payload.quizId),
      safeCell_(payload.quizTitle),
      safeCell_(payload.firstName),
      safeCell_(payload.lastName),
      score,
      answers.length
    );
    answers.forEach((answer, index) => {
      row[firstQuestionColumn - 1 + index] = safeCell_([
        `Domanda: ${answer.question}`,
        `Risposta scelta: ${answer.selectedAnswer}`,
        `Esito: ${answer.isCorrect ? "Corretta" : "Errata"}`,
        `Risposta corretta: ${answer.correctAnswer}`
      ].join("\n"));
    });
    sheet.appendRow(row);
  } catch (error) {
    console.error(error);
    if (error && error.message === "QUESTION_COLUMN_CONFLICT") throw error;
    if (error && error.message === "RESPONSE_SHEET_SETUP_FAILED") throw error;
    throw new Error("RESPONSE_SAVE_FAILED");
  }
  return { ok: true };
}

function readSubmissions_(payload) {
  const expectedToken = PropertiesService.getScriptProperties().getProperty("ADMIN_TOKEN");
  if (!expectedToken || !constantTimeEquals_(String(payload.adminToken || ""), expectedToken)) {
    return { ok: false, error: "Codice docente non valido." };
  }
  if (!isText_(payload.quizId, 120)) {
    return { ok: false, error: "ID quiz non valido." };
  }

  const sheet = getResponseSheet_();
  const rows = sheet.getDataRange().getValues();
  const submissions = rows.slice(1)
    .filter((row) => row[1] === payload.quizId)
    .map((row) => ({
      submittedAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
      quizTitle: String(row[2]),
      firstName: String(row[3]),
      lastName: String(row[4]),
      score: Number(row[5]),
      total: Number(row[6]),
      answers: JSON.parse(String(row[7]))
    }))
    .reverse();

  return { ok: true, submissions };
}

function getResponseSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) throw new Error("SPREADSHEET_ID_NOT_CONFIGURED");

  let spreadsheet;
  try {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } catch (error) {
    console.error(error);
    throw new Error("SPREADSHEET_ACCESS_FAILED");
  }
  try {
    let sheet = spreadsheet.getSheetByName(RESPONSE_SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(RESPONSE_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(RESPONSE_HEADERS);
      sheet.setFrozenRows(1);
    }
    return sheet;
  } catch (error) {
    console.error(error);
    throw new Error("RESPONSE_SHEET_SETUP_FAILED");
  }
}

function ensureQuestionColumns_(sheet, questionCount) {
  try {
    const lastColumn = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    const legacyAnswersColumn = headers.indexOf("Risposte");
    const firstQuestionColumn = legacyAnswersColumn >= 0
      ? legacyAnswersColumn + 2
      : RESPONSE_HEADERS.length + 1;
    const neededLastColumn = firstQuestionColumn + questionCount - 1;

    if (lastColumn < neededLastColumn) {
      sheet.insertColumnsAfter(lastColumn, neededLastColumn - lastColumn);
    }

    for (let index = 0; index < questionCount; index += 1) {
      const column = firstQuestionColumn + index;
      const expectedHeader = `Domanda ${index + 1}`;
      const currentHeader = headers[column - 1];
      if (currentHeader && currentHeader !== expectedHeader) {
        throw new Error("QUESTION_COLUMN_CONFLICT");
      }
      if (!currentHeader) sheet.getRange(1, column).setValue(expectedHeader);
    }

    return firstQuestionColumn;
  } catch (error) {
    if (error && error.message === "QUESTION_COLUMN_CONFLICT") throw error;
    console.error(error);
    throw new Error("RESPONSE_SHEET_SETUP_FAILED");
  }
}

function sendMessage_(nonce, result) {
  const message = JSON.stringify({ ...result, nonce: String(nonce || "") })
    .replace(/</g, "\\u003c");
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
    <script>
      const response = ${message};
      window.parent.postMessage(response, "*");
      if (window.top !== window.parent) window.top.postMessage(response, "*");
    </script>
    <p>Richiesta completata. Puoi tornare alla pagina del quiz.</p>
  </body></html>`;
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function isText_(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function safeCell_(value) {
  const text = String(value).trim();
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

function constantTimeEquals_(actual, expected) {
  if (actual.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < actual.length; index += 1) {
    difference |= actual.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}
