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
const body = document.querySelector("body");
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

let sec = 0;
let min = 0;
let hour = 0;
let t;

let article = document.querySelector("article");
let aside = document.querySelector("aside");

disneyCards.addEventListener("click", chooseSet);
window.addEventListener("load", getFromStorage);
actorsCards.addEventListener("click", chooseSet);
scienceCards.addEventListener("click", chooseSet);
play.addEventListener("click", startGame);
cards.forEach((card) => card.addEventListener("click", flipCard));

function chooseSet() {
  sets.forEach((set) => set.classList.remove("cards-active"));
  this.classList.add("cards-active");
}

function startGame() {
  if (
    disneyCards.classList.contains("cards-active") ||
    actorsCards.classList.contains("cards-active") ||
    scienceCards.classList.contains("cards-active")
  ) {
    setsOfCards.classList.add("invisible");
    play.classList.add("invisible");
    currentGame.classList.add("visible");
    memoryGame.classList.add("visible");
    rules.classList.add("rules-after");
    main.classList.add("main-after");
    timer();
    replaceCards();
    rules.classList.remove("result-list");
    article.innerHTML = "";
    aside.innerHTML = "";
    rulesH2.classList.remove("invisible");
    rulesP.classList.remove("invisible");
  }
}

function replaceCards() {
  if (disneyCards.classList.contains("cards-active")) {
    let src = [
      "assets/card-set/lion.jpg",
      "assets/card-set/lion.jpg",
      "assets/card-set/moana.jpg",
      "assets/card-set/moana.jpg",
      "assets/card-set/zootopia.jpg",
      "assets/card-set/zootopia.jpg",
      "assets/card-set/soul.jpg",
      "assets/card-set/soul.jpg",
      "assets/card-set/disney.jpg",
      "assets/card-set/disney.jpg",
      "assets/card-set/beauty.jpg",
      "assets/card-set/beauty.jpg",
    ];
    frontFace.forEach((card, index) => card.setAttribute("src", src[index]));
  } else if (actorsCards.classList.contains("cards-active")) {
    let src = [
      "assets/card-set/emma.jpg",
      "assets/card-set/emma.jpg",
      "assets/card-set/robert.jpg",
      "assets/card-set/robert.jpg",
      "assets/card-set/benedict.jpg",
      "assets/card-set/benedict.jpg",
      "assets/card-set/fanning.jpg",
      "assets/card-set/fanning.jpg",
      "assets/card-set/kira.jpg",
      "assets/card-set/kira.jpg",
      "assets/card-set/dwayne.jpg",
      "assets/card-set/dwayne.jpg",
    ];
    frontFace.forEach((card, index) => card.setAttribute("src", src[index]));
  } else if (scienceCards.classList.contains("cards-active")) {
    let src = [
      "assets/card-set/science1.jpg",
      "assets/card-set/science1.jpg",
      "assets/card-set/science2.jpg",
      "assets/card-set/science2.jpg",
      "assets/card-set/science3.jpg",
      "assets/card-set/science3.jpg",
      "assets/card-set/science4.jpg",
      "assets/card-set/science4.jpg",
      "assets/card-set/science5.jpg",
      "assets/card-set/science5.jpg",
      "assets/card-set/science6.jpg",
      "assets/card-set/science6.jpg",
    ];
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
  cards.forEach((card) => {
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
  body.classList.add("gif");
  result.classList.add("result-after");
  rulesH2.classList.add("invisible");
  rulesP.classList.add("invisible");
  winnerMessage();
  winner.classList.add("winner-after");
  saveToStorage();
}

function winnerMessage() {
  let messages = [
    "Good job!",
    "Well done!",
    "You rock!",
    "You rule!",
    "Bravo!",
    "Perfect!",
    "Keep it up!",
    "Right on!",
  ];
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
    moves: resultMoves,
    seconds: sec,
  };
  arrResult.unshift(objResult);
  localStorage.setItem("arrResult", JSON.stringify(arrResult));
  createRecordTable(arrResult);
  createGameHistory(arrResult);
}

function getFromStorage() {
  if (localStorage.getItem("arrResult")) {
    arrResult = JSON.parse(localStorage.getItem("arrResult"));
  }
}
function createDate() {
  let date = new Date();
  let monthNum = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthNum];
  let currentDate =
    month +
    " " +
    date.getDate() +
    " " +
    date.getFullYear() +
    " " +
    date.toTimeString().substring(0, 8);
  return currentDate;
}

function createRecordTable(arrResult) {
  let p = document.createElement("p");
  article.append(p);
  p.textContent = "Records";
  p.classList.add("records");
  let indexes = findTheBest(arrResult);
    for (let i = 0; i < 3; i++) {
      let n = i;
      createRecordText(arrResult, n, indexes);
    }
}

function createRecordText(arrResult, n, indexes) {
    if (arrResult[n] !== undefined) {
        let div = document.createElement("div");
        article.append(div);
        let span1 = document.createElement("span");
        div.append(span1);
        span1.textContent = `${n + 1}. Date: `;
        span1.classList.add("span-style");
        let span2 = document.createElement("span");
        div.append(span2);
        span2.textContent = arrResult[indexes[n]]["date"];
        span2.classList.add("record-text");
        let span3 = document.createElement("span");
        div.append(span3);
        span3.textContent = " time: ";
        span3.classList.add("span-style");
        let span4 = document.createElement("span");
        div.append(span4);
        span4.textContent = arrResult[indexes[n]]["time"];
        span4.classList.add("record-text");
        let span5 = document.createElement("span");
        div.append(span5);
        span5.textContent = " moves: ";
        span5.classList.add("span-style");
        let span6 = document.createElement("span");
        div.append(span6);
        span6.textContent = arrResult[indexes[n]]["moves"];
        span6.classList.add("record-text");
    }
}

function createGameHistory(arrResult) {
    let p = document.createElement("p");
    aside.append(p);
    p.textContent = "Results of the last games";
    p.classList.add("game-history");
    for (let i = 0; i < 10; i++) {
        let n = i;
        createHistoryText(arrResult, n);
      }
}

function createHistoryText(arrResult, n) {
    let div = document.createElement("div");
    aside.append(div);
    let span1 = document.createElement("span");
    div.append(span1);
    if (arrResult[n] !== undefined) {
        span1.textContent = "◉ Date: ";
        span1.classList.add("span-style");
        let span2 = document.createElement("span");
        div.append(span2);
        span2.textContent = arrResult[n]["date"];
        span2.classList.add("record-text");
        let span3 = document.createElement("span");
        div.append(span3);
        span3.textContent = " time: ";
        span3.classList.add("span-style");
        let span4 = document.createElement("span");
        div.append(span4);
        span4.textContent = arrResult[n]["time"];
        span4.classList.add("record-text");
        let span5 = document.createElement("span");
        div.append(span5);
        span5.textContent = " moves: ";
        span5.classList.add("span-style");
        let span6 = document.createElement("span");
        div.append(span6);
        span6.textContent = arrResult[n]["moves"];
        span6.classList.add("record-text");
    }
}

function findTheBest(results) {
  let indexes = results
    .map((result, index) => ({
      sum: Number(result["moves"]) + result["seconds"],
      index: index,
    }))
    .sort((a, b) => a.sum - b.sum)
    .map((value) => value.index);
  return indexes;
}

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
  time.textContent =
    (hour > 9 ? hour : "0" + hour) +
    ":" +
    (min > 9 ? min : "0" + min) +
    ":" +
    (sec > 9 ? sec : "0" + sec);
  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}


// document.addEventListener("click", playAudio);
// const audio = document.querySelector("audio");

// function playAudio() {
//     audio.src = "assets/audio/Helios - Bless This Morning Year.mp3"
//     audio.currentTime = 0;
//     audio.play();
// }

let newGameBtn = document.querySelector(".new-game");

newGameBtn.addEventListener("click", startNewGame);

function startNewGame() {
    setsOfCards.classList.remove("invisible");
    play.classList.remove("invisible");
    currentGame.classList.remove("visible");
    memoryGame.classList.remove("visible");
    rules.classList.remove("rules-after");
    main.classList.remove("main-after");
    clearTimeout(t);
    sec = 0;
    min = 0;
    hour = 0;
    count = 0;
    time.textContent = "00:00:00";
    numberOfMoves = 0;
    moves.textContent = "0";
    shuffle();
    hasFlippedCard = false;
    lockBoard = false;
    cards.forEach(card => card.classList.remove("flip"));
    cards.forEach((card) => card.addEventListener("click", flipCard));
    body.classList.remove("gif");
    rulesH2.classList.add("invisible");
    rulesP.classList.add("invisible");
    rules.classList.add("result-list");
    winner.classList.remove("winner-after");
    aside.innerHTML = "";
}
