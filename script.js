let currentQuestion = 0;
let score = 0;
let questions = [];
let timer;
let timeLeft = 10;

let translations = []; // lista de objetos com tradução

// Buscar países da API RestCountries
async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
  const data = await response.json();
  return data;
}

// Carregar traduções do arquivo JSON
async function loadTranslations() {
  const response = await fetch("countries-pt.json");
  return await response.json();
}

// Selecionar países aleatórios
function getRandomCountries(countries, num = 5) {
  return countries.sort(() => 0.5 - Math.random()).slice(0, num);
}

// Função auxiliar para traduzir
function translateName(name) {
  const match = translations.find(t => t.nome_pais_int === name);
  return match ? match.nome_pais : name;
}

// Criar uma questão
function createQuestion(countries) {
  const correctCountry = countries[Math.floor(Math.random() * countries.length)];
  const options = getRandomCountries(countries, 5);

  if (!options.includes(correctCountry)) {
    options[Math.floor(Math.random() * options.length)] = correctCountry;
  }

  return {
    flag: correctCountry.flags.png,
    correct: translateName(correctCountry.name.common),
    options: options.map(c => translateName(c.name.common))
  };
}

// Iniciar quiz
async function startQuiz() {
  const countries = await getCountries();
  translations = await loadTranslations();

  questions = [];
  currentQuestion = 0;
  score = 0;

  for (let i = 0; i < 20; i++) {
    questions.push(createQuestion(countries));
  }

  showQuestion(questions[currentQuestion]);
}

// Mostrar questão
function showQuestion(questionObj) {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultEl = document.getElementById("result");

  // Atualizar barra de progresso
  const progress = document.getElementById("progress");
  progress.style.width = `${(currentQuestion / questions.length) * 100}%`;

  // Atualizar pontuação
  document.getElementById("score").textContent = `Pontuação: ${score}`;

  // Mostrar bandeira + cronômetro
  questionEl.innerHTML = `<img src="${questionObj.flag}" width="150"><br>
                          <span id="timer">Tempo: 10s</span>`;

  optionsEl.innerHTML = "";
  resultEl.textContent = "";

  questionObj.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      clearInterval(timer);
      disableButtons(); // bloqueia todos os botões
      if (option === questionObj.correct) {
        score++;
        btn.classList.add("correct");
        resultEl.textContent = "✅ Correto!";
      } else {
        btn.classList.add("wrong");
        resultEl.textContent = `❌ Errado! O país correto é ${questionObj.correct}`;
      }
      // Espera 5 segundos antes da próxima questão
      setTimeout(nextQuestion, 5000);
    };
    optionsEl.appendChild(btn);
  });

  // Iniciar cronômetro
  timeLeft = 10;
  document.getElementById("timer").textContent = `Tempo: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Tempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableButtons(); // bloqueia todos os botões
      resultEl.textContent = `⏰ Tempo esgotado! O país correto é ${questionObj.correct}`;
      highlightCorrectAnswer(questionObj.correct);
      // Espera 5 segundos antes da próxima questão
      setTimeout(nextQuestion, 5000);
    }
  }, 1000);
}

// Bloquear todos os botões após resposta
function disableButtons() {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => {
    btn.disabled = true;
  });
}

// Destacar resposta correta
function highlightCorrectAnswer(correct) {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });
}

// Próxima questão
function nextQuestion() {
  currentQuestion++;
  const resultEl = document.getElementById("result");
  resultEl.textContent = "";
  if (currentQuestion < questions.length) {
    showQuestion(questions[currentQuestion]);
  } else {
    endQuiz();
  }
}

// Fim do quiz
function endQuiz() {
  document.getElementById("question").innerHTML = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("progress").style.width = "100%";
  document.getElementById("score").textContent = `Pontuação final: ${score}`;
  const resultEl = document.getElementById("result");
  resultEl.textContent = `🏁 Fim do Quiz! Você acertou ${score} de ${questions.length} questões.`;

  const retryBtn = document.createElement("button");
  retryBtn.textContent = "Tentar novamente";
  retryBtn.onclick = startQuiz;
  resultEl.appendChild(document.createElement("br"));
  resultEl.appendChild(retryBtn);
}

// Mostrar botão "Iniciar" ao carregar
window.onload = () => {
  const questionEl = document.getElementById("question");
  questionEl.innerHTML = "";
  const startBtn = document.createElement("button");
  startBtn.textContent = "Iniciar";
  startBtn.onclick = startQuiz;
  questionEl.appendChild(startBtn);
};