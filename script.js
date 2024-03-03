'use strict';

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
// Both do the same functionality, but getElementById is faster than querySelector
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore1 = document.getElementById('current--1');
const currentScore0 = document.getElementById('current--0');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore,
  activePlayer,
  scores,
  playing = true;

const hideDice = function () {
  dice.classList.add('hidden');
};
const initialization = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner', 'player--active');
  player0.classList.add('player--active');
  hideDice();
};

initialization();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      hideDice();
    } else switchPlayer();
  }
});

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active'); //classList.toggle()- add the class if not there and if there removes the class
  player1.classList.toggle('player--active');
}

btnNew.addEventListener('click', initialization);
