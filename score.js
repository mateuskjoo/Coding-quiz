function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
    var liTag = document.createElement("li");
    liTag.textContent = highscores[i].initials + " - " + highscores[i].score;
    var olEl = document.getElementById("highscore");
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem("highscore");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighscores();