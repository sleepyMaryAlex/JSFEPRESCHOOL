(function() {
    // "use strict";
    let toggles = document.querySelectorAll(".menu-bg");
    for (let i = toggles.length - 1; i >= 0; i--) {
      let toggle = toggles[i];
      toggleHandler(toggle);
    };
    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      });
    }
  })();