(function() {
    let bars = document.querySelectorAll(".menu-bg");
    let links = document.querySelectorAll(".link");
    let menu = document.querySelector(".menu");
    for (let i = 0; i <= bars.length - 1; i++) {
      let bar = bars[i];
      toggleHandler(bar);
    };
    function toggleHandler(bar) {
      bar.addEventListener("click", function(e) {
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
        link.addEventListener("click", closeMenu);
    }
}
)();

console.log("Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22");


