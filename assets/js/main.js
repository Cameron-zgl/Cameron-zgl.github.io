// Guli Zhu — academic personal website
// Shared behavior: theme toggle, language toggle, mobile nav, CV collapsibles, bibtex copy.

(function () {
  "use strict";

  var STORAGE_KEY = "gz-theme";
  var LANG_KEY = "gz-lang";
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function initTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    var preferred = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(preferred);

    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(current);
        localStorage.setItem(STORAGE_KEY, current);
      });
    }
  }

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var text = lang === "zh" ? (el.getAttribute("data-zh") || el.getAttribute("data-en")) : el.getAttribute("data-en");
      if (text != null) el.textContent = text;
    });

    document.querySelectorAll(".lang-toggle [data-lang-opt]").forEach(function (opt) {
      var active = opt.getAttribute("data-lang-opt") === lang;
      opt.classList.toggle("active", active);
      opt.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function initLang() {
    var stored = localStorage.getItem(LANG_KEY) || "en";
    applyLang(stored);

    document.querySelectorAll(".lang-toggle [data-lang-opt]").forEach(function (opt) {
      opt.addEventListener("click", function () {
        var lang = opt.getAttribute("data-lang-opt");
        localStorage.setItem(LANG_KEY, lang);
        applyLang(lang);
      });
    });
  }

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  function markActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a[data-page]").forEach(function (a) {
      if (a.getAttribute("data-page") === path) {
        a.classList.add("active");
      }
    });
  }

  function initBibtexCopy() {
    document.querySelectorAll(".copy-btn[data-copy-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-copy-target"));
        if (!target) return;
        var text = target.innerText;
        navigator.clipboard.writeText(text).then(function () {
          var original = btn.innerHTML;
          var copiedText = root.getAttribute("data-lang") === "zh" ? "已复制" : "Copied";
          btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> ' + copiedText;
          setTimeout(function () { btn.innerHTML = original; }, 1800);
        });
      });
    });
  }

  function initCvToolbar() {
    var expandAll = document.getElementById("cv-expand-all");
    var collapseAll = document.getElementById("cv-collapse-all");
    if (!expandAll && !collapseAll) return;
    var details = document.querySelectorAll("details.cv-section, details.cv-entry");
    if (expandAll) {
      expandAll.addEventListener("click", function () {
        details.forEach(function (d) { d.open = true; });
      });
    }
    if (collapseAll) {
      collapseAll.addEventListener("click", function () {
        details.forEach(function (d) { d.open = false; });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initLang();
    initNavToggle();
    markActiveNav();
    initBibtexCopy();
    initCvToolbar();
  });
})();
