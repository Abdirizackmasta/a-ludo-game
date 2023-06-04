"use restrict";
// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting conditions

let scores, currentScore, activeplayer, playing;

const inIt = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--winner");
};

inIt();

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled1: if true, switch to next player
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activeplayer] += currentScore;
    // scores[1]  = scores[1] + currentScore
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    // 2. check player's score is >= 100
    if (scores[activeplayer] >= 20) {
      // finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player-active");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", inIt);
