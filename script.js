
    "use strict";

const encodedQuestions = "W3sicXVlc3Rpb24iOiJJbiBxdWFsZSBhbm5vIHNpIHN2b2xzZSBsYSBtYXJjaWEgc3UgUm9tYSwgY2hlIGNvbnRyaWJ1w6wgYWxs4oCZYXNjZXNhIGRpIE11c3NvbGluaSBhbCBnb3Zlcm5vPyIsImFuc3dlcnMiOlsiMTkxOSIsIjE5MjIiLCIxOTI1IiwiMTkyOSJdLCJjb3JyZWN0IjoxLCJleHBsYW5hdGlvbiI6IkxhIG1hcmNpYSBzdSBSb21hIGViYmUgbHVvZ28gbmVsbOKAmW90dG9icmUgMTkyMi4gSWwgcmUgVml0dG9yaW8gRW1hbnVlbGUgSUlJIGFmZmlkw7IgYSBNdXNzb2xpbmkgbOKAmWluY2FyaWNvIGRpIGZvcm1hcmUgaWwgZ292ZXJubzogbGEgcHJlc2EgZGVsIHBvdGVyZSBhdnZlbm5lIHF1aW5kaSBhdHRyYXZlcnNvIHVuYSBub21pbmEgaXN0aXR1emlvbmFsZSBzb3R0byBsYSBwcmVzc2lvbmUgZGVsbGEgbW9iaWxpdGF6aW9uZSBmYXNjaXN0YS4ifSx7InF1ZXN0aW9uIjoiUXVhbGUgY2FyaWNhIGFzc3Vuc2UgQmVuaXRvIE11c3NvbGluaSBkb3BvIGVzc2VyZSBzdGF0byBub21pbmF0byBkYWwgcmUgbmVsIDE5MjI/IiwiYW5zd2VycyI6WyJQcmVzaWRlbnRlIGRlbGxhIFJlcHViYmxpY2EiLCJQcmVzaWRlbnRlIGRlbCBTZW5hdG8iLCJQcmVzaWRlbnRlIGRlbCBDb25zaWdsaW8gZGVpIG1pbmlzdHJpIiwiTWluaXN0cm8gZGVsbGEgR3VlcnJhIl0sImNvcnJlY3QiOjIsImV4cGxhbmF0aW9uIjoiTXVzc29saW5pIGRpdmVubmUgUHJlc2lkZW50ZSBkZWwgQ29uc2lnbGlvIGRlaSBtaW5pc3RyaSwgYWxsb3JhIGZvcm1hbG1lbnRlIGEgY2FwbyBkaSB1biBnb3Zlcm5vIGRpIGNvYWxpemlvbmUuIE5laSBzdWNjZXNzaXZpIGFubmkgdHJhc2Zvcm3DsiBwcm9ncmVzc2l2YW1lbnRlIGlsIHNpc3RlbWEgbGliZXJhbGUgaW4gdW5hIGRpdHRhdHVyYSBhIHBhcnRpdG8gdW5pY28uIn0seyJxdWVzdGlvbiI6IkNoZSBjb3NhIGFjY2FkZGUgZG9wbyBpbCByYXBpbWVudG8gZSBs4oCZYXNzYXNzaW5pbyBkZWwgZGVwdXRhdG8gc29jaWFsaXN0YSBHaWFjb21vIE1hdHRlb3R0aSBuZWwgMTkyND8iLCJhbnN3ZXJzIjpbIk11c3NvbGluaSBzaSBkaW1pc2UgZSBpbCBmYXNjaXNtbyBmdSBzY2lvbHRvIiwiTGUgb3Bwb3NpemlvbmkgbGFzY2lhcm9ubyBpbCBQYXJsYW1lbnRvIGNvbiBsYSBzZWNlc3Npb25lIGRlbGzigJlBdmVudGlubyIsIklsIHJlIGFiZGljw7IiLCJTaSB0ZW5uZXJvIG51b3ZlIGVsZXppb25pIGxpYmVyZSJdLCJjb3JyZWN0IjoxLCJleHBsYW5hdGlvbiI6IkRvcG8gaWwgZGVsaXR0byBNYXR0ZW90dGksIG1vbHRpIGRlcHV0YXRpIGRpIG9wcG9zaXppb25lIGFiYmFuZG9uYXJvbm8gaWwgUGFybGFtZW50bzogZnUgbGEgc2VjZXNzaW9uZSBkZWxs4oCZQXZlbnRpbm8uIElsIDMgZ2VubmFpbyAxOTI1IE11c3NvbGluaSByaXZlbmRpY8OyIGxhIHJlc3BvbnNhYmlsaXTDoCBwb2xpdGljYSBkZWwgY2xpbWEgZGkgdmlvbGVuemEgZSBhdnZpw7IgYXBlcnRhbWVudGUgbGEgY29zdHJ1emlvbmUgZGVsbGEgZGl0dGF0dXJhLiJ9LHsicXVlc3Rpb24iOiJDaGUgY29zYSBmdXJvbm8gbGUgY29zaWRkZXR0ZSBsZWdnaSBmYXNjaXN0aXNzaW1lLCBhcHByb3ZhdGUgc29wcmF0dHV0dG8gdHJhIGlsIDE5MjUgZSBpbCAxOTI2PyIsImFuc3dlcnMiOlsiUmlmb3JtZSBjaGUgYW1wbGlhcm9ubyBsYSBsaWJlcnTDoCBkaSBzdGFtcGEiLCJQcm92dmVkaW1lbnRpIGNoZSBpbnN0YXVyYXJvbm8gbGEgZGl0dGF0dXJhIGUgc29wcHJlc3Nlcm8gbGUgbGliZXJ0w6AgcG9saXRpY2hlIiwiTGVnZ2kgcGVyIGFib2xpcmUgbGEgbW9uYXJjaGlhIiwiQWNjb3JkaSBwZXIgZm9uZGFyZSBsYSBTb2NpZXTDoCBkZWxsZSBOYXppb25pIl0sImNvcnJlY3QiOjEsImV4cGxhbmF0aW9uIjoiTGUgbGVnZ2kgZmFzY2lzdGlzc2ltZSBjb25zb2xpZGFyb25vIGxhIGRpdHRhdHVyYTogbGltaXRhcm9ubyBsYSBzdGFtcGEsIHNjaW9sc2VybyBpIHBhcnRpdGkgZGkgb3Bwb3NpemlvbmUsIHJhZmZvcnphcm9ubyBpbCBwb3RlcmUgZXNlY3V0aXZvIGUgaXN0aXR1aXJvbm8gc3RydW1lbnRpIGRpIHJlcHJlc3Npb25lIGNvbWUgaWwgVHJpYnVuYWxlIHNwZWNpYWxlIHBlciBsYSBkaWZlc2EgZGVsbG8gU3RhdG8uIn0seyJxdWVzdGlvbiI6IlF1YWxlIGFjY29yZG8gZGVsIDE5Mjkgcmlzb2xzZSBsYSBxdWVzdGlvbmUgcm9tYW5hIHRyYSBsbyBTdGF0byBpdGFsaWFubyBlIGxhIENoaWVzYSBjYXR0b2xpY2E/IiwiYW5zd2VycyI6WyJQYXR0aSBkaSBMb25kcmEiLCJQYXR0aSBMYXRlcmFuZW5zaSIsIlBhdHRvIGTigJlBY2NpYWlvIiwiQ29uY29yZGF0byBkaSBWZXJzYWlsbGVzIl0sImNvcnJlY3QiOjEsImV4cGxhbmF0aW9uIjoiSSBQYXR0aSBMYXRlcmFuZW5zaSwgZmlybWF0aSBuZWwgMTkyOSBkYWwgZ292ZXJubyBpdGFsaWFubyBlIGRhbGxhIFNhbnRhIFNlZGUsIGNvbXByZW5kZXZhbm8gdW4gdHJhdHRhdG8sIHVuYSBjb252ZW56aW9uZSBmaW5hbnppYXJpYSBlIHVuIGNvbmNvcmRhdG8uIFJpY29ub2JiZXJvIGxhIENpdHTDoCBkZWwgVmF0aWNhbm8gY29tZSBTdGF0byBpbmRpcGVuZGVudGUgZSByZWdvbGFyb25vIGkgcmFwcG9ydGkgdHJhIENoaWVzYSBlIEl0YWxpYS4ifSx7InF1ZXN0aW9uIjoiUXVhbGUgZnUgaWwgcmFwcG9ydG8gdHJhIGzigJlJdGFsaWEgZmFzY2lzdGEgZSBsYSBndWVycmEgZOKAmUV0aW9waWEgZGVsIDE5MzXigJMxOTM2PyIsImFuc3dlcnMiOlsiTOKAmUl0YWxpYSBzaSBvcHBvc2UgYWxs4oCZaW52YXNpb25lIGUgYWNjb2xzZSBs4oCZRXRpb3BpYSBuZWxsYSBTb2NpZXTDoCBkZWxsZSBOYXppb25pIiwiTOKAmUl0YWxpYSBpbnZhc2UgbOKAmUV0aW9waWEgZSBwcm9jbGFtw7IgbOKAmUltcGVybyBuZWwgMTkzNiIsIkzigJlJdGFsaWEgaW50ZXJ2ZW5uZSBwZXIgcmVzdGF1cmFyZSBsYSBtb25hcmNoaWEgZXRpb3BlIiwiTOKAmUV0aW9waWEgZnUgY2VkdXRhIHBhY2lmaWNhbWVudGUgYWxs4oCZSXRhbGlhIl0sImNvcnJlY3QiOjEsImV4cGxhbmF0aW9uIjoiTOKAmUl0YWxpYSBpbnZhc2UgbOKAmUV0aW9waWEgbmVsbOKAmW90dG9icmUgMTkzNSBlIG5lIGNvbXBsZXTDsiBsYSBjb25xdWlzdGEgbmVsIDE5MzYsIHByb2NsYW1hbmRvIGzigJlJbXBlcm8uIExhIGd1ZXJyYSBmdSBzZWduYXRhIGRhbGzigJl1c28gZGkgYXJtaSBjaGltaWNoZSBlIGRhIHZpb2xlbnplIGNvbnRybyBsYSBwb3BvbGF6aW9uZTsgbGEgU29jaWV0w6AgZGVsbGUgTmF6aW9uaSBpbXBvc2Ugc2FuemlvbmkgZWNvbm9taWNoZSwgcmltYXN0ZSBpbmVmZmljYWNpLiJ9LHsicXVlc3Rpb24iOiJDaGUgY29zYSBpbmRpY2F2YSBs4oCZQXNzZSBSb21hLUJlcmxpbm8sIGFubnVuY2lhdG8gbmVsIDE5MzY/IiwiYW5zd2VycyI6WyJVbuKAmWFsbGVhbnphIHBvbGl0aWNhIHRyYSBs4oCZSXRhbGlhIGZhc2Npc3RhIGUgbGEgR2VybWFuaWEgbmF6aXN0YSIsIlVuIGFjY29yZG8gY29tbWVyY2lhbGUgdHJhIEl0YWxpYSBlIEZyYW5jaWEiLCJMYSBmaW5lIGRlbCByZWdpbWUgZmFzY2lzdGEiLCJVbiBwaWFubyBwZXIgZm9uZGFyZSBs4oCZVW5pb25lIGV1cm9wZWEiXSwiY29ycmVjdCI6MCwiZXhwbGFuYXRpb24iOiJM4oCZZXNwcmVzc2lvbmUsIHVzYXRhIGRhIE11c3NvbGluaSBuZWwgMTkzNiwgZGVzY3JpdmV2YSBpbCBwcm9ncmVzc2l2byBhdnZpY2luYW1lbnRvIHBvbGl0aWNvIHRyYSBs4oCZSXRhbGlhIGZhc2Npc3RhIGUgbGEgR2VybWFuaWEgbmF6aXN0YS4gTOKAmWFsbGVhbnphIGZ1IHBvaSByYWZmb3J6YXRhIGRhbCBQYXR0byBk4oCZQWNjaWFpbywgZmlybWF0byBuZWwgMTkzOS4ifSx7InF1ZXN0aW9uIjoiQ2hlIGNvc2Egc3RhYmlsaXJvbm8gbGUgbGVnZ2kgcmF6emlhbGkgcHJvbXVsZ2F0ZSBkYWwgcmVnaW1lIGZhc2Npc3RhIG5lbCAxOTM4PyIsImFuc3dlcnMiOlsiTGEgcGllbmEgdWd1YWdsaWFuemEgZ2l1cmlkaWNhIHBlciB0dXR0aSBpIGNpdHRhZGluaSIsIkxhIHBlcnNlY3V6aW9uZSBlIGzigJllc2NsdXNpb25lIGRlZ2xpIGVicmVpIGRhIHNjdW9sZSBlIHByb2Zlc3Npb25pIiwiTGEgY2l0dGFkaW5hbnphIGl0YWxpYW5hIHBlciB0dXR0aSBpIHJpZnVnaWF0aSIsIkzigJlhYm9saXppb25lIGRlbGxlIGxlZ2dpIGNvbG9uaWFsaSJdLCJjb3JyZWN0IjoxLCJleHBsYW5hdGlvbiI6IkRhbCAxOTM4IGlsIHJlZ2ltZSBwcm9tdWxnw7IgbGVnZ2kgYW50aXNlbWl0ZSBjaGUgZXNjbHVzZXJvIGdsaSBlYnJlaSBkYWxsYSBzY3VvbGEgcHViYmxpY2EsIGRhIG51bWVyb3NlIHByb2Zlc3Npb25pIGUgZGEgbW9sdGUgYXR0aXZpdMOgIGRlbGxhIHZpdGEgY2l2aWxlLiBMYSBwZXJzZWN1emlvbmUgaXRhbGlhbmEgcHJlY2VkZXR0ZSBsYSBkZXBvcnRhemlvbmUgZGVnbGkgZWJyZWkgZGFsbOKAmUl0YWxpYSwgaW50ZW5zaWZpY2F0YSBkb3BvIGzigJlvY2N1cGF6aW9uZSB0ZWRlc2NhIGRlbCAxOTQzLiJ9LHsicXVlc3Rpb24iOiJRdWFuZG8gZW50csOyIGzigJlJdGFsaWEgbmVsbGEgU2Vjb25kYSBndWVycmEgbW9uZGlhbGUsIGRpY2hpYXJhbmRvIGd1ZXJyYSBhIEZyYW5jaWEgZSBSZWdubyBVbml0bz8iLCJhbnN3ZXJzIjpbIjEgc2V0dGVtYnJlIDE5MzkiLCIxMCBnaXVnbm8gMTk0MCIsIjIyIGdpdWdubyAxOTQxIiwiOCBzZXR0ZW1icmUgMTk0MyJdLCJjb3JyZWN0IjoxLCJleHBsYW5hdGlvbiI6Ik11c3NvbGluaSBhbm51bmNpw7IgbOKAmWVudHJhdGEgaW4gZ3VlcnJhIGRlbGzigJlJdGFsaWEgaWwgMTAgZ2l1Z25vIDE5NDAsIHF1YW5kbyBsYSBGcmFuY2lhIGVyYSBvcm1haSBwcm9zc2ltYSBhbGxhIHNjb25maXR0YS4gTOKAmUl0YWxpYSBjb21iYXR0w6kgYSBmaWFuY28gZGVsbGEgR2VybWFuaWEgbmF6aXN0YSBlIHN1YsOsIGdyYXZpIHNjb25maXR0ZSBtaWxpdGFyaS4ifSx7InF1ZXN0aW9uIjoiQ2hlIGNvc2EgYXZ2ZW5uZSBpbiBJdGFsaWEgbOKAmTggc2V0dGVtYnJlIDE5NDM/IiwiYW5zd2VycyI6WyJGdSBhbm51bmNpYXRvIGzigJlhcm1pc3RpemlvIGNvbiBnbGkgQWxsZWF0aSIsIk11c3NvbGluaSBtYXJjacOyIHN1IFJvbWEiLCJFbnRyYXJvbm8gaW4gdmlnb3JlIGkgUGF0dGkgTGF0ZXJhbmVuc2kiLCJUZXJtaW7DsiBsYSBndWVycmEgaW4gRXVyb3BhIl0sImNvcnJlY3QiOjAsImV4cGxhbmF0aW9uIjoiTOKAmTggc2V0dGVtYnJlIDE5NDMgZnUgcmVzbyBwdWJibGljbyBs4oCZYXJtaXN0aXppbyBmaXJtYXRvIGRhbGzigJlJdGFsaWEgY29uIGdsaSBBbGxlYXRpLiBMYSBHZXJtYW5pYSBvY2N1cMOyIGdyYW4gcGFydGUgZGVsbGEgcGVuaXNvbGE7IE11c3NvbGluaSwgbGliZXJhdG8gZGFpIHRlZGVzY2hpLCBndWlkw7IgbGEgUmVwdWJibGljYSBTb2NpYWxlIEl0YWxpYW5hIG5lbCBOb3JkLCBtZW50cmUgaW5pemlhdmEgbGEgUmVzaXN0ZW56YS4ifV0=";
const defaultQuiz = {
  id: "quiz-storia",
  title: "Il fascismo e l’Italia di Mussolini",
  intro: "Dieci domande per ripercorrere l’ascesa del fascismo, la dittatura e la guerra. Leggi le spiegazioni dopo ogni risposta.",
  questions: JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encodedQuestions), (character) => character.charCodeAt(0))))
};
window.defaultQuiz = defaultQuiz;

