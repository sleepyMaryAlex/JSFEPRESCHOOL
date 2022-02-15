const cards = document.querySelectorAll(".memory-card");
let time = document.querySelector(".time");
let moves = document.querySelector(".moves");

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let numberOfMoves = 0;

function flipCard() {
  if (lockBoard) {
      return;
  }
  if (this === firstCard) {
      return;
  }
  this.classList.add("flip");

  if (hasFlippedCard === false) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
    numberOfMoves += 1;
    moves.textContent = numberOfMoves;
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
shuffle();

let sec = 0;
let min = 0;
let hour = 0;
let t;

function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    if (min >= 60) {
        min = 0;
        hour++;
    }
}

function add() {
    tick();
    time.textContent = (hour > 9 ? hour : "0" + hour) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
    timer(); 
}

function timer() {
    t = setTimeout(add, 1000); 
}
timer();