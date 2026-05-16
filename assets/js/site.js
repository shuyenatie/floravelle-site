(function () {
  var data = window.FloravelleData || {};
  var config = data.siteConfig || {};
  var brand = config.brandName || "Floravelle";

  function text(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  document.querySelectorAll("[data-brand]").forEach(function (node) {
    node.textContent = brand;
  });

  text("[data-company-name]", config.companyName);
  text("[data-support-email]", config.supportEmail);
  text("[data-whatsapp]", config.whatsapp);
  text("[data-response-time]", config.responseTime);
  text("[data-lead-time]", config.leadTime);
  text("[data-moq]", config.moq);
  text("[data-sample-policy]", config.samplePolicy);
  text("[data-company-summary]", config.companySummary);

  document.querySelectorAll("[data-email-link]").forEach(function (node) {
    if (config.supportEmail) {
      node.setAttribute("href", "mailto:" + config.supportEmail + "?subject=Wholesale%20Inquiry");
    }
  });

  document.querySelectorAll("[data-admin-count]").forEach(function (node) {
    var key = node.getAttribute("data-admin-count");
    if (key === "products") node.textContent = String((data.products || []).length);
    if (key === "inquiries") node.textContent = String((data.inquiries || []).length);
  });

  function storedInquiries() {
    try {
      return JSON.parse(localStorage.getItem("floravelle-preview-inquiries") || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveInquiry(inquiry) {
    var stored = storedInquiries();
    stored.unshift(inquiry);
    localStorage.setItem("floravelle-preview-inquiries", JSON.stringify(stored.slice(0, 12)));
  }

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
      var formData = new FormData(form);
      var interest =
        formData.get("interested-products") ||
        formData.get("interest") ||
        "General wholesale collection";
      saveInquiry({
        id: "INQ-DEMO-" + new Date().getTime().toString().slice(-6),
        customerName: formData.get("name") || "Preview Buyer",
        company: formData.get("company") || "Preview Company",
        country: formData.get("country") || "Not specified",
        inquiryType: formData.get("project-type") || "Request Quote",
        productCategory: String(interest),
        productId: "Preview",
        quantity: formData.get("estimated-quantity") || formData.get("quantity") || "Not specified",
        packagingNeeds: String(formData.get("message") || "To be confirmed"),
        timeline: "Submitted in preview flow",
        status: "New",
        createdAt: new Date().toISOString().slice(0, 10),
        source: document.title || "Preview form",
      });
      if (status) {
        status.textContent =
          "Inquiry saved to the preview admin. In production this step will send to email or CRM.";
      }
      form.reset();
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
