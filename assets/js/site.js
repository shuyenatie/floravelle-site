(function () {
  var brand = "Floravelle";

  /* ── Brand name ─────────────────────── */
  document.querySelectorAll("[data-brand]").forEach(function (node) {
    node.textContent = brand;
  });

  /* ── Mobile menu ────────────────────── */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav-links]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      if (open) {
        nav.classList.add("is-open");
      } else {
        nav.classList.remove("is-open");
      }
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ── Inquiry form ───────────────────── */
  document.querySelectorAll("[data-inquiry-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent =
          "Thanks. This local prototype does not send messages yet, but the inquiry path is ready for integration.";
      }
    });
  });

  /* ── Scroll reveal ──────────────────── */
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

  /* ── Header shadow on scroll ────────── */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 8) {
            header.style.boxShadow = "0 2px 24px rgba(32, 32, 29, 0.08)";
          } else {
            header.style.boxShadow = "";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
