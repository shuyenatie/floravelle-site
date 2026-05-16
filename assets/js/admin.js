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
    var labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var width = 720;
    var height = 260;
    var padX = 38;
    var padY = 34;
    var max = Math.max.apply(null, trend.concat([1]));
    var min = Math.min.apply(null, trend.concat([0]));
    var range = Math.max(1, max - min);

    function point(value, index) {
      var x = padX + (index * (width - padX * 2)) / Math.max(1, trend.length - 1);
      var y = height - padY - ((value - min) / range) * (height - padY * 2);
      return { x: Math.round(x), y: Math.round(y), value: value, label: labels[index] || "" };
    }

    function smoothPath(points) {
      if (!points.length) return "";
      var d = "M " + points[0].x + " " + points[0].y;
      for (var i = 1; i < points.length; i += 1) {
        var prev = points[i - 1];
        var current = points[i];
        var midX = Math.round((prev.x + current.x) / 2);
        d += " C " + midX + " " + prev.y + ", " + midX + " " + current.y + ", " + current.x + " " + current.y;
      }
      return d;
    }

    var points = trend.map(point);
    var linePath = smoothPath(points);
    var areaPath = linePath + " L " + points[points.length - 1].x + " " + (height - padY) + " L " + points[0].x + " " + (height - padY) + " Z";
    var grid = [0.25, 0.5, 0.75].map(function (ratio) {
      var y = Math.round(padY + ratio * (height - padY * 2));
      return '<line class="chart-grid-line" x1="' + padX + '" y1="' + y + '" x2="' + (width - padX) + '" y2="' + y + '"></line>';
    }).join("");
    var dots = points.map(function (p) {
      return '<g class="chart-point"><circle cx="' + p.x + '" cy="' + p.y + '" r="5"></circle><text x="' + p.x + '" y="' + (p.y - 14) + '">' + p.value + '</text><text class="chart-label" x="' + p.x + '" y="' + (height - 9) + '">' + p.label + '</text></g>';
    }).join("");

    node.innerHTML =
      '<svg class="admin-line-chart" viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="Seven day inquiry curve">' +
      '<defs><linearGradient id="inquiryArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7a8b6f" stop-opacity="0.34"></stop><stop offset="100%" stop-color="#7a8b6f" stop-opacity="0.02"></stop></linearGradient></defs>' +
      grid +
      '<path class="chart-area" d="' + areaPath + '"></path>' +
      '<path class="chart-line" d="' + linePath + '"></path>' +
      dots +
      '</svg>';
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
      '<div><strong>' + item.customerName + '</strong><span>' + item.company + ' - ' + item.country + '</span></div>' +
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
      '<p>' + product.category + ' - ' + product.useCase + '</p>' +
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

