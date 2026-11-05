(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");

  function isDark() {
    return root.getAttribute("data-bs-theme") !== "light";
  }

  function paintThemeButton() {
    var dark = isDark();
    themeBtn.textContent = dark ? "Light mode" : "Dark mode";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  paintThemeButton();

  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-bs-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (err) {}
    paintThemeButton();
  });

  var links = Array.prototype.slice.call(document.querySelectorAll("#siteNav .nav-link"));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  function spy() {
    var y = window.scrollY + 110;
    var current = -1;
    sections.forEach(function (section, index) {
      if (section && section.offsetTop <= y) current = index;
    });
    links.forEach(function (link, index) {
      var on = index === current;
      link.classList.toggle("active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", spy, { passive: true });
  spy();

  var menu = document.getElementById("navMenu");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (!menu.classList.contains("show") || !window.bootstrap) return;
      var instance = window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
      instance.hide();
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy"));
      var text = target ? target.textContent.trim() : "";
      function done() {
        button.textContent = "Copied";
        button.classList.add("is-done");
        window.setTimeout(function () {
          button.textContent = "Copy";
          button.classList.remove("is-done");
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(done)
          .catch(function () {
            window.prompt("Copy this:", text);
          });
      } else {
        window.prompt("Copy this:", text);
      }
    });
  });
})();
