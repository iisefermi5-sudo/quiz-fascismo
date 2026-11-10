"use strict";

const storageKey = "quiz-fascismo.saved-quizzes";
const quizListElement = document.getElementById("quiz-list");
const editorElement = document.getElementById("editor");
const emptyStateElement = document.getElementById("empty-state");
const titleInput = document.getElementById("quiz-title-input");
const introInput = document.getElementById("quiz-intro-input");
const questionListElement = document.getElementById("question-list");
const saveStatus = document.getElementById("save-status");
const sharePanel = document.getElementById("share-panel");
const shareUrlInput = document.getElementById("share-url");
const previewLink = document.getElementById("open-preview");
const adminTokenInput = document.getElementById("admin-token");
const backendStatus = document.getElementById("backend-status");
const responsesPanel = document.getElementById("responses-panel");
const responsesList = document.getElementById("responses-list");

function cloneQuiz(quiz) {
  return JSON.parse(JSON.stringify(quiz));
}

function createEmptyQuiz() {
  return {
    id: crypto.randomUUID(),
    title: "Nuovo quiz",
    intro: "",
    questions: [{
      question: "",
      answers: ["", ""],
      correct: 0,
      explanation: ""
    }]
  };
}

function loadQuizzes() {
  const saved = localStorage.getItem(storageKey);
  if (saved === null) {
    return [{
      id: "quiz-storia",
      ...cloneQuiz(window.defaultQuiz)
    }];
  }

  const quizzes = JSON.parse(saved);
  if (!Array.isArray(quizzes) || quizzes.some((quiz) =>
    typeof quiz.id !== "string" || typeof quiz.title !== "string" ||
    typeof quiz.intro !== "string" || !Array.isArray(quiz.questions) ||
    quiz.questions.some((item) => !item || typeof item.question !== "string" ||
      !Array.isArray(item.answers) || !Number.isInteger(item.correct) ||
      typeof item.explanation !== "string"))) {
    throw new Error("Archivio dei quiz non valido.");
  }
  return quizzes;
}

let quizzes;
let storageLoadFailed = false;
try {
  quizzes = loadQuizzes();
} catch (error) {
  storageLoadFailed = true;
  saveStatus.textContent = "Impossibile leggere i quiz salvati in questo browser.";
  console.error(error);
  quizzes = [{ id: "quiz-storia", ...cloneQuiz(window.defaultQuiz) }];
}

if (quizzes.length === 0) quizzes.push(createEmptyQuiz());
let activeQuizId = quizzes[0]?.id ?? null;

function getActiveQuiz() {
  return quizzes.find((quiz) => quiz.id === activeQuizId) ?? null;
}

function saveQuizzes() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(quizzes));
    saveStatus.textContent = "Modifiche salvate in questo browser.";
    renderQuizList();
    return true;
  } catch (error) {
    saveStatus.textContent = "Salvataggio non riuscito: controlla lo spazio disponibile nel browser.";
    console.error(error);
    return false;
  }
}

function renderQuizList() {
  quizListElement.replaceChildren();
  quizzes.forEach((quiz) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-list-item";
    button.classList.toggle("selected", quiz.id === activeQuizId);
    button.setAttribute("aria-current", quiz.id === activeQuizId ? "true" : "false");

    const name = document.createElement("span");
    name.className = "quiz-list-name";
    name.textContent = quiz.title || "Senza titolo";
    const count = document.createElement("span");
    count.className = "quiz-list-count";
    count.textContent = `${quiz.questions.length} domande`;
    button.append(name, count);
    button.addEventListener("click", () => {
      activeQuizId = quiz.id;
      sharePanel.hidden = true;
      responsesPanel.hidden = true;
      renderQuizList();
      renderEditor();
    });
    quizListElement.append(button);
  });
}

function makeField(labelText, value, options = {}) {
  const label = document.createElement("label");
  label.className = "form-field";
  label.append(document.createTextNode(labelText));

  const control = options.multiline
    ? document.createElement("textarea")
    : document.createElement("input");
  if (!options.multiline) control.type = options.type ?? "text";
  if (options.rows) control.rows = options.rows;
  if (options.maxLength) control.maxLength = options.maxLength;
  control.value = value;
  label.append(control);
  return { label, control };
}

