(function () {
  var data = window.FloravelleData || {};
  var config = data.siteConfig || {};
  var products = data.products || [];
  var categories = data.categories || [];
  var baseInquiries = data.inquiries || [];
  var dashboard = data.dashboard || {};

  function storedInquiries() {
    try {
      return JSON.parse(localStorage.getItem("floravelle-preview-inquiries") || "[]");
    } catch (error) {
      return [];
    }
  }

  function allInquiries() {
    return storedInquiries().concat(baseInquiries);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  function statusClass(status) {
    return "status status-" + String(status || "new").toLowerCase().replace(/\s+/g, "-");
  }

  function renderBars(target, items, maxValue) {
    var node = document.querySelector(target);
    if (!node) return;
    node.innerHTML = items.map(function (item) {
      var value = item.value || item.inquiries || item.count || 0;
      var width = Math.max(8, Math.round((value / maxValue) * 100));
      return (
        '<div class="admin-bar-row">' +
        '<span>' + item.label + '</span>' +
        '<div class="admin-bar"><i style="width:' + width + '%"></i></div>' +
        '<strong>' + value + '</strong>' +
        '</div>'
      );
    }).join("");
  }

  function renderTrend() {
    var node = document.querySelector("[data-trend]");
    if (!node) return;
    var trend = dashboard.trend7 || [];
    var max = Math.max.apply(null, trend.concat([1]));
    node.innerHTML = trend.map(function (value) {
      return '<span style="height:' + Math.max(18, Math.round((value / max) * 100)) + '%"><b>' + value + '</b></span>';
    }).join("");
  }

  function renderDashboard() {
    var inquiries = allInquiries();
    setText("[data-metric-total]", String(dashboard.totalInquiries || inquiries.length));
    setText("[data-metric-new]", String(inquiries.filter(function (item) { return item.status === "New"; }).length));
    setText("[data-metric-samples]", String(dashboard.sampleRequests || 0));
    setText("[data-metric-quotes]", String(dashboard.quoteRequests || 0));
    setText("[data-metric-oem]", String(dashboard.oemRequests || 0));
    setText("[data-metric-response]", dashboard.avgResponseTime || "18h");
    renderTrend();
    renderBars("[data-source-share]", (dashboard.sourceShare || []).map(function (item) {
      return { label: item.label, value: item.value };
    }), 40);
    renderBars("[data-top-categories]", categories.map(function (item) {
      return { label: item.name, value: item.inquiries };
    }), 35);
  }

  function inquiryCard(item) {
    return (
      '<article class="admin-row" data-inquiry-id="' + item.id + '">' +
      '<div><strong>' + item.customerName + '</strong><span>' + item.company + ' · ' + item.country + '</span></div>' +
      '<div><strong>' + item.productCategory + '</strong><span>' + item.quantity + '</span></div>' +
      '<div><strong>' + item.inquiryType + '</strong><span>' + item.createdAt + '</span></div>' +
      '<div><span class="' + statusClass(item.status) + '">' + item.status + '</span></div>' +
      '</article>'
    );
  }

  function renderInquiries() {
    var list = document.querySelector("[data-inquiry-list]");
    var detail = document.querySelector("[data-inquiry-detail]");
    if (!list) return;
    var inquiries = allInquiries();
    list.innerHTML = inquiries.map(inquiryCard).join("");
    function show(item) {
      if (!detail) return;
      detail.innerHTML =
        '<div class="section-kicker">Inquiry Detail</div>' +
        '<h2 class="admin-panel-title">' + item.id + '</h2>' +
        '<dl class="admin-detail-list">' +
        '<dt>Buyer</dt><dd>' + item.customerName + ', ' + item.company + '</dd>' +
        '<dt>Country</dt><dd>' + item.country + '</dd>' +
        '<dt>Category</dt><dd>' + item.productCategory + '</dd>' +
        '<dt>Quantity</dt><dd>' + item.quantity + '</dd>' +
        '<dt>Packaging</dt><dd>' + item.packagingNeeds + '</dd>' +
        '<dt>Timeline</dt><dd>' + item.timeline + '</dd>' +
        '<dt>Status</dt><dd><span class="' + statusClass(item.status) + '">' + item.status + '</span></dd>' +
        '</dl>';
    }
    show(inquiries[0]);
    list.querySelectorAll("[data-inquiry-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        var found = inquiries.find(function (item) { return item.id === row.getAttribute("data-inquiry-id"); });
        if (found) show(found);
      });
    });
  }

  function productCard(product) {
    return (
      '<article class="admin-product-card">' +
      '<div class="admin-product-image" style="background-image:url(' + product.image + ')"></div>' +
      '<div><span class="admin-code">' + product.id + '</span><h3>' + product.name + '</h3>' +
      '<p>' + product.category + ' · ' + product.useCase + '</p>' +
      '<div class="admin-tags">' +
      (product.featured ? '<span>Featured</span>' : '') +
      (product.sampleFocus ? '<span>Sample focus</span>' : '') +
      (product.oemReady ? '<span>OEM ready</span>' : '') +
      '</div></div>' +
      '</article>'
    );
  }

  function renderCatalog() {
    var categoryNode = document.querySelector("[data-admin-categories]");
    var productNode = document.querySelector("[data-admin-products]");
    if (categoryNode) {
      categoryNode.innerHTML = categories.map(function (category) {
        return (
          '<article class="admin-category-card">' +
          '<strong>' + category.name + '</strong>' +
          '<span>' + category.count + ' products</span>' +
          '<small>' + category.inquiries + ' linked inquiries</small>' +
          '</article>'
        );
      }).join("");
    }
    if (productNode) {
      productNode.innerHTML = products.map(productCard).join("");
    }
  }

  setText("[data-brand]", config.brandName || "Floravelle");
  setText("[data-company-summary]", config.companySummary || "");
  setText("[data-support-email]", config.supportEmail || "");
  renderDashboard();
  renderInquiries();
  renderCatalog();
})();
