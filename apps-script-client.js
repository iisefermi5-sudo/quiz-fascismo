"use strict";

window.appsScriptEndpoint = "https://script.google.com/macros/s/AKfycbzCRcUSHbs2-gmd3fu1pAnUPBw9FDFYJLGCdQKTz1aVgPiuGnnnx01f2frs3njl0CAp/exec";

window.isGoogleAppsScriptUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "script.google.com" &&
      /^\/macros\/s\/[^/]+\/exec$/.test(url.pathname);
  } catch {
    return false;
  }
};

window.postQuizRequest = (endpoint, payload) => new Promise((resolve, reject) => {
  if (!window.isGoogleAppsScriptUrl(endpoint)) {
    reject(new Error("URL Google Apps Script non valido."));
    return;
  }

  const nonce = crypto.randomUUID();
  const frameName = `quiz-response-${nonce}`;
  const frame = document.createElement("iframe");
  frame.name = frameName;
  frame.title = "Connessione sicura al foglio delle risposte";
  frame.hidden = true;

  const form = document.createElement("form");
  form.method = "post";
  form.action = endpoint;
  form.target = frameName;
  form.hidden = true;

  const payloadField = document.createElement("input");
  payloadField.type = "hidden";
  payloadField.name = "payload";
  payloadField.value = JSON.stringify({ ...payload, nonce });
  form.append(payloadField);

  const cleanUp = () => {
    window.removeEventListener("message", onMessage);
    window.clearTimeout(timeout);
    form.remove();
    frame.remove();
  };

  const onMessage = (event) => {
    const trustedOrigin = event.origin === "https://script.google.com" ||
      /^https:\/\/(?:[a-z0-9-]+\.)*googleusercontent\.com$/.test(event.origin);
    if (!trustedOrigin ||
        !event.data || event.data.nonce !== nonce) return;
    cleanUp();
    if (event.data.ok) resolve(event.data);
    else reject(new Error(event.data.error || "La richiesta a Google Sheets non è riuscita."));
  };

  const timeout = window.setTimeout(() => {
    cleanUp();
    reject(new Error("Apps Script non ha restituito una risposta. Verifica che l’URL termini in /exec, che l’accesso sia impostato su “Chiunque” e che il deployment usi la versione aggiornata di Code.gs."));
  }, 30000);

  window.addEventListener("message", onMessage);
  document.body.append(frame, form);
  form.submit();
});
