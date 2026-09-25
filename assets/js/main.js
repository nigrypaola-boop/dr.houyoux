(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: solid background once the page scrolls past the video hero */
  var header = document.querySelector(".site-header");
  if (header && document.body.classList.contains("has-hero")) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile drawer */
  var openBtn = document.querySelector("[data-drawer-open]");
  var drawer = document.querySelector(".drawer");
  var overlay = document.querySelector(".drawer-overlay");
  function openDrawer() {
    document.body.classList.add("drawer-open");
    openBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    var first = drawer.querySelector("a");
    if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
  }
  function closeDrawer() {
    if (!document.body.classList.contains("drawer-open")) return;
    document.body.classList.remove("drawer-open");
    openBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    openBtn.focus({ preventScroll: true });
  }
  if (openBtn && drawer && overlay) {
    openBtn.addEventListener("click", openDrawer);
    overlay.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  }

  /* Tabs (segmented control with sliding indicator) */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var list = root.querySelector("[role=tablist]");
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[role=tab]"));
    var indicator = list.querySelector(".indicator");
    function place(tab) {
      indicator.style.width = tab.offsetWidth + "px";
      indicator.style.transform = "translateX(" + (tab.offsetLeft - 4) + "px)";
    }
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      place(tab);
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    var current = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
    indicator.style.transition = "none";
    place(current);
    requestAnimationFrame(function () { indicator.style.transition = ""; });
    window.addEventListener("resize", function () {
      place(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0]);
    });
  });

  /* Toasts */
  var toaster = document.createElement("div");
  toaster.className = "toaster";
  toaster.setAttribute("role", "status");
  toaster.setAttribute("aria-live", "polite");
  document.body.appendChild(toaster);
  function toast(title, text) {
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("data-state", "enter");
    el.innerHTML = '<span class="dot" aria-hidden="true"><svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5l3 3L10 1" stroke="#fff" stroke-width="1.8"/></svg></span><div><b></b><span></span></div>';
    el.querySelector("b").textContent = title;
    el.querySelector("div span").textContent = text;
    toaster.appendChild(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.removeAttribute("data-state"); }); });
    var timer = setTimeout(remove, 5000);
    function remove() {
      clearTimeout(timer);
      el.setAttribute("data-state", "exit");
      setTimeout(function () { el.remove(); }, 220);
    }
    el.addEventListener("click", remove);
  }

  /* Forms: sent to Formspree once the form id is configured (see README) */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var action = form.getAttribute("action") || "";
      var btn = form.querySelector("[type=submit]");
      if (action.indexOf("VOTRE_ID") !== -1) {
        toast("Formulaire en démonstration", "Connectez Formspree pour recevoir les demandes (voir README).");
        return;
      }
      btn.disabled = true;
      fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          toast("Demande envoyée", "Le centre vous recontacte rapidement.");
        })
        .catch(function () {
          toast("La demande n'est pas partie", "Réessayez ou appelez le +41 79 596 63 04.");
        })
        .then(function () { btn.disabled = false; });
    });
  });

  /* Upload label shows chosen file count */
  document.querySelectorAll(".upload input[type=file]").forEach(function (input) {
    input.addEventListener("change", function () {
      var label = input.closest(".upload").querySelector("[data-upload-label]");
      var n = input.files.length;
      label.textContent = n ? n + (n > 1 ? " photos ajoutées" : " photo ajoutée") : "Ajouter vos photos";
    });
  });

  /* Hero video: no autoplay when reduced motion or data saver is requested */
  var video = document.querySelector(".hero video");
  if (video) {
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) {
      video.removeAttribute("autoplay");
      video.pause();
    } else {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
