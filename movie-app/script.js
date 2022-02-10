let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
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
  mySlides[slideIndex-1].style.display = "block";
}

// ==================================

let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307";

let mainContainer = document.querySelector(".main-container");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  for (let i = 0; i < data.results.length; i++) {
    let div = document.createElement("div");
    mainContainer.append(div);
    div.classList.add("poster");
    let img = document.createElement("img");
    div.append(img);
    img.setAttribute("src", `https://image.tmdb.org/t/p/w300${data.results[i].poster_path}`);
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
    div.addEventListener("mouseenter", () => divOverview.classList.add("visible"));
    div.addEventListener("mouseleave", () => divOverview.classList.remove("visible"));
  }
}

getData();