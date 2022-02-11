let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let mySlides = document.querySelectorAll(".my-slides");
  if (n > mySlides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = mySlides.length;
  }
  for (let i = 0; i < mySlides.length; i++) {
    mySlides[i].style.display = "none";
  }
  mySlides[slideIndex - 1].style.display = "block";
}

// ==================================

let DEFAULT_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307&page=1";

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


let num = 1;
let maxNum;
let pageUrl;
let inputValue;


document.addEventListener("keydown", check);
cancel.addEventListener("click", clearInput);
input.addEventListener("input", changeImg);
window.addEventListener("resize", changeSliders);
prevPage.addEventListener("click", function() {
  if (num >= 2) {showPrevPage()}});
nextPage.addEventListener("click", function() {
  if (num < maxNum) {showNextPage()}});

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (caption.textContent === "Found movies") {
    caption.textContent = `Found ${data.total_results} movies`;
  }
  maxNum = data.total_pages;
  if (data.results.length === 0) {
    showMessage();
  } else {
    for (let i = 0; i < data.results.length; i++) {
      let div = document.createElement("div");
      mainContainer.append(div);
      div.classList.add("poster");
      let img = document.createElement("img");
      div.append(img);
      if (data.results[i].poster_path === null) {
        img.setAttribute("src", "assets/replace-img.jpg");
      } else {
        img.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w300${data.results[i].poster_path}`
        );
      }
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
      if (data.results[i].vote_average.toString().length === 1) {
        pVote.textContent = `${data.results[i].vote_average}.0`;
      } else {
        pVote.textContent = data.results[i].vote_average;
      }
      pVote.classList.add("vote");
      if (data.results[i].vote_average >= 9) {
        pVote.style.backgroundColor = "#932241";
      } else if (data.results[i].vote_average >= 8) {
        pVote.style.backgroundColor = "#267398";
      } else if (data.results[i].vote_average >= 7) {
        pVote.style.backgroundColor = "#A6842A";
      } else if (data.results[i].vote_average >= 6) {
        pVote.style.backgroundColor = "#27349A";
      } else if (data.results[i].vote_average >= 5) {
        pVote.style.backgroundColor = "#000635";
      } else if (data.results[i].vote_average >= 4) {
        pVote.style.backgroundColor = "#A66C2A";
      } else if (data.results[i].vote_average <= 3) {
        pVote.style.backgroundColor = "#3A2E0F";
      }
    }
  }
}
getData(DEFAULT_URL);


function check(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
}

function changeImg() {
  cancel.setAttribute("src", "assets/cancel.svg");
}

function clearInput() {
  if (cancel.getAttribute("src") === "assets/cancel.svg") {
    cancel.setAttribute("src", "assets/search.svg");
    input.value = "";
  }
}

function showMessage() {
  let message = document.createElement("p");
  mainContainer.append(message);
  message.classList.add("message");
  message.textContent = "nothing found for your request";
}

function searchMovie() {
  mainContainer.innerHTML = "";
  inputValue = input.value;
  caption.textContent = "Found movies";
  if (inputValue === ""){
    showMessage();
  }
  let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=aa2ce8765d07b86eafdaaf3467fd8307`;
  getData(searchUrl);
  updatePage();
}

function changeSliders() {
  if (wrapper.clientWidth <= 790) {
    slider1.setAttribute("src", "assets/avengers-small.jpg")
    slider2.setAttribute("src", "assets/harry-small.jpg")
    slider3.setAttribute("src", "assets/twilight-small.jpg")
  } else {
    slider1.setAttribute("src", "assets/avengers.jpg")
    slider2.setAttribute("src", "assets/harry.jpg")
    slider3.setAttribute("src", "assets/twilight.jpg")
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
  } else  {
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

// https://api.themoviedb.org/3/search/movie?query=bye&api_key=aa2ce8765d07b86eafdaaf3467fd8307