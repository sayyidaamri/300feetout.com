/* FarReach — shared chrome & helpers (vanilla JS, no dependencies) */
(function () {
  "use strict";
  const FR = (window.FR = {});
  const doc = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  FR.reduce = reduce;
  FR.isMobile = () => window.innerWidth < 640;
  FR.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  FR.lerp = (a, b, t) => a + (b - a) * t;
  FR.ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
  FR.easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- theme (before paint) ---------- */
  if (store.get("fr-theme") === "dark") doc.classList.add("dark");
  if (store.get("fr-bigtext") === "1") doc.classList.add("big-text");

  const ARROW = '<svg viewBox="0 0 18 16" aria-hidden="true"><path d="M10 0.9 17.1 8 10 15.1 8.4 13.5 12.8 9.1H0.9V6.9H12.8L8.4 2.5Z" fill="currentColor"/></svg>';
  FR.ARROW = ARROW;
  const page = (document.body.className.match(/page-(\w+)/) || [])[1] || "home";
  const NAV = [
    ["work.html", "Work", "work"],
    ["services.html", "Services", "services"],
    ["about.html", "About", "about"],
    ["insights.html", "Insights", "insights"],
  ];

  /* ---------- header ---------- */
  const headerHost = document.getElementById("site-header");
  if (headerHost) {
    headerHost.outerHTML = `
<header class="site-header" id="siteHeader">
  <a class="logo" href="index.html" aria-label="FarReach home">
    <span class="full">FarReach<i>.</i></span><span class="compact">FR<i>.</i></span>
  </a>
  <button class="burger" id="burger" aria-expanded="false" aria-controls="navArea"><span>menu</span><span>close</span></button>
  <div class="nav-area" id="navArea">
    <nav class="main-nav" id="mainNav" aria-label="Main">
      ${NAV.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}><span>${t}</span></a>`).join("")}
      <a href="contact.html" class="pill"><span>Get Started</span></a>
      <button class="menu-label" id="menuLabel" aria-expanded="false">Menu</button>
    </nav>
    <button class="theme-btn" id="themeBtn" aria-label="Toggle dark mode" aria-pressed="false">
      <span class="toggle"><svg class="moon" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.8 2.2A8 8 0 1 0 17.8 13 6.6 6.6 0 0 1 12.8 2.2Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg><span class="knob"></span></span>
    </button>
    <button class="sound-btn" id="soundBtn" aria-label="Toggle ambient sound" aria-pressed="false"><i></i><i></i><i></i><i></i><i></i></button>
  </div>
</header>
<div class="cursor" id="cursor" aria-hidden="true"><div class="cursor-dot"><span></span></div></div>
<button class="a11y-btn" id="a11yBtn" aria-label="Toggle larger text" aria-pressed="false">
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2.1" fill="currentColor"/><path d="M4 7.2 12 8.6 20 7.2 20.4 9.2 14.4 10.4 14.4 14 16.6 21.4 14.6 22 12 14.9 9.4 22 7.4 21.4 9.6 14 9.6 10.4 3.6 9.2Z" fill="currentColor"/></svg>
</button>`;
  }
  const header = document.getElementById("siteHeader");
  FR.header = header;

  /* ---------- footer ---------- */
  const VERBS = ["imagine", "explore", "plan", "shape", "craft", "design", "build", "launch", "grow"];
  const FOOT_MEDIA = ["v:turbine", "city", "highfive", "vr-man", "pipette", "cells", "talk", "woman-grey", "lab"];
  const footHost = document.getElementById("site-footer");
  if (footHost) {
    const year = new Date().getFullYear();
    footHost.outerHTML = `
<footer class="site-footer" id="siteFooter">
  <a class="foot-cta wrap" href="contact.html" data-cursor="let's chat" data-cursor-dark aria-label="Let's talk — contact us">
    <span class="t-display foot-line">
      <span class="w">Let’s</span><span class="slot" id="slotFoot"></span><span class="cycle" id="footVerb">${VERBS[0]}</span>
      <i class="br" style="flex-basis:100%;height:0"></i>
      <span class="w white">what’s next,</span> <span class="w white">together.</span>
    </span>
  </a>
  <div class="wrap">
    <div class="news">
      <form id="newsForm" novalidate>
        <label class="sr-only" for="newsEmail">Email address</label>
        <input id="newsEmail" type="email" autocomplete="email">
        <span class="ph" aria-hidden="true">Send good ideas to my inbox</span>
        <button type="submit" aria-label="Subscribe"><span class="arrow" style="width:1.1rem">${ARROW}${ARROW}</span></button>
        <span class="msg" aria-live="polite">Thanks! You're on the list.</span>
      </form>
    </div>
    <div class="foot-bar">
      <p>©${year} FarReach Studio. All Rights Reserved | <a href="contact.html">Open Roles</a> | <a href="privacy.html">Privacy Policy</a></p>
      <div class="socials">
        <a href="#" aria-label="Instagram"><span>Instagram</span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor"/></svg></a>
        <a href="#" aria-label="LinkedIn"><span>LinkedIn</span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 10v7M7 7v.01M11 17v-7M11 13.2c0-2 1.3-3.2 2.9-3.2S16.8 11 16.8 13v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></a>
      </div>
    </div>
  </div>
</footer>`;
    const fly = document.createElement("div");
    fly.className = "fly fly-foot";
    fly.id = "flyFoot";
    fly.setAttribute("aria-hidden", "true");
    fly.innerHTML = FOOT_MEDIA.map((m, i) =>
      m.startsWith("v:")
        ? `<video muted playsinline loop preload="none" poster="assets/video/${m.slice(2)}.jpg" data-src="assets/video/${m.slice(2)}.mp4" class="${i ? "" : "on"}"></video>`
        : `<img src="assets/img/${m}.jpg" alt="" loading="lazy" class="${i ? "" : "on"}">`
    ).join("");
    document.body.appendChild(fly);
  }

  /* ---------- arrows in links ---------- */
  document.querySelectorAll(".arrow:empty").forEach((a) => (a.innerHTML = ARROW + ARROW));

  /* ---------- letter-by-letter word swap ---------- */
  function splitWord(text, cls) {
    const w = document.createElement("span");
    w.className = "word";
    [...text].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ch" + (cls ? " " + cls : "");
      s.textContent = c === " " ? " " : c;
      w.appendChild(s);
    });
    return w;
  }
  FR.initCycle = (el) => {
    const t = el.textContent;
    el.textContent = "";
    el.appendChild(splitWord(t));
    el.setAttribute("aria-label", t);
  };
  FR.swapWord = (el, text) => {
    if (!el.querySelector(".word")) FR.initCycle(el);
    el.setAttribute("aria-label", text);
    const old = el.querySelector(".word:not(.leaving)");
    if (reduce) { el.textContent = ""; el.appendChild(splitWord(text)); return; }
    if (old) {
      old.classList.add("leaving");
      [...old.children].forEach((c, i) => setTimeout(() => c.classList.add("out"), i * 22));
      setTimeout(() => old.remove(), 900 + old.children.length * 22);
    }
    const nw = splitWord(text, "in");
    el.appendChild(nw);
    void nw.offsetWidth;
    [...nw.children].forEach((c, i) => setTimeout(() => c.classList.remove("in"), 120 + i * 28));
  };

  /* ---------- lazy video sources ---------- */
  FR.ensureSrc = (v) => {
    if (v && v.tagName === "VIDEO" && !v.getAttribute("src") && v.dataset.src) { v.src = v.dataset.src; v.load(); }
  };
  FR.play = (v) => { if (v && v.tagName === "VIDEO") { FR.ensureSrc(v); const p = v.play(); if (p) p.catch(() => {}); } };

  /* ---------- media stack cycler (slots & fly boxes) ---------- */
  FR.showIndex = (box, idx) => {
    const items = [...box.querySelectorAll(":scope > video, :scope > img")];
    items.forEach((m, i) => {
      if (i === idx) { m.classList.add("on"); FR.play(m); }
      else { m.classList.remove("on"); if (m.tagName === "VIDEO") setTimeout(() => { if (!m.classList.contains("on")) m.pause(); }, 950); }
    });
    // warm up the next video
    const nxt = items[(idx + 1) % items.length];
    if (nxt && nxt.tagName === "VIDEO") FR.ensureSrc(nxt);
  };
  document.querySelectorAll(".slot.cyc").forEach((slot) => {
    const n = slot.querySelectorAll(":scope > video, :scope > img").length;
    let i = 0;
    const every = +slot.dataset.every || 2500;
    if (n > 1 && !reduce) setInterval(() => { if (!document.hidden) FR.showIndex(slot, (i = (i + 1) % n)); }, every);
  });

  /* ---------- place a fly box in document coordinates ---------- */
  FR.placeFly = (el, r) => {
    el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
    el.style.width = r.w + "px";
    el.style.height = r.h + "px";
  };
  FR.docRect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  };
  FR.mix = (a, b, t) => ({ x: FR.lerp(a.x, b.x, t), y: FR.lerp(a.y, b.y, t), w: FR.lerp(a.w, b.w, t), h: FR.lerp(a.h, b.h, t) });

  /* ---------- header state ---------- */
  FR.heroActive = () => false; // pages with a full-bleed hero override this
  const footer = document.getElementById("siteFooter");
  const flyFoot = document.getElementById("flyFoot");
  const slotFoot = document.getElementById("slotFoot");
  const footVerb = document.getElementById("footVerb");
  if (footVerb) FR.initCycle(footVerb);

  function onScroll() {
    const y = window.scrollY, vh = window.innerHeight;
    if (header) {
      header.classList.toggle("on-hero", FR.heroActive());
      header.classList.toggle("compact", y > vh * 0.72 || document.body.dataset.compact === "always");
    }
    if (footer) {
      const ft = footer.getBoundingClientRect().top;
      document.body.classList.toggle("is-yellow", ft < vh * 0.5);
      if (flyFoot && slotFoot) {
        const p = FR.clamp((vh - ft) / (vh * 0.78));
        const vw = doc.clientWidth;
        const pad = parseFloat(getComputedStyle(document.querySelector(".wrap") || doc).paddingLeft) || 0;
        const w0 = FR.isMobile() ? vw - pad * 2 : vw * 0.725;
        const start = { x: pad, y: FR.docRect(footer).y, w: w0, h: w0 * 0.5625 };
        const end = FR.docRect(slotFoot);
        FR.placeFly(flyFoot, FR.mix(start, end, FR.easeIO(p)));
        if (p > 0 && !flyFoot.dataset.live) { flyFoot.dataset.live = 1; FR.play(flyFoot.querySelector("video")); }
      }
    }
    if (FR.onScroll) FR.onScroll(y, vh);
  }
  FR.update = onScroll;
  let ticking = false;
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);

  /* footer verb + media cycling */
  if (footVerb && flyFoot) {
    let k = 0;
    if (!reduce) setInterval(() => {
      if (document.hidden) return;
      const r = footer.getBoundingClientRect();
      if (r.top > window.innerHeight) return;
      k = (k + 1) % VERBS.length;
      FR.swapWord(footVerb, VERBS[k]);
      FR.showIndex(flyFoot, k);
    }, 2600);
  }

  /* ---------- desktop collapsed menu (hover / click) ---------- */
  const mainNav = document.getElementById("mainNav");
  const navArea = document.getElementById("navArea");
  const menuLabel = document.getElementById("menuLabel");
  if (mainNav) {
    let closeT;
    const open = (v) => { mainNav.classList.toggle("open", v); menuLabel.setAttribute("aria-expanded", v); };
    navArea.addEventListener("mouseenter", () => { clearTimeout(closeT); if (header.classList.contains("compact")) open(true); });
    navArea.addEventListener("mouseleave", () => { closeT = setTimeout(() => open(false), 250); });
    menuLabel.addEventListener("click", () => open(!mainNav.classList.contains("open")));
    mainNav.addEventListener("focusin", () => open(true));
    mainNav.addEventListener("focusout", (e) => { if (!mainNav.contains(e.relatedTarget)) open(false); });
  }
  /* mobile burger */
  const burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const v = !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open", v);
      burger.setAttribute("aria-expanded", v);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) burger.click(); });
  }

  /* ---------- theme + a11y toggles ---------- */
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.setAttribute("aria-pressed", doc.classList.contains("dark"));
    themeBtn.addEventListener("click", () => {
      const d = doc.classList.toggle("dark");
      themeBtn.setAttribute("aria-pressed", d);
      store.set("fr-theme", d ? "dark" : "light");
      blip(d ? 660 : 440);
    });
  }
  const a11yBtn = document.getElementById("a11yBtn");
  if (a11yBtn) {
    a11yBtn.setAttribute("aria-pressed", doc.classList.contains("big-text"));
    a11yBtn.addEventListener("click", () => {
      const b = doc.classList.toggle("big-text");
      a11yBtn.setAttribute("aria-pressed", b);
      store.set("fr-bigtext", b ? "1" : "0");
      onScroll();
    });
  }

  /* ---------- ambient sound (generated with Web Audio, no files) ---------- */
  let actx = null, master = null, soundOn = false;
  function startPad() {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    master = actx.createGain(); master.gain.value = 0; master.connect(actx.destination);
    const filter = actx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 900; filter.connect(master);
    [130.81, 196.0, 246.94, 329.63].forEach((f, i) => {
      const o = actx.createOscillator(); o.type = i % 2 ? "sine" : "triangle"; o.frequency.value = f;
      const lfo = actx.createOscillator(); lfo.frequency.value = 0.07 + i * 0.03;
      const lg = actx.createGain(); lg.gain.value = 1.6; lfo.connect(lg); lg.connect(o.detune);
      const g = actx.createGain(); g.gain.value = 0.05; o.connect(g); g.connect(filter); o.start(); lfo.start();
    });
    master.gain.linearRampToValueAtTime(0.5, actx.currentTime + 2);
  }
  function blip(freq) {
    if (!soundOn || !actx) return;
    const o = actx.createOscillator(), g = actx.createGain();
    o.frequency.value = freq || 880; o.type = "sine";
    g.gain.setValueAtTime(0.06, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.18);
    o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.2);
  }
  const soundBtn = document.getElementById("soundBtn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundOn = !soundOn;
      soundBtn.classList.toggle("on", soundOn);
      soundBtn.setAttribute("aria-pressed", soundOn);
      try {
        if (soundOn) { if (!master) startPad(); else { actx.resume(); master.gain.linearRampToValueAtTime(0.5, actx.currentTime + 1); } }
        else if (master) master.gain.linearRampToValueAtTime(0, actx.currentTime + 0.6);
      } catch (e) {}
    });
    document.addEventListener("mouseover", (e) => { if (soundOn && e.target.closest && e.target.closest("a, button")) blip(1200); });
  }

  /* ---------- custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover)").matches) {
    const dot = cursor.querySelector(".cursor-dot"), lab = dot.querySelector("span");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.add("hide"));
    document.addEventListener("mouseenter", () => cursor.classList.remove("hide"));
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest ? e.target.closest("[data-cursor]") : null;
      if (t) { lab.textContent = t.dataset.cursor; cursor.classList.add("label"); cursor.classList.toggle("dark", t.hasAttribute("data-cursor-dark")); }
      else cursor.classList.remove("label", "dark");
    });
    (function loop() {
      cx += (mx - cx) * (reduce ? 1 : 0.18); cy += (my - cy) * (reduce ? 1 : 0.18);
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- newsletter (front-end only) ---------- */
  const form = document.getElementById("newsForm");
  if (form) {
    const inp = form.querySelector("input");
    const upd = () => form.classList.toggle("typing", inp.value.length > 0 || document.activeElement === inp);
    inp.addEventListener("input", upd); inp.addEventListener("focus", upd); inp.addEventListener("blur", upd);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) { inp.focus(); form.animate([{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }], { duration: 300 }); return; }
      form.classList.add("sent");
      setTimeout(() => { form.classList.remove("sent"); inp.value = ""; upd(); }, 3500);
    });
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  FR.observe = (el) => io.observe(el);
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));

  /* pause off-screen videos inside slots */
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && v.classList.contains("on")) FR.play(v); else if (!e.isIntersecting) v.pause();
  }));
  document.querySelectorAll(".slot video, .card video").forEach((v) => vio.observe(v));
  FR.watchVideo = (v) => vio.observe(v);

  onScroll();
})();
