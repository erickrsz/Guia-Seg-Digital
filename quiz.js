// 1. Sincroniza o Tema escolhido na página principal automaticamente
const savedTheme = localStorage.getItem("theme") || "default";
document.body.classList.add(`theme-${savedTheme}`);

// 2. Banco de Dados de Perguntas (Estrutura adaptada com flags booleanas para facilitar o embaralhamento)
const questionPool = [
  {
    question: "Qual é a regra de ouro sobre as suas senhas?",
    options: [
      { text: "Posso compartilhar apenas com meus melhores amigos.", correct: false },
      { text: "Devo criar uma única senha fácil para todas as minhas contas.", correct: false },
      { text: "Nunca devo compartilhar com ninguém, elas são de uso estritamente pessoal.", correct: true }
    ]
  },
  {
    question: "O que caracteriza o crime de Phishing (Pescaria digital)?",
    options: [
      { text: "Instalação de jogos piratas ou modificados no computador.", correct: false },
      { text: "Golpes que usam links e mensagens falsas para roubar seus dados e senhas.", correct: true },
      { text: "Uma ferramenta nativa de proteção do sistema operacional.", correct: false }
    ]
  },
  {
    question: "O que você DEVE EVITAR fazer enquanto estiver conectado a um Wi-Fi público?",
    options: [
      { text: "Assistir a vídeos educacionais ou ouvir playlists de música.", correct: false },
      { text: "Acessar aplicativos de banco, e-mails importantes ou digitar senhas sensíveis.", correct: true },
      { text: "Realizar pesquisas escolares rápidas no motor de busca Google.", correct: false }
    ]
  },
  {
    question: "Qual a atitude correta ao presenciar um ataque de cyberbullying?",
    options: [
      { text: "Rir, curtir e encaminhar a publicação nos meus grupos de amigos.", correct: false },
      { text: "Denunciar a publicação na plataforma e oferecer apoio reservado à vítima.", correct: true },
      { text: "Ignorar completamente, afinal, o problema não envolve a mim diretamente.", correct: false }
    ]
  },
  {
    question: "O que significa o termo 'Oversharing' (Superexposição) nas redes sociais?",
    options: [
      { text: "Compartilhar excessivamente detalhes da rotina, localização em tempo real e dados pessoais.", correct: true },
      { text: "Configurar o perfil como privado para maior controle de segurança.", correct: false },
      { text: "Criar senhas fortes e complexas usando gerenciadores automatizados.", correct: false }
    ]
  },
  {
    question: "Por que a autenticação em duas etapas (2FA) é altamente recomendada?",
    options: [
      { text: "Porque ela acelera consideravelmente o processo de login nos sites.", correct: false },
      { text: "Porque ela impede que o seu aparelho celular seja clonado fisicamente.", correct: false },
      { text: "Porque adiciona uma camada de proteção extra, exigindo um código gerado na hora além da senha.", correct: true }
    ]
  },
  {
    question: "O que é a prática nociva de assédio virtual conhecida como 'Doxxing'?",
    options: [
      { text: "Invasão, roubo e exposição pública de dados privados de alguém (como endereço ou CPF) para intimidação.", correct: true },
      { text: "O envio de vírus disfarçados de boletos bancários por mensagens de e-mail.", correct: false },
      { text: "A prática saudável de postar fotos e memórias antigas nas redes sociais.", correct: false }
    ]
  }
];

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");

// Função utilitária para embaralhar qualquer array (Algoritmo matemático Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Inicializa ou reinicia o quiz limpando as variáveis e sorteando novos dados
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  // 1. Embaralha todo o banco de dados e escolhe exatamente 5 perguntas para esta rodada
  quizQuestions = shuffleArray([...questionPool]).slice(0, 5);

  // 2. Passa de pergunta em pergunta embaralhando as alternativas dentro delas
  quizQuestions.forEach(q => {
    q.options = shuffleArray([...q.options]);
  });

  showQuestion();
}

function showQuestion() {
  const currentQ = quizQuestions[currentQuestionIndex];
  
  // Monta a estrutura da pergunta gigante na tela com o contador correto (1 de 5, 2 de 5...)
  quizBox.innerHTML = `
    <h2>${currentQuestionIndex + 1}. ${currentQ.question}</h2>
    <div class="quiz-large-options" id="options-container"></div>
  `;

  const container = document.getElementById("options-container");

  // Cria dinamicamente os botões passando se a alternativa é verdadeira ou falsa
  currentQ.options.forEach((opt) => {
    const button = document.createElement("button");
    button.innerText = opt.text;
    button.classList.add("quiz-large-btn");
    button.onclick = () => selectAnswer(opt.correct, button);
    container.appendChild(button);
  });
}

function selectAnswer(isCorrect, button) {
  const allButtons = quizBox.querySelectorAll(".quiz-large-btn");
  
  // Bloqueia cliques adicionais nas outras opções enquanto exibe o resultado
  allButtons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    
    // Se o usuário errou, o código faz uma varredura para encontrar qual botão continha a certa e pinta de verde
    const currentQ = quizQuestions[currentQuestionIndex];
    currentQ.options.forEach((opt, index) => {
      if (opt.correct) {
        allButtons[index].classList.add("correct");
      }
    });
  }

  // Avança para a próxima pergunta após 1.8 segundos
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1800);
}

function showResult() {
  let feedback = "";
  if (score === quizQuestions.length) {
    feedback = "🏆 Perfeito! Você é um mestre absoluto da segurança digital.";
  } else if (score >= 3) {
    feedback = "👍 Muito bom! Você possui ótimos hábitos de navegação.";
  } else {
    feedback = "⚠️ Atenção! Vale a pena reler as dicas do portal para se proteger melhor.";
  }

  // Tela de resultados adaptada para o máximo de 5 pontos
  quizBox.innerHTML = `
    <div class="result-container">
      <h2>Resultado do Desafio</h2>
      <div class="result-score">${score} / ${quizQuestions.length}</div>
      <div class="result-message">${feedback}</div>
      <div class="result-actions">
        <button class="btn primary" onclick="initQuiz()" style="font-size: 1.2rem; padding: 12px 30px;">
          Jogar Novamente 🔄
        </button>
        <a href="index.html" class="btn" style="font-size: 1.2rem; padding: 12px 30px;">
          Voltar para o Início 🏠
        </a>
      </div>
    </div>
  `;
}

// Inicia o ciclo de vida do quiz assim que a aba termina de carregar
initQuiz();