function renderQuestions(quiz) {
  questionListElement.replaceChildren();
  quiz.questions.forEach((item, questionIndex) => {
    const card = document.createElement("fieldset");
    card.className = "question-card";

    const legend = document.createElement("legend");
    legend.textContent = `Domanda ${questionIndex + 1}`;
    card.append(legend);

    const heading = document.createElement("div");
    heading.className = "question-card-heading";
    const removeQuestion = document.createElement("button");
    removeQuestion.type = "button";
    removeQuestion.className = "delete-button";
    removeQuestion.textContent = "Elimina";
    removeQuestion.addEventListener("click", () => {
      quiz.questions.splice(questionIndex, 1);
      sharePanel.hidden = true;
      saveQuizzes();
      renderEditor();
    });
    heading.append(removeQuestion);
    card.append(heading);

    const questionField = makeField("Testo della domanda", item.question, {
      multiline: true,
      rows: 2,
      maxLength: 500
    });
    questionField.control.addEventListener("input", () => {
      item.question = questionField.control.value;
      sharePanel.hidden = true;
      saveQuizzes();
    });
    card.append(questionField.label);

    const answersHeading = document.createElement("p");
    answersHeading.className = "answers-heading";
    answersHeading.textContent = "Risposte (seleziona quella corretta)";
    card.append(answersHeading);

    item.answers.forEach((answer, answerIndex) => {
      const answerRow = document.createElement("div");
      answerRow.className = "answer-editor";
      const correctLabel = document.createElement("label");
      correctLabel.className = "correct-choice";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `correct-${quiz.id}-${questionIndex}`;
      radio.value = String(answerIndex);
      radio.checked = item.correct === answerIndex;
      radio.setAttribute("aria-label", `Segna la risposta ${answerIndex + 1} come corretta`);
      radio.addEventListener("change", () => {
        item.correct = answerIndex;
        sharePanel.hidden = true;
        saveQuizzes();
      });
      correctLabel.append(radio, document.createTextNode("Corretta"));

      const answerInput = document.createElement("input");
      answerInput.type = "text";
      answerInput.maxLength = 300;
      answerInput.value = answer;
      answerInput.setAttribute("aria-label", `Testo della risposta ${answerIndex + 1}`);
      answerInput.addEventListener("input", () => {
        item.answers[answerIndex] = answerInput.value;
        sharePanel.hidden = true;
        saveQuizzes();
      });

      const removeAnswer = document.createElement("button");
      removeAnswer.type = "button";
      removeAnswer.className = "delete-button";
      removeAnswer.textContent = "Rimuovi";
      removeAnswer.disabled = item.answers.length <= 2;
      removeAnswer.addEventListener("click", () => {
        item.answers.splice(answerIndex, 1);
        if (item.correct === answerIndex) item.correct = 0;
        else if (item.correct > answerIndex) item.correct -= 1;
        sharePanel.hidden = true;
        saveQuizzes();
        renderEditor();
      });
      answerRow.append(correctLabel, answerInput, removeAnswer);
      card.append(answerRow);
    });

    const addAnswer = document.createElement("button");
    addAnswer.type = "button";
    addAnswer.className = "text-button";
    addAnswer.textContent = "Aggiungi risposta";
    addAnswer.disabled = item.answers.length >= 8;
    addAnswer.addEventListener("click", () => {
      item.answers.push("");
      sharePanel.hidden = true;
      saveQuizzes();
      renderEditor();
      questionListElement.lastElementChild?.scrollIntoView({ block: "nearest" });
    });
    card.append(addAnswer);

    const explanationField = makeField("Spiegazione dopo la risposta (facoltativa)", item.explanation, {
      multiline: true,
      rows: 3,
      maxLength: 1000
    });
    explanationField.control.addEventListener("input", () => {
      item.explanation = explanationField.control.value;
      sharePanel.hidden = true;
      saveQuizzes();
    });
    card.append(explanationField.label);
    questionListElement.append(card);
  });
}

function renderEditor() {
  const quiz = getActiveQuiz();
  editorElement.hidden = !quiz;
  emptyStateElement.hidden = Boolean(quiz);
  if (!quiz) return;

  titleInput.value = quiz.title;
  introInput.value = quiz.intro;
  renderQuestions(quiz);
}

function validateQuiz(quiz) {
  if (!quiz.title.trim()) return "Inserisci un titolo per il quiz.";
  if (quiz.questions.length === 0) return "Aggiungi almeno una domanda.";
  for (const [index, item] of quiz.questions.entries()) {
    if (!item.question.trim()) return `Completa il testo della domanda ${index + 1}.`;
    if (item.answers.length < 2 || item.answers.length > 8) return `La domanda ${index + 1} deve avere da 2 a 8 risposte.`;
    if (item.answers.some((answer) => !answer.trim())) return `Completa tutte le risposte della domanda ${index + 1}.`;
    if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct >= item.answers.length) {
      return `Seleziona la risposta corretta della domanda ${index + 1}.`;
    }
  }
  return "";
}

