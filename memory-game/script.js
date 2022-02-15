const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;

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

let time = document.querySelector(".time");
let moves = document.querySelector(".moves");

console.log(getHours());