var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var optionEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questEl.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  optionEl.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var manyChoice = document.createElement("button");
    manyChoice.setAttribute("class", "choice");
    manyChoice.setAttribute("value", choice);
    manyChoice.textContent = i + 1 + ". " + choice;
    optionEl.appendChild(manyChoice);
  }
  optionEl.addEventListener("click", questionClick);
}

function questionClick(event) {
  var buttonEl = event.target;
  if (!buttonEl.matches(".choice")) {
    return;
  }
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  }
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
    window.location.href = "highscores.html";
  }
}