function encodeQuiz(quiz) {
  const bytes = new TextEncoder().encode(JSON.stringify(quiz));
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function renderResponses(submissions) {
  responsesList.replaceChildren();
  if (submissions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "save-status";
    empty.textContent = "Non sono ancora arrivate risposte per questo quiz.";
    responsesList.append(empty);
    return;
  }

  submissions.forEach((submission) => {
    const card = document.createElement("article");
    card.className = "response-card";
    const heading = document.createElement("div");
    heading.className = "response-heading";
    const participant = document.createElement("h4");
    participant.textContent = `${submission.firstName} ${submission.lastName}`;
    const score = document.createElement("strong");
    score.className = "response-score";
    score.textContent = `${submission.score} / ${submission.total}`;
    heading.append(participant, score);
    card.append(heading);

    const submittedAt = document.createElement("p");
    submittedAt.className = "response-date";
    const date = new Date(submission.submittedAt);
    submittedAt.textContent = Number.isNaN(date.getTime())
      ? "Data non disponibile"
      : date.toLocaleString("it-IT");
    card.append(submittedAt);

    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Vedi le risposte";
    const list = document.createElement("ol");
    list.className = "response-answers";
    submission.answers.forEach((answer) => {
      const item = document.createElement("li");
      const question = document.createElement("strong");
      question.textContent = answer.question;
      const selected = document.createElement("p");
      selected.textContent = `Risposta data: ${answer.selectedAnswer}`;
      const correct = document.createElement("p");
      correct.className = answer.isCorrect ? "response-correct" : "response-incorrect";
      correct.textContent = answer.isCorrect
        ? "Corretta"
        : `Corretta: ${answer.correctAnswer}`;
      item.append(question, selected, correct);
      list.append(item);
    });
    details.append(summary, list);
    card.append(details);
    responsesList.append(card);
  });
}

document.getElementById("load-responses").addEventListener("click", async () => {
  const quiz = getActiveQuiz();
  const adminToken = adminTokenInput.value;
  adminTokenInput.value = "";
  responsesPanel.hidden = true;

  if (!quiz) {
    backendStatus.textContent = "Seleziona un quiz per consultare i risultati.";
    return;
  }
  if (!window.isGoogleAppsScriptUrl(window.appsScriptEndpoint)) {
    backendStatus.textContent = "Configurazione Apps Script non valida. Contatta il responsabile del sito.";
    return;
  }
  if (!adminToken) {
    backendStatus.textContent = "Inserisci il codice docente configurato in Apps Script.";
    return;
  }

  backendStatus.textContent = "Caricamento delle risposte…";
  const loadButton = document.getElementById("load-responses");
  loadButton.disabled = true;
  try {
    const result = await window.postQuizRequest(window.appsScriptEndpoint, {
      action: "results",
      quizId: quiz.id,
      adminToken
    });
    renderResponses(result.submissions);
    responsesPanel.hidden = false;
    backendStatus.textContent = `${result.submissions.length} risposte trovate per “${quiz.title}”.`;
  } catch (error) {
    backendStatus.textContent = `Impossibile caricare le risposte: ${error.message}`;
    console.error(error);
  } finally {
    loadButton.disabled = false;
  }
});

titleInput.addEventListener("input", () => {
  const quiz = getActiveQuiz();
  if (!quiz) return;
  quiz.title = titleInput.value;
  sharePanel.hidden = true;
  saveQuizzes();
});

introInput.addEventListener("input", () => {
  const quiz = getActiveQuiz();
  if (!quiz) return;
  quiz.intro = introInput.value;
  sharePanel.hidden = true;
  saveQuizzes();
});

document.getElementById("new-quiz").addEventListener("click", () => {
  const quiz = createEmptyQuiz();
  quizzes.push(quiz);
  activeQuizId = quiz.id;
  sharePanel.hidden = true;
  saveQuizzes();
  renderEditor();
  titleInput.focus();
});

document.getElementById("delete-quiz").addEventListener("click", () => {
  const quiz = getActiveQuiz();
  if (!quiz || !window.confirm(`Eliminare il quiz “${quiz.title}”?`)) return;
  quizzes = quizzes.filter((item) => item.id !== quiz.id);
  if (quizzes.length === 0) quizzes.push(createEmptyQuiz());
  activeQuizId = quizzes[0].id;
  sharePanel.hidden = true;
  saveQuizzes();
  renderEditor();
});

document.getElementById("add-question").addEventListener("click", () => {
  const quiz = getActiveQuiz();
  if (!quiz) return;
  quiz.questions.push({ question: "", answers: ["", ""], correct: 0, explanation: "" });
  sharePanel.hidden = true;
  saveQuizzes();
  renderEditor();
  questionListElement.lastElementChild?.scrollIntoView({ block: "nearest" });
});

document.getElementById("share-quiz").addEventListener("click", () => {
  const quiz = getActiveQuiz();
  if (!quiz) return;
  const error = validateQuiz(quiz);
  if (error) {
    saveStatus.textContent = error;
    return;
  }
  const shareQuiz = {
    id: quiz.id,
    title: quiz.title.trim(),
    intro: quiz.intro.trim(),
    submissionEndpoint: window.appsScriptEndpoint,
    questions: quiz.questions
  };
  const quizUrl = new URL("quiz.html", window.location.href);
  quizUrl.hash = `quiz=${encodeQuiz(shareQuiz)}`;
  shareUrlInput.value = quizUrl.href;
  previewLink.href = quizUrl.href;
  sharePanel.hidden = false;
  saveStatus.textContent = "Link pronto da condividere.";
});

document.getElementById("copy-link").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrlInput.value);
    saveStatus.textContent = "Link copiato negli appunti.";
  } catch (error) {
    shareUrlInput.focus();
    shareUrlInput.select();
    saveStatus.textContent = "Copia automatica non disponibile: seleziona e copia il link.";
    console.error(error);
  }
});

renderQuizList();
renderEditor();
if (!storageLoadFailed) saveQuizzes();
