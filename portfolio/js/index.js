import i18Obj from './translate.js';

(function () {
  let bars = document.querySelectorAll(".menu-bg");
  let links = document.querySelectorAll(".link");
  let menu = document.querySelector(".menu");
  for (let i = 0; i <= bars.length - 1; i++) {
    let bar = bars[i];
    toggleHandler(bar);
  }
  function toggleHandler(bar) {
    bar.addEventListener("click", function (e) {
      e.preventDefault();
      if (bar.classList.contains("is-active") === true) {
        bar.classList.remove("is-active");
        menu.classList.remove("open");
      } else {
        bar.classList.add("is-active");
        menu.classList.add("open");
      }
    });
  }

  function closeMenu() {
    for (let bar of bars) {
      bar.classList.remove("is-active");
    }
    menu.classList.remove("open");
  }
  for (let link of links) {
    link.addEventListener("click", closeMenu, false);
  }
})();

console.log("");

(function () {
  const portfolioBtns = document.querySelector(".portfolio-btns");
  const portfolioImages = document.querySelectorAll('.portfolio-img');
  function changeImage(e) {
    if(e.target.classList.contains('portfolio-btn')) {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/${e.target.dataset.season}/${index + 1}.jpg`);
    }
  }
  portfolioBtns.addEventListener("click", changeImage, false);

  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  function preloadImages() {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      seasons.forEach((season) => img.src = `./assets/img/${season}/${i}.jpg`);
    }
  }
  preloadImages();
})();

(function() {
  let en = document.querySelector(".en");
  let ru = document.querySelector(".ru");
  let languages = document.querySelectorAll(".lng");
  let data = document.querySelectorAll("[data-i18]");
  function getTranslate(e) {
    let lang = e.target.textContent;
    data.forEach((elem) => elem.textContent = i18Obj[lang][elem.dataset.i18]);
    languages.forEach((element) => element.classList.remove("active-lng"));
    e.target.classList.add("active-lng");
  }
en.addEventListener("click", getTranslate, false);
ru.addEventListener("click", getTranslate, false);
})();
