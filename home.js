"use strict";

const assignedQuizForm = document.getElementById("assigned-quiz-form");
const assignedQuizInput = document.getElementById("assigned-quiz-url");
const assignedQuizError = document.getElementById("assigned-quiz-error");

assignedQuizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  assignedQuizError.hidden = true;

  let quizUrl;
  try {
    quizUrl = new URL(assignedQuizInput.value);
  } catch (error) {
    assignedQuizError.textContent = "Inserisci un link del quiz valido.";
    assignedQuizError.hidden = false;
    return;
  }

  const expectedQuizPath = new URL("quiz.html", window.location.href).pathname;
  const legacyQuizPath = new URL("quiz-fascismo.html", window.location.href).pathname;
  if (quizUrl.origin !== window.location.origin ||
      ![expectedQuizPath, legacyQuizPath].includes(quizUrl.pathname) ||
      !quizUrl.hash.startsWith("#quiz=")) {
    assignedQuizError.textContent = "Il link non sembra appartenere a un quiz condiviso di questo sito.";
    assignedQuizError.hidden = false;
    return;
  }

  window.location.assign(quizUrl.href);
});
