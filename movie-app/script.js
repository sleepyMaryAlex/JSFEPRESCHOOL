//============= Slideshow ============

let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let mySlides = document.querySelectorAll(".my-slides");
  let dots = document.querySelectorAll(".dot");
  if (n > mySlides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = mySlides.length;
  }
  for (let i = 0; i < mySlides.length; i++) {
    mySlides[i].style.display = "none";
    dots[i].style.backgroundColor = "#bbbbbb";
  }
  mySlides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].style.backgroundColor = "#717171";
}
showSlides(slideIndex);

// ================ API ==================

let DEFAULT_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=1";

const mainContainer = document.querySelector(".main-container");
const input = document.querySelector(".input");
const cancel = document.querySelector(".cancel");
const wrapper = document.querySelector(".wrapper");
const slider1 = document.querySelector(".slider-1");
const slider2 = document.querySelector(".slider-2");
const slider3 = document.querySelector(".slider-3");
const prevPage = document.querySelector(".prev-page");
const nextPage = document.querySelector(".next-page");
const pageNumber = document.querySelector(".page-number");
const caption = document.querySelector(".caption");
const maxPageNumber = document.querySelector(".max-page-number");

let num = 1;
let maxNum;
let pageUrl;
let inputValue;

document.addEventListener("keydown", checkKey);
cancel.addEventListener("click", clearInput);
input.addEventListener("input", changeImg);
window.addEventListener("resize", changeSliders);
prevPage.addEventListener("click", function () {
  if (num >= 2) {
    showPrevPage();
  }
});
nextPage.addEventListener("click", function () {
  if (num < maxNum) {
    showNextPage();
  }
});


async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}
getData(DEFAULT_URL);

function showData(data) {
  showMessage(data);
  maxNum = data.total_pages;
  maxPageNumber.textContent = maxNum;
  for (let i = 0; i < data.results.length; i++) {
    let posterPath = data.results[i].poster_path;
    let voteAverage = data.results[i].vote_average;
    let div = document.createElement("div");
    mainContainer.append(div);
    div.classList.add("poster");
    let img = document.createElement("img");
    div.append(img);
    if (posterPath === null) {
      img.setAttribute("src", "assets/replace-img.jpg");
    } else {
      img.setAttribute("src", `https://image.tmdb.org/t/p/w300${posterPath}`);
    }
    img.setAttribute("alt", "poster");
    img.classList.add("poster-img");
    let p = document.createElement("p");
    div.append(p);
    p.textContent = data.results[i].title;
    p.classList.add("original-title");
    let pYear = document.createElement("p");
    div.append(pYear);
    pYear.textContent = data.results[i].release_date.slice(0, 4);
    pYear.classList.add("year");
    let divOverview = document.createElement("div");
    div.append(divOverview);
    divOverview.textContent = data.results[i].overview;
    divOverview.classList.add("overview");
    div.addEventListener("mouseenter", () =>
      divOverview.classList.add("visible")
    );
    div.addEventListener("mouseleave", () =>
      divOverview.classList.remove("visible")
    );
    let pVote = document.createElement("p");
    div.append(pVote);
    if (voteAverage.toString().length === 1) {
      pVote.textContent = `${voteAverage}.0`;
    } else {
      pVote.textContent = voteAverage;
    }
    pVote.classList.add("vote");
    setColor(voteAverage, pVote);
  }
}

function setColor(voteAverage, pVote) {
  if (voteAverage >= 9) {
    pVote.style.backgroundColor = "#932241";
  } else if (voteAverage >= 8) {
    pVote.style.backgroundColor = "#267398";
  } else if (voteAverage >= 7) {
    pVote.style.backgroundColor = "#A6842A";
  } else if (voteAverage >= 6) {
    pVote.style.backgroundColor = "#27349A";
  } else if (voteAverage >= 5) {
    pVote.style.backgroundColor = "#000635";
  } else if (voteAverage >= 4) {
    pVote.style.backgroundColor = "#A66C2A";
  } else if (voteAverage <= 3) {
    pVote.style.backgroundColor = "#3A2E0F";
  }
}

function showMessage(data) {
  if (caption.textContent === "Found movies") {
    caption.textContent = `Found ${data.total_results} movies`;
  }
}

function checkKey(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
}

function changeImg() {
  if (input.value !== "") {
    cancel.setAttribute("src", "assets/cancel.svg");
    cancel.style.cursor = "pointer";
  } else if (input.value === "") {
    cancel.setAttribute("src", "assets/search.svg");
    cancel.style.cursor = "auto";
  }
}

function clearInput() {
  if (cancel.getAttribute("src") === "assets/cancel.svg") {
    cancel.setAttribute("src", "assets/search.svg");
    cancel.style.cursor = "auto";
    input.value = "";
    caption.textContent = "Popular movies";
    mainContainer.innerHTML = "";
    getData(DEFAULT_URL);
  }
}

function searchMovie() {
  mainContainer.innerHTML = "";
  inputValue = input.value;
  if (inputValue.trim() === "") {
    caption.textContent = "Popular movies";
    getData(DEFAULT_URL);
  } else {
    caption.textContent = "Found movies";
  }
  updatePage();
}

function changeSliders() {
  if (wrapper.clientWidth <= 790) {
    slider1.setAttribute("src", "assets/avengers-small.jpg");
    slider2.setAttribute("src", "assets/harry-small.jpg");
    slider3.setAttribute("src", "assets/twilight-small.jpg");
  } else {
    slider1.setAttribute("src", "assets/avengers.jpg");
    slider2.setAttribute("src", "assets/harry.jpg");
    slider3.setAttribute("src", "assets/twilight.jpg");
  }
}
changeSliders();

function showNextPage() {
  num = num + 1;
  pageNumber.textContent = num;
  mainContainer.innerHTML = "";
  if (caption.textContent === "Popular movies") {
    pageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  } else {
    pageUrl = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  }
}

function showPrevPage() {
  num = num - 1;
  pageNumber.textContent = num;
  mainContainer.innerHTML = "";
  if (caption.textContent === "Popular movies") {
    pageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  } else {
    pageUrl = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  }
}

function updatePage() {
  num = 1;
  pageNumber.textContent = 1;
  if (caption.textContent === "Popular movies") {
    pageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  } else {
    pageUrl = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=${num}`;
    getData(pageUrl);
  }
}


console.log("Верстка +10\nПри загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\nЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\nПоиск +30\nДополнительный функционал +10\nДобавлено:\n1. Наличие на карточке фильма его описания и рейтинга\n2. Возможность перехода на следующую и предыдущую страницы\nБуду благодарна за найденные баги!");