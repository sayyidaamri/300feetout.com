/* FarReach — reusable UI components (used by home and inner pages) */
(function () {
  "use strict";
  const FR = window.FR, D = window.FR_DATA;
  const doc = document.documentElement;
  const hooks = [];
  FR.addScroll = (fn) => { hooks.push(fn); fn(); };
  const prev = FR.onScroll;
  FR.onScroll = (y, vh) => { if (prev) prev(y, vh); hooks.forEach((f) => f(y, vh)); };
  window.addEventListener("resize", () => hooks.forEach((f) => f()));
  FR.caseById = (id) => D.cases.find((c) => c.id === id);

  /* ---------- fictional client logos ---------- */
  FR.LOGOS = [
    `<svg viewBox="0 0 257 110"><path d="M118 18v34M139 18v34M118 35h21" stroke="currentColor" stroke-width="3" fill="none"/><text x="128.5" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="21" letter-spacing="5" fill="currentColor">HALDEN</text><text x="128.5" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="9" letter-spacing="4" fill="currentColor">HOTELS &amp; RESORTS</text></svg>`,
    `<svg viewBox="0 0 257 110"><text x="128.5" y="70" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-style="italic" font-size="44" letter-spacing="-2" fill="currentColor">NOVAPAY</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M128.5 14 146 46h-9l12 20h-41l12-20h-9z" fill="currentColor"/><rect x="126" y="66" width="5" height="10" fill="currentColor"/><text x="128.5" y="98" text-anchor="middle" font-family="Georgia,serif" font-size="19" letter-spacing="1.5" fill="currentColor">Cedar &amp; Pine</text></svg>`,
    `<svg viewBox="0 0 257 110"><text x="128.5" y="72" text-anchor="middle" font-family="Impact,Arial Narrow,sans-serif" font-size="52" letter-spacing="1" fill="currentColor">STREAMR</text></svg>`,
    `<svg viewBox="0 0 257 110"><text x="128.5" y="52" text-anchor="middle" font-family="Georgia,serif" font-size="22" letter-spacing="7" fill="currentColor">PALMERA</text><text x="128.5" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="15" letter-spacing="6" fill="currentColor">SPRINGS</text></svg>`,
    `<svg viewBox="0 0 257 110"><rect x="62" y="20" width="133" height="70" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="92" cy="55" r="20" fill="currentColor"/><text x="120" y="47" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="2" fill="currentColor">THE</text><text x="120" y="61" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="2" fill="currentColor">WEXFORD</text><text x="120" y="75" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="2" fill="currentColor">MUSEUM</text></svg>`,
    `<svg viewBox="0 0 257 110"><circle cx="68" cy="55" r="14" fill="none" stroke="currentColor" stroke-width="5"/><text x="90" y="68" font-family="Trebuchet MS,Arial,sans-serif" font-weight="700" font-size="36" fill="currentColor">lumen</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M40 62 70 40 100 62 85 62 70 51 55 62z" fill="currentColor"/><text x="110" y="66" font-family="Arial,sans-serif" font-weight="700" font-size="28" letter-spacing="3" fill="currentColor">KESTREL</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M128.5 12 150 20v18c0 13-9 22-21.5 27C116 60 107 51 107 38V20z" fill="none" stroke="currentColor" stroke-width="3"/><text x="128.5" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="currentColor">M</text><text x="128.5" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="18" letter-spacing="2" fill="currentColor">Marlow College</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M78 70a50 50 0 0 1 101 0" fill="none" stroke="currentColor" stroke-width="3"/><text x="128.5" y="68" text-anchor="middle" font-family="Arial,sans-serif" font-weight="300" font-size="22" letter-spacing="6" fill="currentColor">ATLAS</text><text x="128.5" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="12" letter-spacing="8" fill="currentColor">BALLET</text></svg>`,
  ];
  FR.BADGES = [
    `<svg viewBox="0 0 257 110"><circle cx="60" cy="55" r="32" fill="none" stroke="currentColor" stroke-width="3"/><path d="M45 56l10 10 20-22" fill="none" stroke="currentColor" stroke-width="4"/><text x="104" y="52" font-family="Arial,sans-serif" font-weight="700" font-size="18" fill="currentColor">WOMEN-LED</text><text x="104" y="72" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="currentColor">CERTIFIED</text></svg>`,
    `<svg viewBox="0 0 257 110"><text x="128.5" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="700" fill="currentColor">SBC</text><text x="128.5" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="3" fill="currentColor">SMALL BUSINESS COUNCIL</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M40 75 70 30 100 75z" fill="currentColor"/><text x="112" y="52" font-family="Arial,sans-serif" font-weight="700" font-size="17" letter-spacing="1" fill="currentColor">DESIGN GUILD</text><text x="112" y="72" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="currentColor">MEMBER STUDIO</text></svg>`,
    `<svg viewBox="0 0 257 110"><path d="M60 80c-20-20-10-50 25-52-2 34-25 40-25 52z" fill="currentColor"/><text x="100" y="60" font-family="Trebuchet MS,Arial,sans-serif" font-weight="700" font-size="22" fill="currentColor">green web</text><text x="100" y="78" font-family="Arial,sans-serif" font-size="11" letter-spacing="3" fill="currentColor">PLEDGE 2025</text></svg>`,
    `<svg viewBox="0 0 257 110"><text x="128.5" y="62" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="30" letter-spacing="-1" fill="currentColor">/\\MA&gt;</text><text x="128.5" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="2.5" fill="currentColor">MARKETERS ALLIANCE</text></svg>`,
    `<svg viewBox="0 0 257 110"><rect x="48" y="30" width="50" height="50" rx="10" fill="currentColor"/><text x="73" y="63" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="#fff">A+</text><text x="110" y="52" font-family="Arial,sans-serif" font-weight="700" font-size="16" fill="currentColor">ACCESSIBLE</text><text x="110" y="70" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="currentColor">WEB PARTNER</text></svg>`,
  ];
  FR.logoTrack = (el, list) => {
    const one = list.map((s) => `<div class="logo-item">${s}</div>`).join("");
    el.innerHTML = one + one;
    [...el.children].forEach((d, i) => { if (i >= list.length) d.setAttribute("aria-hidden", "true"); });
  };

  /* ---------- yellow shapes ---------- */
  const C = 224;
  const petals = (n, rx, ry, d) => Array.from({ length: n }, (_, i) => `<ellipse cx="${C}" cy="${C - d}" rx="${rx}" ry="${ry}" transform="rotate(${(360 / n) * i} ${C} ${C})"/>`).join("");
  const rays = (n, w, l, r0) => Array.from({ length: n }, (_, i) => `<rect x="${C - w / 2}" y="${C - r0 - l}" width="${w}" height="${l}" rx="${w / 2}" transform="rotate(${(360 / n) * i} ${C} ${C})"/>`).join("");
  FR.SHAPES = [
    `<svg viewBox="0 0 448 448"><circle cx="224" cy="118" r="106"/><circle cx="224" cy="330" r="106"/><circle cx="118" cy="224" r="106"/><circle cx="330" cy="224" r="106"/><circle cx="224" cy="224" r="80"/></svg>`,
    `<svg viewBox="0 0 448 448"><circle cx="224" cy="224" r="96"/>${rays(12, 30, 72, 122)}</svg>`,
    `<svg viewBox="0 0 448 448">${petals(6, 62, 112, 104)}<circle cx="224" cy="224" r="56"/></svg>`,
    `<svg viewBox="0 0 448 448"><path d="M24 224a200 200 0 0 1 400 0z"/><path d="M84 330a140 140 0 0 1 280 0z"/><path d="M144 424a80 80 0 0 1 160 0z"/></svg>`,
    `<svg viewBox="0 0 448 448"><path d="M224 24c40 80 120 160 200 200-80 40-160 120-200 200-40-80-120-160-200-200 80-40 160-120 200-200z"/></svg>`,
    `<svg viewBox="0 0 448 448"><path d="M224 40a184 184 0 1 1 0 368 92 92 0 0 1 0-184 92 92 0 0 0 0-184z"/><circle cx="224" cy="132" r="40"/></svg>`,
  ];
  FR.STAR = `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M44 0h12v35.5L81.1 10.4l8.5 8.5L64.5 44H100v12H64.5l25.1 25.1-8.5 8.5L56 64.5V100H44V64.5L18.9 89.6l-8.5-8.5L35.5 56H0V44h35.5L10.4 18.9l8.5-8.5L44 35.5z"/></svg>`;

  /* ---------- shape + text slider with 01|0N counter ---------- */
  FR.slider = ({ shapeBox, slides, counter, shapes, every = 5500 }) => {
    let si = 0;
    const cur = counter.querySelector(".prev .num");
    counter.querySelector(".next .num").textContent = String(slides.length).padStart(2, "0");
    if (shapeBox) shapeBox.innerHTML = shapes[0];
    function go(n) {
      n = (n + slides.length) % slides.length;
      if (n === si) return;
      slides[si].classList.remove("on");
      slides[n].classList.add("on");
      if (shapeBox) {
        const old = shapeBox.querySelector("svg:not(.out)");
        if (old) { old.classList.add("out"); setTimeout(() => old.remove(), 1100); }
        shapeBox.insertAdjacentHTML("beforeend", shapes[n % shapes.length]);
        const nw = shapeBox.lastElementChild;
        nw.classList.add("pre"); void nw.getBoundingClientRect(); nw.classList.remove("pre");
      }
      cur.textContent = String(n + 1).padStart(2, "0");
      cur.classList.remove("roll"); void cur.offsetWidth; cur.classList.add("roll");
      si = n;
    }
    let t;
    const reset = () => { clearInterval(t); if (!FR.reduce && every) t = setInterval(() => { const r = counter.getBoundingClientRect(); if (!document.hidden && r.top < innerHeight && r.bottom > 0) go(si + 1); }, every); };
    counter.querySelector(".prev").addEventListener("click", () => { go(si - 1); reset(); });
    counter.querySelector(".next").addEventListener("click", () => { go(si + 1); reset(); });
    const area = (shapeBox || counter).parentElement;
    let sx = null;
    area.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    area.addEventListener("touchend", (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(si + (dx < 0 ? 1 : -1)); reset(); } sx = null; });
    reset();
    return { go, get index() { return si; } };
  };
  FR.counterHTML = (id) => `<div class="counter" id="${id}"><button class="half prev" aria-label="Previous"><span class="num cur">01</span><span class="ar">&larr;</span></button><button class="half next" aria-label="Next"><span class="num">04</span><span class="ar">&rarr;</span></button></div>`;

  /* ---------- case cards ---------- */
  FR.cardHTML = (c, cls = "") => `
    <a class="card ${cls}" href="case.html?c=${c.id}" data-cursor="view case" draggable="false">
      <div class="media"><video muted playsinline loop preload="none" class="on" poster="assets/video/${c.video}.jpg" data-src="assets/video/${c.video}.mp4"></video></div>
      <span class="tag">case study</span>
      <div class="info">
        <p class="client">${c.client}</p>
        <h3>${c.title}</h3>
        <div class="chips">${c.services.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </a>`;

  /* ---------- horizontal rail: scroll-linked on desktop + drag ---------- */
  FR.rail = (railWrap, rail, cases) => {
    rail.innerHTML = cases.map((c) => FR.cardHTML(c)).join("");
    rail.querySelectorAll("video").forEach((v) => FR.watchVideo(v));
    let drag = 0, dragging = false, x0 = 0, moved = 0;
    function lay() {
      if (FR.isMobile()) { rail.style.transform = ""; return; }
      const r = railWrap.getBoundingClientRect();
      const vh = innerHeight, vw = doc.clientWidth;
      const max = Math.max(0, rail.scrollWidth - vw + parseFloat(getComputedStyle(railWrap).paddingLeft) * 2);
      const q = FR.clamp((vh - r.top) / (vh + r.height));
      drag = FR.clamp(drag, -max, max);
      rail.style.transform = `translate3d(${FR.clamp(-q * max * 0.85 + drag, -max, 0)}px,0,0)`;
    }
    railWrap.addEventListener("pointerdown", (e) => { if (FR.isMobile() || e.pointerType === "touch") return; dragging = true; moved = 0; x0 = e.clientX; railWrap.classList.add("drag"); });
    window.addEventListener("pointermove", (e) => { if (!dragging) return; const d = e.clientX - x0; x0 = e.clientX; drag += d; moved += Math.abs(d); lay(); });
    window.addEventListener("pointerup", () => { dragging = false; railWrap.classList.remove("drag"); });
    rail.addEventListener("click", (e) => { if (moved > 6) { e.preventDefault(); moved = 0; } }, true);
    FR.addScroll(lay);
  };

  /* ---------- giant scroll-linked marquee ---------- */
  FR.bigMarquee = (section, text) => {
    const track = section.querySelector(".bm-track");
    track.innerHTML = Array.from({ length: 4 }, (_, i) => `<div class="bm-item"${i ? ' aria-hidden="true"' : ""}>${text}${FR.STAR}</div>`).join("");
    FR.addScroll(() => {
      const r = section.getBoundingClientRect();
      const w = track.firstElementChild.offsetWidth || 1;
      const t = (innerHeight - r.top) * 0.9;
      const x = -((t % w) + w) % w;
      track.style.transform = `translate3d(${x - w * 0.15}px,0,0)`;
    });
  };

  /* ---------- rolling-digit stat columns ---------- */
  FR.stats = (row, list, { cycle = true, cols = 3 } = {}) => {
    row.innerHTML = Array.from({ length: cols }, (_, i) => `
      <div class="stat rv rv-d${i + 1}">
        <div class="num" aria-hidden="true"></div>
        <p class="label"></p>
        <a class="t-link arrow-link" href="#"><span class="nm"></span><span class="arrow">${FR.ARROW + FR.ARROW}</span></a>
        <span class="sr-only" aria-live="polite"></span>
      </div>`).join("");
    const colsEl = [...row.children];
    colsEl.forEach((c) => FR.observe(c));
    function set(col, s, animate) {
      const num = col.querySelector(".num");
      const chars = [...s[0]];
      while (num.children.length < chars.length) { const d = document.createElement("span"); d.className = "d"; d.innerHTML = "<b></b>"; num.appendChild(d); }
      while (num.children.length > chars.length) num.lastElementChild.remove();
      chars.forEach((ch, i) => {
        const d = num.children[i];
        const cur = d.querySelector("b:not(.leave)");
        if (cur.textContent === ch) return;
        if (!animate || !cur.textContent) { cur.textContent = ch; return; }
        cur.classList.add("leave");
        setTimeout(() => cur.remove(), 950);
        const nb = document.createElement("b"); nb.className = "enter"; nb.textContent = ch; d.appendChild(nb);
        void nb.offsetWidth;
        setTimeout(() => nb.classList.remove("enter"), i * 70);
      });
      const label = col.querySelector(".label"), link = col.querySelector("a");
      const apply = () => { label.textContent = s[1]; link.querySelector(".nm").textContent = s[2]; link.href = "case.html?c=" + s[3]; label.classList.remove("fade"); link.classList.remove("fade"); };
      col.querySelector(".sr-only").textContent = `${s[0]} ${s[1]} — ${s[2]}`;
      if (animate) { label.classList.add("fade"); link.classList.add("fade"); setTimeout(apply, 450); } else apply();
    }
    const idx = colsEl.map((_, i) => i);
    colsEl.forEach((c, i) => set(c, list[idx[i]], false));
    if (cycle && !FR.reduce && list.length > cols) setInterval(() => {
      const r = row.getBoundingClientRect();
      if (document.hidden || r.top > innerHeight || r.bottom < 0) return;
      colsEl.forEach((c, i) => setTimeout(() => { idx[i] = (idx[i] + cols) % list.length; set(c, list[idx[i]], true); }, i * 380));
    }, 5000);
  };

  /* ---------- accordion (FAQ) ---------- */
  FR.accordion = (el, items, numbered) => {
    el.innerHTML = items.map(([q, a], i) => `
      <div class="acc-item">
        <button class="acc-q" aria-expanded="false" id="accq${i}" aria-controls="acca${i}" data-cursor="open">
          ${numbered ? `<span class="acc-n">${String(i + 1).padStart(2, "0")}</span>` : ""}<span class="acc-t">${q}</span>
          <svg class="acc-ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M14 2 3.5 12.5M3 4.5V13h8.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
        </button>
        <div class="acc-a" id="acca${i}" role="region" aria-labelledby="accq${i}"><div><p>${a}</p></div></div>
      </div>`).join("");
    el.querySelectorAll(".acc-q").forEach((b) => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") !== "true";
      el.querySelectorAll(".acc-q").forEach((o) => { o.setAttribute("aria-expanded", "false"); o.parentElement.classList.remove("open"); });
      b.setAttribute("aria-expanded", open); b.parentElement.classList.toggle("open", open);
    }));
  };

  /* ---------- typewriter word cycling (inner page heroes) ---------- */
  FR.typewriter = (el, words, { hold = 2200, speed = 70 } = {}) => {
    let wi = 0;
    el.textContent = words[0];
    el.setAttribute("aria-label", words[0]);
    if (FR.reduce || words.length < 2) return;
    const caret = document.createElement("span"); caret.className = "caret"; el.after(caret);
    const del = () => {
      const t = el.textContent;
      if (t.length) { el.textContent = t.slice(0, -1); setTimeout(del, speed * 0.6); }
      else { wi = (wi + 1) % words.length; el.setAttribute("aria-label", words[wi]); setTimeout(type, 250); }
    };
    const type = () => {
      const w = words[wi], t = el.textContent;
      if (t.length < w.length) { el.textContent = w.slice(0, t.length + 1); setTimeout(type, speed); }
      else setTimeout(del, hold);
    };
    setTimeout(del, hold + 1200);
  };

  /* ---------- floating hover preview for lists ---------- */
  FR.hoverPreview = (list, selector, srcOf) => {
    const pv = document.createElement("div");
    pv.className = "hover-preview"; pv.setAttribute("aria-hidden", "true");
    pv.innerHTML = "<img alt=''>";
    document.body.appendChild(pv);
    const img = pv.firstChild;
    let x = 0, y = 0, cx = 0, cy = 0, on = false;
    list.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    list.querySelectorAll(selector).forEach((row) => {
      row.addEventListener("mouseenter", () => { const s = srcOf(row); if (!s) return; img.src = s; on = true; pv.classList.add("on"); });
      row.addEventListener("mouseleave", () => { on = false; pv.classList.remove("on"); });
    });
    (function loop() { cx += (x - cx) * 0.12; cy += (y - cy) * 0.12; if (on || pv.classList.contains("on")) pv.style.transform = `translate3d(${cx + 30}px, ${cy - 90}px, 0) rotate(${FR.clamp((x - cx) * 0.05, -8, 8)}deg)`; requestAnimationFrame(loop); })();
  };
})();
