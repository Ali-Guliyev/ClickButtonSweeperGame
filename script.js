console.log(localStorage);

const buttons = document.querySelectorAll(".box");
const scoreEl = document.querySelector(".score span");
const burgerMenu = document.querySelector(".menu");
const statsContainer = document.querySelector(
  ".statsContainer"
);
const formContainer = document.querySelector(
  ".formContainer"
);
const modalScore = document.querySelector(
  ".modal .score span"
);
const highScoreEl = document.querySelector(
  ".statsContainer .highScore span"
);
const gamesWonEl = document.querySelector(
  ".statsContainer .gamesWon span"
);
const gamesLostEl = document.querySelector(
  ".statsContainer .gamesLost span"
);

const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(
  ".modalContainer"
);
const howToPlayContainer = document.querySelector(
  ".howtoContainer"
);
const aboutUserCont = document.querySelector(
  ".aboutUserContainer"
);
const gameStatus = document.querySelector(".game-status");
const playAgainBtn = document.querySelector(".modal-again");
const howToPlayBtn = document.querySelector("li.howtoplay");
const howToPlayCloseBtn = document.querySelector(
  ".howtoContainer .content i.close"
);
const userCheckBtn = document.querySelector(
  ".formContainer .user-check"
);
const changeUserNameBtn = document.querySelector(
  ".aboutUserContainer .changeName"
);
const userContInp = document.querySelector(
  ".formContainer input"
);
const usernameEl = document.querySelector(
  ".aboutUserContainer .username"
);
const badBoxes = 15;
const scoreForWin = 10;
const mainColor = randomColor();
var score = 0;
var highScore = 0;

// utility functions
function randomNumber(num) {
  return Math.floor(Math.random() * num);
}

function randomColor() {
  var colors = [
    "#c23c25",
    "#d18b19",
    "#d1c819",
    "#15cfbc",
    "#3f5cc4",
    "#b320d4",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

function playAudio(filename) {
  var audio = new Audio(filename);
  audio.play();
}

function endGame() {
  // If Player Loses
  if (score < scoreForWin) {
    localStorage.getItem("Games Lost")
      ? localStorage.setItem(
          "Games Lost",
          parseInt(localStorage.getItem("Games Lost")) + 1
        )
      : localStorage.setItem("Games Lost", "1");

    setTimeout(() => {
      playAudio("gameover.mp3");
    }, 1000);
    modal.classList.add("lose");
    gameStatus.innerText = "Game Over!";
  } else {
    // If Player Wins
    localStorage.getItem("Games Won")
      ? localStorage.setItem(
          "Games Won",
          parseInt(localStorage.getItem("Games Won")) + 1
        )
      : localStorage.setItem("Games Won", "1");

    setTimeout(() => {
      playAudio("victory.mp3");
    }, 1000);
    modal.classList.add("win");
    gameStatus.innerText = "You Won!";
  }
  modalContainer.classList.add("active");
  modalScore.innerText = score;
}

function setUserName(e) {
  e.preventDefault();
  var name = userContInp.value;
  if (name) {
    localStorage.setItem("name", name);
    usernameEl.textContent = localStorage.getItem("name");
    formContainer.style.transform = "translateX(-150%)";
  }
}

// put the username value to ui
usernameEl.textContent = localStorage.getItem("name");

// Show Stats In Menu
localStorage.getItem("Games Lost")
  ? (gamesLostEl.textContent = localStorage.getItem(
      "Games Lost"
    ))
  : (gamesLostEl.textContent = "0");

localStorage.getItem("Games Won")
  ? (gamesWonEl.textContent = localStorage.getItem(
      "Games Won"
    ))
  : (gamesWonEl.textContent = "0");

localStorage.getItem("High Score")
  ? (highScoreEl.textContent = localStorage.getItem(
      "High Score"
    ))
  : (highScoreEl.textContent = "0");

localStorage.getItem("name")
  ? (formContainer.style.transform = "translateX(-150%)")
  : (usernameEl.textContent = "User Not Found");

// Event Listeners
playAgainBtn.addEventListener("click", () => {
  location.reload();
});

howToPlayBtn.addEventListener("click", () => {
  howToPlayContainer.classList.add("active");
  statsContainer.classList.toggle("statsContainer-active");
  burgerMenu.classList.toggle("toggle");
});

howToPlayCloseBtn.addEventListener("click", () => {
  howToPlayContainer.classList.remove("active");
});

burgerMenu.addEventListener("click", () => {
  statsContainer.classList.toggle("statsContainer-active");

  burgerMenu.classList.toggle("toggle");
});

changeUserNameBtn.addEventListener("click", () => {
  formContainer.style.transform = "translateX(0%)";
});

formContainer.addEventListener("submit", (e) => {
  setUserName(e);
});
userCheckBtn.addEventListener("click", (e) => {
  setUserName(e);
});

// Randomize Boxes
for (let i = 0; i < badBoxes; i++) {
  const randomBox = randomNumber(81);
  buttons[randomBox].classList.remove("goodbox");
  buttons[randomBox].classList.add("badbox");
}

// Check which box was clicked
buttons.forEach((btn) => {
  if (btn.classList.contains("goodbox")) {
    btn.addEventListener("click", () => {
      btn.style.backgroundColor = "green";
      score += 1;
      scoreEl.innerText = score;
      playAudio("correct.mp3");

      // Change High Score
      if (localStorage.getItem("High Score")) {
        if (
          score >
          parseInt(localStorage.getItem("High Score"))
        ) {
          localStorage.setItem(
            "High Score",
            parseInt(localStorage.getItem("High Score")) + 1
          );
          console.log(localStorage.getItem("High Score"));
        }
      } else {
        localStorage.setItem("High Score", "0");
      }
    });
  } else if (btn.classList.contains("badbox")) {
    btn.addEventListener("click", () => {
      btn.style.backgroundColor = "black";
      playAudio("wrong.mp3");
      endGame();
    });
  }

  btn.style.backgroundColor = mainColor;
});

// ADD STYLING TO OTHER ELEMENTS
aboutUserCont.style.color = mainColor;
changeUserNameBtn.style.color = mainColor;
changeUserNameBtn.style.border = `1px solid ${mainColor}`;

changeUserNameBtn.addEventListener("mouseover", () => {
  changeUserNameBtn.style.color = "white";
  changeUserNameBtn.style.backgroundColor = mainColor;
});

changeUserNameBtn.addEventListener("mouseout", () => {
  changeUserNameBtn.style.color = mainColor;
  changeUserNameBtn.style.backgroundColor = "transparent";
});
