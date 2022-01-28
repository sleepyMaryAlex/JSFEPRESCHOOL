import i18Obj from './translate.js';

(function () {
  let bars = document.querySelectorAll(".menu-bg");
  let links = document.querySelectorAll(".link");
  let menu = document.querySelector(".menu");
  let burger = document.querySelector(".burger");
  for (let i = 0; i <= bars.length - 1; i++) {
    let bar = bars[i];
    toggleHandler(bar);
  }
  function toggleHandler(bar) {
    bar.addEventListener("click", function (e) {
      e.preventDefault();
      burger.style.transitionDelay = "0.3s";
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
  const portfolioButtons = document.querySelectorAll(".portfolio-btn");
  const portfolioImages = document.querySelectorAll('.portfolio-img');
  let switchImg = document.querySelector(".switch-img");
  let imageSrc1 = "assets/svg/sun.svg";
  let imageSrc2 = "assets/svg/moon.svg";
  function changeImage(e) {
    if(e.target.classList.contains('portfolio-btn')) {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/${e.target.dataset.season}/${index + 1}.jpg`);
    }
  }
  portfolioBtns.addEventListener("click", changeImage, false);

  function changeBtns(e) {
    if (e.target.classList.contains('portfolio-btn') && switchImg.getAttribute("src") === imageSrc1) {
    portfolioButtons.forEach((btn) => btn.classList.remove("portfolio-btn-white"));
    portfolioButtons.forEach((btn) => btn.classList.remove("portfolio-btns-white"));
    e.target.classList.add("portfolio-btn-white");
    } else if (e.target.classList.contains('portfolio-btn') && switchImg.getAttribute("src") === imageSrc2) {
      portfolioButtons.forEach((btn) => btn.classList.remove("portfolio-btn-black"));
      portfolioButtons.forEach((btn) => btn.classList.remove("portfolio-btn-white"));
      e.target.classList.add("portfolio-btn-black");
    }
  }

  portfolioBtns.addEventListener("click", changeBtns, false);

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
  let btn = document.querySelector(".btn");
  let caption = document.querySelector(".caption");
  let contactBtn = document.querySelector(".contact-btn");
  let logo = document.querySelector(".logo");
  let socialListItems = document.querySelectorAll(".social-list-item");
  let captionsSpan = document.querySelectorAll(".caption-span");
  let contactInputs = document.querySelectorAll(".contact-input");
  let h2 = document.querySelectorAll(".h2");
  let portfolioBtns = document.querySelectorAll(".portfolio-btn");
  let links = document.querySelectorAll(".link");
  let navItems = document.querySelectorAll(".nav-item");
  let burger = document.querySelector(".burger");
  let menu = document.querySelector(".menu");
  
  function switchTheme(e) {
    body.classList.toggle("light-theme");
    hero.classList.toggle("hero-bg");
    containerHeader.classList.toggle("header-light");
    contacts.classList.toggle("contacts-light");
    let imageSrc1 = "assets/svg/sun.svg";
    let imageSrc2 = "assets/svg/moon.svg";
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
   btn.classList.toggle("btn-white");
   btn.classList.toggle("hover-gold");
   contactBtn.classList.toggle("btn-white");
   contactBtn.classList.toggle("hover-gold");
   logo.classList.toggle("logo-white");
   caption.classList.toggle("caption-white");
   menu.classList.toggle("menu-white");
   socialListItems.forEach((item) => item.classList.toggle("logo-white"));
   captionsSpan.forEach((span) => span.classList.toggle("captions-white"));
   contactInputs.forEach((input) => input.classList.toggle("input-white"));
   h2.forEach((elem) => elem.classList.toggle("section-line-white"));
   portfolioBtns.forEach((btn) => btn.classList.toggle("hover-white"));
   portfolioBtns.forEach((btn) => btn.classList.toggle("portfolio-btn-gold"));
   navItems.forEach((item) => item.classList.toggle("hover-white"));
   links.forEach((link) => link.classList.toggle("link-white"));

   if (switchImg.getAttribute("src") === imageSrc1) {
    burger.classList.remove("burger-white");
    burger.style.transitionDelay = "0s";
   } else if (switchImg.getAttribute("src") === imageSrc2) {
    burger.classList.add("burger-white");
    burger.style.transitionDelay = "0s";
   }

 
    for(let btn of portfolioBtns) {
        if (switchImg.getAttribute("src") === imageSrc2 && btn.classList.contains("portfolio-btn-white")) {
            btn.classList.remove("portfolio-btn-white");
            btn.classList.remove("portfolio-btns-white");
            btn.classList.add("portfolio-btn-black");
          } else if (switchImg.getAttribute("src") === imageSrc1 && btn.classList.contains("portfolio-btn-black")) {
            btn.classList.remove("portfolio-btn-white");
            btn.classList.remove("portfolio-btn-black");
            btn.classList.add("portfolio-btns-white");
          } else if (switchImg.getAttribute("src") === imageSrc2 && btn.classList.contains("portfolio-btns-white")) {
            btn.classList.remove("portfolio-btns-white");
            btn.classList.add("portfolio-btn-black");
          }
    }

  }
  switchImg.addEventListener("click", switchTheme, false);
})();

(function() {
  function animateButton(e) {
    let btn = document.querySelector(".btn");
    let contactBtn = document.querySelector(".contact-btn");
    let imageSrc1 = "assets/svg/sun.svg";
    let imageSrc2 = "assets/svg/moon.svg";
    let switchImg = document.querySelector(".switch-img");
    if (switchImg.getAttribute("src") === imageSrc2){
      btn.classList.add("bubbly-white");
      contactBtn.classList.add("bubbly-white");
    } else if (switchImg.getAttribute("src") === imageSrc1) {
      btn.classList.remove("bubbly-white");
      contactBtn.classList.remove("bubbly-white");
    }
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
 let bubblyButtons = document.querySelectorAll(".bubbly-button");
  
  for (let bubblyButton of bubblyButtons) {
    bubblyButton.addEventListener('click', animateButton, false);
  }
 
})();