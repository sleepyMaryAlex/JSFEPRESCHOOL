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
  let body = document.querySelector(".body");
  let languages = document.querySelectorAll(".lng");
  let data = document.querySelectorAll("[data-i18]");
  function getTranslate(e) {
    let lang = e.target.textContent;
    data.forEach((elem) => elem.textContent = i18Obj[lang][elem.dataset.i18]);
    if (body.classList.contains("light-theme")) {
      languages.forEach((element) => element.classList.remove("active-lng"));
      languages.forEach((element) => element.classList.remove("active-white"));
      e.target.classList.add("active-white");
    } else {
      languages.forEach((element) => element.classList.remove("active-lng"));
      languages.forEach((element) => element.classList.remove("active-white"));
      e.target.classList.add("active-white");
      e.target.classList.add("active-lng");
    }

    }
en.addEventListener("click", getTranslate, false);
ru.addEventListener("click", getTranslate, false);
})();

(function() {
  let body = document.querySelector(".body");
  let hero = document.querySelector(".hero");
  let containerHeader = document.querySelector(".container-header");
  let contacts = document.querySelector(".contacts");
  let switchImg = document.querySelector(".switch-img");
  let en = document.querySelector(".en");
  let ru = document.querySelector(".ru");
  
  function switchTheme(e) {
    body.classList.toggle("light-theme");
    hero.classList.toggle("hero-bg");
    containerHeader.classList.toggle("header-light");
    contacts.classList.toggle("contacts-light");
    let imageSrc1 = "assets/svg/sun.svg"
    let imageSrc2 = "assets/svg/moon.svg"
    if (switchImg.getAttribute("src") === imageSrc1) {
      switchImg.setAttribute("src", imageSrc2);
    } else if (switchImg.getAttribute("src") === imageSrc2) {
      switchImg.setAttribute("src", imageSrc1);
    }
   if (ru.classList.contains("active-lng") && switchImg.getAttribute("src") === imageSrc2) {
    ru.classList.remove("active-lng");
    ru.classList.add("active-white");
   } else if (en.classList.contains("active-lng") && switchImg.getAttribute("src") === imageSrc2){
    en.classList.remove("active-lng");
    en.classList.add("active-white");
   }
   if (ru.classList.contains("active-white") && switchImg.getAttribute("src") === imageSrc1) {
    ru.classList.remove("active-white");
    ru.classList.add("active-lng");
   } else if (en.classList.contains("active-white") && switchImg.getAttribute("src") === imageSrc1) {
    en.classList.remove("active-white");
    en.classList.add("active-lng");
   }
   
  }
  switchImg.addEventListener("click", switchTheme, false);
})();