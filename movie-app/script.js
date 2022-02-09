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








let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307";

let posters = document.querySelectorAll(".poster")
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  posters.forEach((poster, index) => poster.textContent = data.results[index].overview);
}
getData();
