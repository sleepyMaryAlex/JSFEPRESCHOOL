(function() {
    let toggles = document.querySelectorAll(".menu-bg");
    let links = document.querySelectorAll(".link");
    let menu = document.querySelector(".menu");
    for (let i = 0; i <= toggles.length - 1; i++) {
      let toggle = toggles[i];
      toggleHandler(toggle);
    };
    function toggleHandler(toggle) {
      toggle.addEventListener("click", function(e) {
        e.preventDefault();
        if (toggle.classList.contains("is-active") === true) {
            toggle.classList.remove("is-active");
            menu.classList.remove("open");
        } else {
            toggle.classList.add("is-active");
            menu.classList.add("open");
        } 
      });
    }
    
    function closeMenu() {
        for (let toggle of toggles) {
            toggle.classList.remove("is-active");
        }
        menu.classList.remove("open");
    }
    for (let link of links) {
        link.addEventListener("click", closeMenu);
    }
}
)();

console.log("Вёрстка соответствует макету. Ширина экрана 768px +48\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 768рх и меньше реализовано адаптивное меню +22");