if (document.getElementById("question")) {
  let activeQuiz = defaultQuiz;
  const introElement = document.getElementById("quiz-intro");
  const isSharedQuiz = location.hash.startsWith("#quiz=");

  if (isSharedQuiz) {
    try {
      const encodedQuiz = location.hash.slice("#quiz=".length).replace(/-/g, "+").replace(/_/g, "/");
      const quizData = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(encodedQuiz), (character) => character.charCodeAt(0))));
      if (!quizData || typeof quizData.title !== "string" || typeof quizData.intro !== "string" ||
          !Array.isArray(quizData.questions) || quizData.questions.length === 0 ||
          (quizData.id !== undefined && typeof quizData.id !== "string") ||
          (quizData.submissionEndpoint && !window.isGoogleAppsScriptUrl(quizData.submissionEndpoint)) ||
          quizData.questions.some((item) => typeof item.question !== "string" ||
            !Array.isArray(item.answers) || item.answers.length < 2 ||
            !Number.isInteger(item.correct) || item.correct < 0 || item.correct >= item.answers.length ||
            typeof item.explanation !== "string")) {
        throw new Error("Struttura del quiz non valida.");
      }
      quizData.id = quizData.id || "quiz-condiviso";
      activeQuiz = quizData;
    } catch (error) {
      document.querySelector(".quiz").hidden = true;
      introElement.textContent = "Il link del quiz non è valido o è danneggiato.";
      throw new Error("Impossibile caricare il quiz condiviso.", { cause: error });
    }
  }

  const questions = activeQuiz.questions;
  const submissionEndpoint = activeQuiz.submissionEndpoint || "";
  document.title = `${activeQuiz.title} | Quiz di storia`;
  if (isSharedQuiz) {
    document.getElementById("quiz-eyebrow").textContent = "Quiz condiviso";
    document.getElementById("quiz-footer").hidden = true;
  }
  document.getElementById("quiz-title").textContent = activeQuiz.title;
  introElement.textContent = activeQuiz.intro;
  document.getElementById("progress-bar").setAttribute("aria-valuemax", String(questions.length));

  const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const answersElement = document.getElementById("answers");
