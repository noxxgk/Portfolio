const countries = [
  { name: "Polska", file: "poland.png" , continent: "europe" },
  { name: "Finlandia", file: "finland.png", continent: "europe" },
  { name: "Islandia", file: "iceland.png" , continent: "europe" },
  { name: "Hiszpania", file: "spain.png" , continent: "europe" },
  { name: "Francja", file: "france.png" , continent: "europe" },
  { name: "Włochy", file: "italy.png" , continent: "europe" },
  { name: "Niemcy", file: "germany.png" , continent: "europe" },
  { name: "Norwegia", file: "norway.png", continent: "europe" },
  { name: "Szwecja", file: "sweden.png" , continent: "europe" },
  { name: "Albania", file: "albania.png" , continent: "europe" },
  { name: "Andora", file: "andora.png" , continent: "europe" },
  { name: "Armenia", file: "armenia.png" , continent: "europe" },
  { name: "Austria", file: "austria.png" , continent: "europe" },
  { name: "Azerbejdżan", file: "azerbejian.png", continent: "europe" },
  { name: "Białoruś", file: "belarus.png" , continent: "europe" }, 
  { name: "Belgia", file: "belgium.png" , continent: "europe" },
  { name: "BIH", file: "bosnia.png" , continent: "europe" },
  { name: "Chorwacja", file: "croatia.png" , continent: "europe" },
  { name: "Cypr", file: "cyprus.png" , continent: "europe" },
  { name: "Czechy", file: "czechia.png" , continent: "europe" },
  { name: "Dania", file: "denmark.png" , continent: "europe" },
  { name: "Estonia", file: "estonia.png" , continent: "europe" },
  { name: "Gruzja", file: "georgia.png" , continent: "europe" },
  { name: "Grecja", file: "grecce.png" , continent: "europe" },
  { name: "Węgry", file: "hungary.png" , continent: "europe" },
  { name: "Irlandia", file: "irleand.png" , continent: "europe" },
  { name: "Kosowo", file: "kosovo.png" , continent: "europe" },
  { name: "Łotwa", file: "latavia.png" , continent: "europe" },
  { name: "Lichtenstein", file: "lichtenstein.png" , continent: "europe" },
  { name: "Litwa", file: "lithuania.png" , continent: "europe" },
  { name: "Luksemburg", file: "luksemburg.png" , continent: "europe" },
  { name: "Macedonia", file: "macedonia.png" , continent: "europe" },
  { name: "Malta", file: "malta.png" , continent: "europe" },
  { name: "Mołdawia", file: "moldova.png" , continent: "europe" },
  { name: "Monako", file: "monaco.png" , continent: "europe" },
  { name: "Holandia", file: "netherlands.png" , continent: "europe" },
  { name: "Portugalia", file: "portugal.png" , continent: "europe" },
  { name: "Rumunia", file: "romania.png" , continent: "europe" },
  { name: "Rosja", file: "russia.png" , continent: "europe" },
  { name: "San Marino", file: "sanmarino.png" , continent: "europe" },
  { name: "Serbia", file: "serbia.png" , continent: "europe" },
  { name: "Słowacja", file: "slovakia.png" , continent: "europe" },
  { name: "Słowenia", file: "slovenia.png" , continent: "europe" },
  { name: "Szwajcaria", file: "switzerland.png" , continent: "europe" },
  { name: "Turcja", file: "turkey.png" , continent: "europe" },
  { name: "Wielka Brytania", file: "uk.png" , continent: "europe" },
  { name: "Ukraina", file: "ukraine.png" , continent: "europe" },
  { name: "Watykan", file: "vatican.png" , continent: "europe" },
  { name: "Afganistan", file: "afghanistan.png" , continent: "asia" },
  { name: "Bandgladesz", file: "bangladesh.png" , continent: "asia" },
  { name: "Bhutan", file: "bhutan.png" , continent: "asia" },
  { name: "Brunei", file: "brunei.png" , continent: "asia" },
  { name: "Kambodża", file: "cambodia.png" , continent: "asia" },
  { name: "Chiny", file: "china.png" , continent: "asia" },
  { name: "Timor Wschodni", file: "timorleste.png" , continent: "asia" },
  { name: "Hongkong", file: "hongkong.png" , continent: "asia" },
  { name: "Indonezja", file: "indonesia.png" , continent: "asia" },
  { name: "Indie", file: "india.png" , continent: "asia" },
  { name: "Japonia", file: "japan.png" , continent: "asia" },
  { name: "Kazachstan", file: "kazachstan.png" , continent: "asia" },
  { name: "Kirgistan", file: "kyrgystan.png" , continent: "asia" },
  { name: "Laos", file: "laos.png" , continent: "asia" },
  { name: "Malezja", file: "malaysia.png" , continent: "asia" },
  
  
  
  
  
  
  
];
let usedCountries = [];
let lives = 0;
let score = 0;
let goal = 0;
let currentCountry = null;
let timer = null;
let timeLeft = 0;
let selectedContinent = null; // domyślnie

