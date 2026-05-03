(function () {
  var brand = "Floravelle";

  document.querySelectorAll("[data-brand]").forEach(function (node) {
    node.textContent = brand;
  });

  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav-links]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-inquiry-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent =
          "Thanks. This preview site does not send messages yet, but the wholesale inquiry flow is ready for integration.";
      }
    });
  });

  if ("IntersectionObserver" in window) {
    var observerOptions = {
      threshold: 0.10,
      rootMargin: "0px 0px -36px 0px",
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal, .reveal-children, .section").forEach(function (el) {
      observer.observe(el);
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          header.style.boxShadow =
            window.scrollY > 8 ? "0 2px 24px rgba(32, 32, 29, 0.08)" : "";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
