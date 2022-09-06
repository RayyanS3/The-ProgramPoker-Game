'use strict';

alert(`Rules of the game:
1. Each player rolls dice and the number rolled gets added to their current score
2. If the rolled number is a 1 (one), then the current score goes to 0 (zero)
3. If the player holds then the current score gets added to their total score
4. First player to reach 100 total points wins, enjoy!`);

//Decleartion and assignment of variables
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const dicePic = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
let playing;

//Setting variables ot standard conditions
const reset = function () {
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  dicePic.classList.add('hidden');
  playing = true;
  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner', 'player--active');
};
reset();

// Function declerations for switching players
const player1Active = function () {
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
  currentScore2.textContent = 0;
};

const player2Active = function () {
  player1.classList.remove('player--active');
  player2.classList.add('player--active');
  currentScore1.textContent = 0;
};

// Roll Dice button event
btnRoll.addEventListener('click', function () {
  if (playing) {
    const randomDiceNum = Math.trunc(Math.random() * 6) + 1;
    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${randomDiceNum}.png`;
    if (player1.classList.contains('player--active')) {
      currentScore1.textContent =
        Number(currentScore1.textContent) + randomDiceNum;
      if (randomDiceNum === 1) {
        player2Active();
      }
    } else if (player2.classList.contains('player--active')) {
      currentScore2.textContent =
        Number(currentScore2.textContent) + randomDiceNum;
      if (randomDiceNum === 1) {
        player1Active();
      }
    }
  }
});

// Hold button event
btnHold.addEventListener('click', function () {
  if (playing) {
    if (player1.classList.contains('player--active')) {
      score1.textContent =
        Number(score1.textContent) + Number(currentScore1.textContent);
      player2Active();
    } else if (player2.classList.contains('player--active')) {
      score2.textContent =
        Number(score2.textContent) + Number(currentScore2.textContent);
      player1Active();
    }

    if (Number(score1.textContent) >= 100) {
      player1.classList.add('player--winner');
      playing = false;
    } else if (Number(score2.textContent) >= 100) {
      player2.classList.add('player--winner');
      playing = false;
    }
  }
});

// New Game button event
btnNew.addEventListener('click', reset);