document.querySelectorAll(".difficulty").forEach(button => {
  button.addEventListener("click", () => {
    if (!selectedContinent) {
      alert("Najpierw wybierz kontynent!");
      return;
    }

    lives = parseInt(button.dataset.lives);
    goal = parseInt(button.dataset.goal);
    score = 0;

    // LIVES
    const livesElem = document.getElementById("lives");
    livesElem.textContent = lives;
    livesElem.classList.remove("status-update-gain", "status-update-loss");
    livesElem.classList.add("status-update-gain");
    setTimeout(() => livesElem.classList.remove("status-update-gain"), 800);

    // SCORE
    const scoreElem = document.getElementById("score");
    scoreElem.textContent = score;
    scoreElem.classList.remove("status-update-loss", "status-update-gain");
    scoreElem.classList.add("status-update-gain");
    setTimeout(() => scoreElem.classList.remove("status-update-gain"), 800);

    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    loadRound();
  });
});

document.querySelectorAll('.continent').forEach(button => {
  button.addEventListener("click", () => {
    selectedContinent = button.dataset.continent;

    // Wizualne podświetlenie aktywnego kontynentu
    document.querySelectorAll('.continent').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});


function loadRound() {
  const remainingCountries = countries.filter(c =>
    !usedCountries.includes(c.name) && c.continent === selectedContinent
  );

  if (remainingCountries.length === 0) {
    usedCountries = [];
    return loadRound();
  }

  currentCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
  usedCountries.push(currentCountry.name);

  document.getElementById("country-image").src = `images/${currentCountry.file}`;

  const options = [currentCountry.name];
  const availableOptions = countries
    .filter(c => c.continent === selectedContinent && c.name !== currentCountry.name)
    .map(c => c.name);

  while (options.length < 4 && availableOptions.length > 0) {
    const randIndex = Math.floor(Math.random() * availableOptions.length);
    const selected = availableOptions.splice(randIndex, 1)[0];
    options.push(selected);
  }

  shuffleArray(options);

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = option;
    button.addEventListener("click", () => {
      clearInterval(timer);
      checkAnswer(option);
    });
    optionsDiv.appendChild(button);
  });

  startTimer();
}
function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").textContent = timeLeft;

  clearInterval(timer);

  timer = setInterval(() => {
  timeLeft--;
  const timerElem = document.getElementById("timer");
  timerElem.textContent = timeLeft;
if (timeLeft < 6) {
  timerElem.classList.add("blink");
} else {
  timerElem.classList.remove("blink");
}

  if (timeLeft < 6) {
    timerElem.classList.add("blink");
  } else {
    timerElem.classList.remove("blink");
  }

  if (timeLeft <= 0) {
    clearInterval(timer);
    timeExpired();
  }
}, 1000);

}
function timeExpired() {
  lives--;
 const livesElem = document.getElementById("lives");
livesElem.textContent = lives;
livesElem.classList.remove("status-update-gain");
livesElem.classList.add("status-update-loss");
setTimeout(() => livesElem.classList.remove("status-update-loss"), 800);


  if (lives <= 0) {
    endGame(false);
  } else {
	  flashScreen();


const wrongSound = document.getElementById('wrongSound');
if (wrongSound) wrongSound.play();

    loadRound();
  }
}
function checkAnswer(selected) {
  if (selected === currentCountry.name) {
  score++;

  // 🔊 Dźwięk poprawnej odpowiedzi
  const correctSound = document.getElementById("correctSound");
  if (correctSound) correctSound.play();

  const scoreElem = document.getElementById("score");
  scoreElem.textContent = score;

scoreElem.textContent = score;
scoreElem.classList.remove("status-update-loss");
scoreElem.classList.add("status-update-gain");
setTimeout(() => scoreElem.classList.remove("status-update-gain"), 800);

    if (score >= goal) {
      endGame(true);
      return;
    }
  } else {
	flashScreen();


const wrongSound = document.getElementById('wrongSound');
if (wrongSound) wrongSound.play();

    lives--;
const livesElem = document.getElementById("lives");
livesElem.textContent = lives;
livesElem.classList.remove("status-update-gain");
livesElem.classList.add("status-update-loss");
setTimeout(() => livesElem.classList.remove("status-update-loss"), 800);


    if (lives <= 0) {
      endGame(false);
      return;
    }
  }
  loadRound();
}

function endGame(won) {
  document.getElementById("game").style.display = "none";
  document.getElementById("end").style.display = "block";
  const message = document.getElementById("end-message");
  message.textContent = won ? "🎉 Wygrałeś!" : "😢 Przegrałeś!";
  message.style.animation = ""; // brak animacji — tylko statyczne wyświetlenie

  
  const winSound = document.getElementById('winSound');
  const loseSound = document.getElementById('loseSound');

  if (won && winSound) winSound.play();
  if (!won && loseSound) loseSound.play()
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function flashScreen() {
  const overlay = document.getElementById("flash-overlay");
  if (!overlay) return;
  overlay.classList.add("active");
  setTimeout(() => overlay.classList.remove("active"), 300);
}

