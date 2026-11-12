/* FarReach — home page behaviour */
(function () {
  "use strict";
  const FR = window.FR, D = window.FR_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const doc = document.documentElement;
  const body = document.body;

  /* =============== HERO: intro + cycling words + flying video =============== */
  const HERO = D.heroPairs;
  const hero = $(".hero");
  const fly = $("#flyHero");
  const slot = $("#slotHero");
  const caseLink = $("[data-case]");
  const cycA = $('[data-cycle="a"]'), cycB = $('[data-cycle="b"]');
  FR.initCycle(cycA); FR.initCycle(cycB);
  caseLink.innerHTML = '<span class="case-name"></span><span class="arrow">' + FR.ARROW + FR.ARROW + "</span>";
  const setCase = (id) => {
    const c = id && FR.caseById(id);
    caseLink.classList.toggle("off", !c);
    if (c) { caseLink.querySelector(".case-name").textContent = c.client; caseLink.href = "case.html?c=" + c.id; }
  };
  setCase(null);

  let introE = FR.reduce ? 1 : 0; // 0 = small centred box, 1 = full screen
  if (!FR.reduce) {
    fly.classList.add("pre");
    setTimeout(() => fly.classList.remove("pre"), 250);
    setTimeout(() => {
      const s = performance.now();
      (function step(now) {
        introE = FR.easeIO(FR.clamp((now - s) / 1200));
        layout();
        if (introE < 1) requestAnimationFrame(step);
      })(s);
    }, 1050);
    setTimeout(() => body.classList.remove("intro"), 2150);
  } else body.classList.remove("intro");

  FR.play(fly.querySelector("video"));
  let hi = 0;
  setInterval(() => {
    if (document.hidden || body.classList.contains("intro")) return;
    const r = fly.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    hi = (hi + 1) % HERO.length;
    FR.swapWord(cycA, HERO[hi].a);
    setTimeout(() => FR.swapWord(cycB, HERO[hi].b), 140);
    setCase(HERO[hi].c);
    FR.showIndex(fly, hi);
  }, 4600);

  function layout() {
    const vw = doc.clientWidth, vh = innerHeight, y = scrollY;
    const full = { x: 0, y: y, w: vw, h: vh };
    const bw = FR.isMobile() ? vw * 0.62 : 27 * parseFloat(getComputedStyle(doc).fontSize);
    const bh = FR.isMobile() ? bw * 1.25 : bw * 0.625;
    const small = { x: (vw - bw) / 2, y: y + (vh - bh) / 2, w: bw, h: bh };
    const start = FR.mix(small, full, introE);
    const p = FR.clamp(y / (vh * 0.78));
    FR.placeFly(fly, FR.mix(start, FR.docRect(slot), FR.easeIO(p)));
    fly.classList.toggle("small", p > 0.04);
    hero.classList.toggle("scrolled", y > 12);
  }
  FR.heroActive = () => scrollY < innerHeight * 0.06;
  FR.addScroll(layout);

  /* =============== sections =============== */
  FR.logoTrack($("#logoTrack"), FR.LOGOS);
  FR.slider({ shapeBox: $("#svcShape"), slides: [...document.querySelectorAll(".svc")], counter: $("#svcCounter"), shapes: FR.SHAPES });
  FR.rail($(".rail-wrap"), $("#rail"), D.cases.filter((c) => c.id !== "atlas"));
  FR.bigMarquee($(".big-marquee"), `Making waves since ${D.brand.since}`);
  FR.stats($("#statRow"), D.stats);

  document.fonts && document.fonts.ready.then(() => FR.update());
  FR.update();
})();
