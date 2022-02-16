const cards = document.querySelectorAll(".memory-card");
const time = document.querySelector(".time");
const moves = document.querySelector(".moves");
const disneyCards = document.querySelector(".disney-cards");
const actorsCards = document.querySelector(".actors-cards");
const scienceCards = document.querySelector(".science-cards");
const play = document.querySelector(".play");
const currentGame = document.querySelector(".current-game");
const memoryGame = document.querySelector(".memory-game");
const rules = document.querySelector(".rules");
const rulesH2 = document.querySelector(".rules-h2");
const rulesP = document.querySelector(".rules-p");
const main = document.querySelector(".main");
const result = document.querySelector(".result");
const winner = document.querySelector(".winner");
const setsOfCards = document.querySelector(".sets-of-cards");
const sets = document.querySelectorAll(".set");
const frontFace = document.querySelectorAll(".front-face");

let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;
let numberOfMoves = 0;
let count = 0;
let resultTime;
let resultMoves;
let arrResult = [];

disneyCards.addEventListener("click", chooseSet);
window.addEventListener("load", getFromStorage);
actorsCards.addEventListener("click", chooseSet);
scienceCards.addEventListener("click", chooseSet);
play.addEventListener("click", startGame);
cards.forEach((card) => card.addEventListener("click", flipCard));

function chooseSet() {
    sets.forEach(set => set.classList.remove("cards-active"));
    this.classList.add("cards-active");
}

function startGame() {
    if (disneyCards.classList.contains("cards-active") || actorsCards.classList.contains("cards-active") || scienceCards.classList.contains("cards-active")) {
        setsOfCards.classList.add("invisible");
        play.classList.add("invisible");
        currentGame.classList.add("visible");
        memoryGame.classList.add("visible");
        rules.classList.add("rules-after");
        main.classList.add("main-after");
        timer();
        replaceCards();
    }
}

function replaceCards() {
    if (disneyCards.classList.contains("cards-active")) {
        let src = ["assets/card-set/lion.jpg", "assets/card-set/lion.jpg", "assets/card-set/moana.jpg", "assets/card-set/moana.jpg", "assets/card-set/zootopia.jpg", "assets/card-set/zootopia.jpg", "assets/card-set/soul.jpg", "assets/card-set/soul.jpg", "assets/card-set/disney.jpg", "assets/card-set/disney.jpg", "assets/card-set/beauty.jpg", "assets/card-set/beauty.jpg"];
        frontFace.forEach((card, index) => card.setAttribute("src", src[index]));
    } else if (actorsCards.classList.contains("cards-active")) {
        let src = ["assets/card-set/emma.jpg", "assets/card-set/emma.jpg", "assets/card-set/robert.jpg", "assets/card-set/robert.jpg", "assets/card-set/benedict.jpg", "assets/card-set/benedict.jpg", "assets/card-set/fanning.jpg", "assets/card-set/fanning.jpg", "assets/card-set/kira.jpg", "assets/card-set/kira.jpg", "assets/card-set/dwayne.jpg", "assets/card-set/dwayne.jpg"];
        frontFace.forEach((card, index) => card.setAttribute("src", src[index]));
    } else if (scienceCards.classList.contains("cards-active")) {
        let src = ["assets/card-set/science1.jpg", "assets/card-set/science1.jpg", "assets/card-set/science2.jpg", "assets/card-set/science2.jpg", "assets/card-set/science3.jpg", "assets/card-set/science3.jpg", "assets/card-set/science4.jpg", "assets/card-set/science4.jpg", "assets/card-set/science5.jpg", "assets/card-set/science5.jpg", "assets/card-set/science6.jpg", "assets/card-set/science6.jpg"];
        frontFace.forEach((card, index) => card.setAttribute("src", src[index]));
    }
}

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
    count += 1;
    checkGameEnding();
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

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
shuffle();

function checkGameEnding() {
    if (count === cards.length / 2) {
        setTimeout(finishGame, 1000);
    }
}

function finishGame() {
    clearTimeout(t);
    main.classList.add("gif");
    result.classList.add("result-after");
    rulesH2.classList.add("invisible");
    rulesP.classList.add("invisible");
    winnerMessage();
    winner.classList.add("winner-after");
    saveToStorage();
}

function winnerMessage() {
    let messages = ["Good job!", "Well done!", "You rock!", "You rule!", "Bravo!", "That's perfect!", "Keep it up!", "Right on!"];
    let randomNum = Math.floor(Math.random() * 8);
    winner.textContent = messages[randomNum];
}

function saveToStorage() {
    resultTime = time.textContent;
    resultMoves = moves.textContent;
    let currentDate = createDate();
    let objResult = {
        date: currentDate,
        time: resultTime,
        moves: resultMoves
    } 
    arrResult.unshift(objResult);
    localStorage.setItem("arrResult", JSON.stringify(arrResult));
    console.log(arrResult);
    createRecordTable();
}

function getFromStorage() {
    if (localStorage.getItem("arrResult")) {
        arrResult = JSON.parse(localStorage.getItem("arrResult"));
        console.log(arrResult);
    }
}
function createDate() {
    let date = new Date();
    let monthNum = date.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[monthNum];
    let currentDate = month + " " + date.getDate() + " " + date.getFullYear() + " " + date.toTimeString().substring(0, 8);
    return currentDate;
}

function createRecordTable() {
    let p = document.createElement("p");
    rules.append(p);
    p.textContent = "Records";
    p.classList.add("records");
    
}

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

// let newGameBtn = document.querySelector(".new-game");

// newGameBtn.addEventListener("click", startNewGame);

// function startNewGame() {
//     shuffle();
// }