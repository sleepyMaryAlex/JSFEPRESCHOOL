let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa2ce8765d07b86eafdaaf3467fd8307";

let posters = document.querySelectorAll(".poster")
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  posters.forEach((poster, index) => poster.textContent = data.results[index].overview);
}
getData();
