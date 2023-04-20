const inputsContainer = document.querySelector(".inputs"),
  descTitle = document.querySelector(".desc"),
  guessCount = document.querySelector(".guess_count"),
  resetButton = document.querySelector("button"),
  typing = document.querySelector(".typing"),
  succ = new Audio("../audios/succ.mp3"),
  winner = document.querySelector(".winner");

// all words
const words = [
  {
    word: "ronaldo",
    desc: "The Champions League's top goalscorer of all time",
  },
  {
    word: "trezeguet",
    desc: "Scored the Golden Goal in Euro 2000 Final",
  },
  {
    word: "wigan",
    desc: "Reece James spent the 2019/20 season on loan at which club",
  },
  {
    word: "muller",
    desc: "The Bundesliga's all-time top goalscorer",
  },
  {
    word: "shearer",
    desc: "The first striker to score 100 Premier League goals for two different clubs",
  },
  {
    word: "papajohns",
    desc: "Company has sponsored the EFL Trophy since 2020",
  },
  {
    word: "celtic",
    desc: "UK team was the first to win the European Cup",
  },
  {
    word: "ronaldinho",
    desc: "This Brazil player was jailed after it was found that his passport was fake",
  },
  {
    word: "robertobaggio",
    desc: "“A goal in the sky” is the autobiography of which football player",
  },
];

let word,
  maxGuess = 5,
  countToWin = [];
// focus input after user keydown
document.addEventListener("keydown", () => typing.focus());
// start game after user keydown
typing.addEventListener("input", startGame);

// handle click resetButton change game
resetButton.addEventListener("click", getRandomWord);

// get Random Word
function getRandomWord() {
  // handle reset element
  reset();
  let randomObject = words[Math.floor(Math.random() * words.length)];
  let desc = randomObject.desc;
  // overwrite values
  word = randomObject.word;
  // add descrebtion
  descTitle.innerText = desc;
  // add guess count
  guessCount.innerText = maxGuess;
  // creaet inputs
  let inputs = "";
  for (let i = 0; i < word.length; i++) {
    inputs += `<input type="text" disabled/>`;
  }
  inputsContainer.innerHTML = inputs;
}
getRandomWord();

// start game
function startGame(e) {
  let char = e.target.value;
  if (!char.match(/[a-z]/i)) return;
  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      //  add char in poisiton && cheack poisiton is found or no
      if (
        word[i] === char &&
        !inputsContainer.querySelectorAll("input")[i].value
      ) {
        inputsContainer.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    maxGuess--;
  }
  guessCount.innerText = maxGuess;
  typing.value = "";

  // winner
  if (countToWin.length === word.length) {
    winner.classList.remove("hidden");
    succ.play();
    countToWin = [];
  }

  // lose
  setTimeout(() => {
    if (maxGuess <= 0) {
      alert("You're a bad loser");
      for (let i = 0; i < word.length; i++) {
        inputsContainer.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

// reset element
function reset() {
  // guees count
  maxGuess = 5;
  // hidden winneer
  winner.classList.add("hidden");
  // countToWin
  countToWin = [];
  // paues audio
  succ.pause();
}