const explanationElement = document.getElementById("explanation");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress-bar");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const quizElement = document.getElementById("quiz");
const questionArea = document.getElementById("question-area");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const resultCopyElement = document.getElementById("result-copy");
const restartButton = document.getElementById("restart-button");
const participantCard = document.getElementById("participant-card");
const participantForm = document.getElementById("participant-form");
const submissionStatus = document.getElementById("submission-status");

let currentQuestion = 0;
let score = 0;
let answered = false;
let participant = null;
let responses = [];

if (submissionEndpoint) {
  participantCard.hidden = false;
  document.getElementById("quiz-footer").textContent =
    "Le risposte vengono inviate al foglio del creatore del quiz insieme a nome e cognome.";
} else {
  quizElement.hidden = false;
}

participantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstNameInput = document.getElementById("participant-first-name");
  const lastNameInput = document.getElementById("participant-last-name");
  firstNameInput.setCustomValidity(firstNameInput.value.trim() ? "" : "Inserisci il nome.");
  lastNameInput.setCustomValidity(lastNameInput.value.trim() ? "" : "Inserisci il cognome.");
  if (!participantForm.reportValidity()) return;
  participant = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim()
  };
  participantCard.hidden = true;
  quizElement.hidden = false;
  questionElement.focus({ preventScroll: true });
});

function renderQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  progressLabel.textContent = `Domanda ${currentQuestion + 1} di ${questions.length}`;
  questionNumberElement.textContent = `Domanda ${String(currentQuestion + 1).padStart(2, "0")}`;
  questionElement.textContent = item.question;
  scoreElement.textContent = String(score);
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  progressBar.setAttribute("aria-valuenow", String(currentQuestion));
  explanationElement.hidden = true;
  explanationElement.textContent = "";
  nextButton.hidden = true;
  answersElement.replaceChildren();

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span");
    text.textContent = answer;
    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index, button));
    answersElement.append(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const answerButtons = answersElement.querySelectorAll(".answer");
  answerButtons.forEach((button) => { button.disabled = true; });

  if (selectedIndex === item.correct) {
    score += 1;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    answerButtons[item.correct].classList.add("correct");
  }

  responses[currentQuestion] = {
    question: item.question,
    selectedAnswer: item.answers[selectedIndex],
    correctAnswer: item.answers[item.correct],
    isCorrect: selectedIndex === item.correct
  };
  scoreElement.textContent = String(score);
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  progressBar.setAttribute("aria-valuenow", String(currentQuestion + 1));
  const explanationHeading = document.createElement("strong");
  explanationHeading.textContent = "In breve.";
  explanationElement.replaceChildren(explanationHeading, document.createTextNode(` ${item.explanation}`));
  explanationElement.hidden = false;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "Vedi il risultato" : "Prossima domanda →";
  nextButton.hidden = false;
  nextButton.focus();
}

