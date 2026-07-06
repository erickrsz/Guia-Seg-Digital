const select = document.getElementById("themeSelect");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function setTheme(theme) {
  document.body.classList.remove("theme-default", "theme-ocean", "theme-sunset", "theme-forest");
  document.body.classList.add(`theme-${theme}`);
}

select.addEventListener("change", (e) => {
  const theme = e.target.value;
  setTheme(theme);
  localStorage.setItem("theme", theme);
});

const saved = localStorage.getItem("theme") || "default";
select.value = saved;
setTheme(saved);

/* =======================
   Lógica do Quiz
======================= */
const questions = [
  {
    question: "Qual é a regra de ouro sobre as suas senhas?",
    options: [
      "Posso compartilhar apenas com meus melhores amigos.",
      "Devo criar uma única senha para todas as minhas contas.",
      "Nunca devo compartilhar, elas são como escovas de dente."
    ],
    answer: 2
  },
  {
    question: "O que é o Phishing (Pescaria digital)?",
    options: [
      "Um aplicativo de pesca esportiva.",
      "Golpes usando links falsos para roubar seus dados.",
      "Uma ferramenta de segurança da internet."
    ],
    answer: 1
  },
  {
    question: "O que você DEVE EVITAR fazer usando um Wi-Fi público?",
    options: [
      "Ouvir música ou assistir vídeos.",
      "Acessar o aplicativo do banco e digitar senhas importantes.",
      "Pesquisar trabalhos escolares no Google."
    ],
    answer: 1
  },
  {
    question: "O que você deve fazer se vir alguém sofrendo cyberbullying?",
    options: [
      "Rir e compartilhar a publicação nos meus grupos.",
      "Denunciar a publicação e oferecer apoio à vítima.",
      "Não fazer nada, o problema não é meu."
    ],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

const startDiv = document.getElementById("quiz-start");
const questionDiv = document.getElementById("quiz-question");
const resultDiv = document.getElementById("quiz-result");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultText = document.getElementById("result-text");
const resultDesc = document.getElementById("result-desc");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startDiv.style.display = "none";
  resultDiv.style.display = "none";
  questionDiv.style.display = "block";
  showQuestion();
}

function showQuestion() {
  const currentQ = questions[currentQuestionIndex];
  questionText.innerText = `${currentQuestionIndex + 1}. ${currentQ.question}`;
  optionsContainer.innerHTML = "";

  currentQ.options.forEach((opt, index) => {
    const button = document.createElement("button");
    button.innerText = opt;
    button.classList.add("quiz-btn");
    button.onclick = () => selectAnswer(index, button);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex, button) {
  const currentQ = questions[currentQuestionIndex];
  const allButtons = optionsContainer.querySelectorAll(".quiz-btn");
  
  // Desabilita os botões para não clicar duas vezes
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQ.answer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    // Destaca a resposta certa
    allButtons[currentQ.answer].classList.add("correct");
  }

  // Passa para a próxima pergunta após um breve intervalo
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  questionDiv.style.display = "none";
  resultDiv.style.display = "block";
  
  resultText.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
  
  if (score === questions.length) {
    resultDesc.innerText = "🏆 Perfeito! Você é um mestre da segurança digital.";
  } else if (score >= questions.length / 2) {
    resultDesc.innerText = "👍 Muito bom! Você está no caminho certo para surfar seguro.";
  } else {
    resultDesc.innerText = "⚠️ Cuidado! Vale a pena reler as dicas do site para se proteger melhor.";
  }
}