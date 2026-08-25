/* ============================================================
   智能经济 · 数字经济研究 — 交互脚本
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 移动端导航 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var expanded = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      toggle.setAttribute("aria-label", expanded ? "关闭菜单" : "打开菜单");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---------- 滚动渐入（模拟 Framer Motion 的 whileInView） ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 数字滚动（数据高亮动效） ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1100;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseFloat(el.getAttribute("data-count")) + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Chip 筛选（AI 生态资讯 / 案例页） ---------- */
  var chipRows = document.querySelectorAll("[data-filter-group]");
  chipRows.forEach(function (row) {
    var group = row.getAttribute("data-filter-group");
    var targets = document.querySelectorAll('[data-filter-target="' + group + '"]');
    row.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var val = chip.getAttribute("data-value");
        row.querySelectorAll(".chip").forEach(function (c) {
          c.classList.toggle("active", c === chip);
        });
        targets.forEach(function (t) {
          var show = val === "all" || t.getAttribute("data-filter") === val;
          t.style.display = show ? "" : "none";
          if (show && t.classList.contains("reveal") && !t.classList.contains("is-visible")) {
            t.classList.add("is-visible");
          }
        });
      });
    });
  });

  /* ---------- 搜索框回车跳转到检索结果 ---------- */
  var searchForms = document.querySelectorAll("[data-search-form]");
  searchForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      window.location.href = "insights.html?q=" + encodeURIComponent(q);
    });
  });

  /* ---------- 高亮当前页导航 ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("active");
  });

  /* ---------- URL 参数搜索高亮（资讯页） ---------- */
  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  if (q) {
    var input = document.querySelector("[data-search-form] input");
    if (input) input.value = q;
    var briefItems = document.querySelectorAll(".brief-item__body, .article-card__excerpt");
    briefItems.forEach(function (item) {
      var text = item.textContent || "";
      if (text.toLowerCase().indexOf(q.toLowerCase()) === -1) {
        var wrap = item.closest(".brief-item, .article-card");
        if (wrap) wrap.style.display = "none";
      }
    });
  }

  /* ---------- 文档目录 Scrollspy（左侧目录高亮当前章节） ---------- */
  var spyNav = document.querySelector("[data-spy]");
  if (spyNav && "IntersectionObserver" in window) {
    var spyLinks = spyNav.querySelectorAll("a[href^='#']");
    var sections = [];
    spyLinks.forEach(function (a) {
      var el = document.querySelector(a.getAttribute("href"));
      if (el) sections.push(el);
    });
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          spyLinks.forEach(function (a) {
            a.parentNode.classList.toggle("active", a.getAttribute("href") === id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------- 演示链接提示（避免 href="#" 点击后跳回页首） ---------- */
  var demoLinks = document.querySelectorAll('a[href="#"]');
  if (demoLinks.length) {
    var toast = document.createElement("div");
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = "演示内容：该资源尚未发布。";
    document.body.appendChild(toast);
    var toastTimer = null;

    demoLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
          toast.classList.remove("show");
        }, 2200);
      });
    });
  }
})();