function showResult() {
  progressFill.style.width = "100%";
  progressBar.setAttribute("aria-valuenow", String(questions.length));
  progressLabel.textContent = "Quiz completato";
  questionArea.hidden = true;
  resultElement.hidden = false;
  finalScoreElement.textContent = `${score} / ${questions.length} risposte corrette`;
  const resultSummary = score === questions.length
    ? "Ottima conoscenza dei passaggi principali. Continua ad approfondire le fonti e il contesto storico."
    : score >= 7
      ? "Buona preparazione: hai ricostruito molti snodi del periodo. Le spiegazioni possono aiutarti a fissare gli altri."
      : "Un primo ripasso utile: rileggi le spiegazioni e prova di nuovo per consolidare la cronologia e il contesto.";
  resultCopyElement.textContent = submissionEndpoint
    ? `${resultSummary} Il risultato sarà inviato al creatore del quiz.`
    : `${resultSummary} Il risultato resta su questo dispositivo e non viene inviato al creatore.`;
  restartButton.focus();

  if (submissionEndpoint && participant) {
    submissionStatus.hidden = false;
    submissionStatus.textContent = "Invio delle risposte in corso…";
    window.postQuizRequest(submissionEndpoint, {
      action: "submit",
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      firstName: participant.firstName,
      lastName: participant.lastName,
      score,
      total: questions.length,
      answers: responses
    }).then(() => {
      submissionStatus.textContent = "Risposte inviate al creatore del quiz.";
    }).catch((error) => {
      submissionStatus.textContent = `Invio non riuscito: ${error.message}`;
      resultCopyElement.textContent += " Avvisa il creatore; il risultato potrebbe non essere stato registrato.";
    });
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestion === questions.length - 1) {
    showResult();
    return;
  }
  currentQuestion += 1;
  renderQuestion();
  questionElement.focus({ preventScroll: true });
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  responses = [];
  resultElement.hidden = true;
  submissionStatus.hidden = true;
  questionArea.hidden = false;
  renderQuestion();
  quizElement.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
});

renderQuestion();
}