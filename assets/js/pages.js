/* FarReach — inner page behaviour (work, services, about, insights, contact, case) */
(function () {
  "use strict";
  const FR = window.FR, D = window.FR_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = (document.body.className.match(/page-(\w+)/) || [])[1];
  const ARROW_DL = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M14 2 3.5 12.5M3 4.5V13h8.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';
  const img = (n) => `assets/img/${n}.jpg`;

  /* ---------- page hero ---------- */
  const ph = $(".phero");
  if (ph) {
    const media = ph.querySelector(".phero-media > *");
    FR.heroActive = () => scrollY < 40;
    FR.addScroll(() => {
      const y = scrollY;
      if (media && !FR.reduce) media.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.00012})`;
      ph.classList.toggle("scrolled", y > innerHeight * 0.32);
    });
    const tw = ph.querySelector("[data-type]");
    if (tw) FR.typewriter(tw, tw.dataset.type.split("|"));
    if (media && media.tagName === "VIDEO") FR.play(media);
  }
  $$("[data-marquee]").forEach((s) => FR.bigMarquee(s, s.dataset.marquee));
  $$("[data-logos]").forEach((t) => FR.logoTrack(t, t.dataset.logos === "badges" ? FR.BADGES : FR.LOGOS));
  $$("[data-faq]").forEach((a) => FR.accordion(a, D.faqs, a.dataset.faq === "numbered"));

  /* ================= WORK ================= */
  if (page === "work") {
    const grid = $("#grid");
    const order = ["palmera", "vantage", "helix", "oakridge", "bayview", "atlas"];
    const sizes = ["tall", "", "short", "tall", "", "short"];
    const cols = [[], []];
    order.forEach((id, i) => cols[i % 2].push(FR.cardHTML(FR.caseById(id), sizes[i])));
    grid.innerHTML = cols.map((c) => `<div class="col">${c.join("")}</div>`).join("");
    $$("video", grid).forEach((v) => FR.watchVideo(v));
    $$(".card", grid).forEach((c) => { const cs = FR.caseById(c.getAttribute("href").split("=")[1]); c.dataset.industry = cs.industry; c.dataset.services = cs.services.join("|"); });

    // dropdown filters
    const allCards = order.map((id) => grid.querySelector(`.card[href$="=${id}"]`));
    const state = { industry: "All", service: "All" };
    const industries = ["All", ...new Set(D.cases.map((c) => c.industry))];
    const services = ["All", ...new Set(D.cases.flatMap((c) => c.services))].slice(0, 10);
    const dd = (key, list) => `<div class="dd" data-key="${key}"><button aria-expanded="false">${key}<i>+</i></button><ul><div>${list.map((v) => `<li><button data-v="${v}" class="${v === "All" ? "on" : ""}">${v}</button></li>`).join("")}</div></ul></div>`;
    $("#filters").insertAdjacentHTML("beforeend", dd("industry", industries) + dd("service", services));
    $$(".dd").forEach((d) => {
      const b = d.querySelector(":scope > button");
      b.addEventListener("click", () => { const o = !d.classList.contains("open"); $$(".dd").forEach((x) => { x.classList.remove("open"); x.firstElementChild.setAttribute("aria-expanded", false); }); d.classList.toggle("open", o); b.setAttribute("aria-expanded", o); });
      d.querySelectorAll("li button").forEach((o) => o.addEventListener("click", () => {
        state[d.dataset.key] = o.dataset.v;
        d.querySelectorAll("li button").forEach((x) => x.classList.toggle("on", x === o));
        b.firstChild.textContent = o.dataset.v === "All" ? d.dataset.key : o.dataset.v;
        d.classList.remove("open");
        let n = 0;
        const colEls = $$(".col", grid);
        allCards.forEach((c) => {
          const ok = (state.industry === "All" || c.dataset.industry === state.industry) && (state.service === "All" || c.dataset.services.split("|").includes(state.service));
          c.classList.toggle("hide", !ok);
          colEls[ok ? n++ % 2 : 1].appendChild(c); // re-flow visible cards left/right
        });
        $("#empty").classList.toggle("on", n === 0);
        FR.update();
      }));
    });
    // past clients list
    const list = $("#clients");
    const pics = ["concert", "towers", "meeting", "city", "crowd", "desk", "talk", "highfive", "students", "lab", "coding", "turbines"];
    list.innerHTML = D.pastClients.map((n, i) => `<a class="row" href="contact.html" data-cursor="open" data-pic="${pics[i % pics.length]}"><span class="nm">${n}</span>${ARROW_DL}</a>`).join("");
    FR.hoverPreview(list, ".row", (r) => img(r.dataset.pic));
  }

  /* ================= SERVICES ================= */
  if (page === "services") {
    $$(".pillar .shape").forEach((s, i) => (s.innerHTML = FR.SHAPES[[2, 1, 5][i] ?? i]));
    FR.addScroll(() => $$(".pillar .shape svg").forEach((s, i) => {
      const r = s.getBoundingClientRect();
      s.style.transform = `rotate(${((r.top - innerHeight / 2) * 0.15 * (i % 2 ? -1 : 1)).toFixed(1)}deg)`;
    }));
    const rows = $$(".chip-row");
    const tags = ["Content Marketing", "SEO", "Video Marketing", "Campaign Strategy", "Social Media", "SEM", "Digital Advertising", "Web Development", "Web Design", "Branding", "Email Marketing", "Analytics", "UX Research", "Motion Design", "Copywriting"];
    rows.forEach((r, i) => { const t = i ? [...tags].reverse() : tags; r.innerHTML = [...t, ...t].map((x) => `<span>${x}</span>`).join(""); });
    FR.addScroll(() => rows.forEach((r, i) => {
      const b = r.parentElement.getBoundingClientRect();
      const t = (innerHeight - b.top) * 0.35;
      r.style.transform = `translate3d(${i ? -r.scrollWidth / 4 + t : -t}px,0,0)`;
    }));
    FR.stats($("#statRow"), [D.stats[0], D.stats[1], D.stats[2], D.stats[3], D.stats[4], D.stats[5]]);
  }

  /* ================= ABOUT ================= */
  if (page === "about") {
    const vs = $("#valSlides");
    vs.innerHTML = D.values.map((v, i) => `<article class="svc${i ? "" : " on"}"><h2 class="t-h2"><span>${v[0]}</span><br><span class="yellow">${v[1]}</span></h2><p class="t-body">${v[2]}</p></article>`).join("");
    FR.slider({ shapeBox: $("#valShape"), slides: $$(".svc", vs), counter: $("#valCounter"), shapes: FR.SHAPES });
    // team list + grid
    const tl = $("#teamList"), tg = $("#teamGrid");
    tl.innerHTML = D.team.map((t) => `<div class="row" data-pic="${t[2]}" data-cursor="hi!"><span class="nm">${t[0]}</span><span class="role">${t[1]}</span>${ARROW_DL}</div>`).join("");
    tg.innerHTML = D.team.map((t) => `<figure><img src="${img(t[2])}" alt="${t[0]}" loading="lazy"><figcaption>${t[0]}<span>${t[1]}</span></figcaption></figure>`).join("");
    FR.hoverPreview(tl, ".row", (r) => img(r.dataset.pic));
    const sw = $("#teamSwitch");
    sw.addEventListener("click", () => { const g = sw.getAttribute("aria-pressed") !== "true"; sw.setAttribute("aria-pressed", g); sw.querySelector(".lbl").textContent = g ? "grid view" : "list view"; $(".team").classList.toggle("grid-view", g); FR.update(); });
    // network map
    const cities = [["PDX", 330, 150, 1], ["SEA", 350, 70], ["SFO", 290, 300], ["LAX", 330, 380], ["DEN", 520, 260], ["AUS", 610, 420], ["CHI", 720, 200], ["NYC", 880, 170], ["HNL", 90, 450]];
    const lines = [];
    cities.forEach((a, i) => cities.forEach((b, j) => { if (j > i && (i === 0 || (i + j) % 3 === 0)) lines.push(`<path class="ln" d="M${a[1]} ${a[2]} Q ${(a[1] + b[1]) / 2} ${Math.min(a[2], b[2]) - 60} ${b[1]} ${b[2]}"/>`); }));
    $("#map").innerHTML = `<svg viewBox="0 0 960 520" role="img" aria-label="Map of cities where our team works">${lines.join("")}${cities.map((c) => `<g class="city${c[3] ? " home" : ""}"><circle cx="${c[1]}" cy="${c[2]}" r="28"/><text x="${c[1]}" y="${c[2] + 1}">${c[0]}</text></g>`).join("")}</svg>`;
    // photo carousel
    const photos = ["meeting", "highfive", "talk", "office-two", "students", "desk", "crowd", "coding", "woman-grey", "concert"];
    const track = $("#photoTrack"), wrap = $(".photos");
    track.innerHTML = photos.map((p, i) => `<img src="${img(p)}" alt="Team moment ${i + 1}" loading="lazy" draggable="false">`).join("");
    const cnt = $("#photoCounter");
    cnt.querySelector(".next .num").textContent = String(photos.length).padStart(2, "0");
    let pi = 0;
    const go = (n) => {
      pi = FR.clamp(n, 0, photos.length - 1);
      const el = track.children[pi];
      track.style.transform = `translate3d(${-el.offsetLeft + track.children[0].offsetLeft}px,0,0)`;
      const c = cnt.querySelector(".prev .num"); c.textContent = String(pi + 1).padStart(2, "0"); c.classList.remove("roll"); void c.offsetWidth; c.classList.add("roll");
    };
    cnt.querySelector(".prev").addEventListener("click", () => go(pi - 1));
    cnt.querySelector(".next").addEventListener("click", () => go(pi + 1));
    let sx = null;
    wrap.addEventListener("pointerdown", (e) => { sx = e.clientX; wrap.classList.add("drag"); });
    window.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; if (Math.abs(dx) > 40) go(pi + (dx < 0 ? 1 : -1)); sx = null; wrap.classList.remove("drag"); });
  }

  /* ================= INSIGHTS ================= */
  if (page === "insights") {
    const box = $("#posts"), pager = $("#pager"), per = 9;
    let q = "", pg = 0;
    function render() {
      const list = D.posts.filter((p) => p[0].toLowerCase().includes(q));
      const pages = Math.max(1, Math.ceil(list.length / per));
      pg = Math.min(pg, pages - 1);
      box.innerHTML = list.slice(pg * per, pg * per + per).map((p) => `<a class="post rv in" href="#"><div class="ph"><img src="${img(p[2])}" alt="" loading="lazy"><span class="tg">${p[1]}</span></div><h3>${p[0]}</h3></a>`).join("") || `<p class="t-body">No posts match “${q}”.</p>`;
      pager.innerHTML = pages > 1 ? Array.from({ length: pages }, (_, i) => `<button class="${i === pg ? "on" : ""}" aria-label="Page ${i + 1}">${i + 1}</button>`).join("") + `<button aria-label="Next page">&rarr;</button>` : "";
      $$("button", pager).forEach((b, i, all) => b.addEventListener("click", () => { pg = i === all.length - 1 ? (pg + 1) % pages : i; render(); $("#postsTop").scrollIntoView({ behavior: FR.reduce ? "auto" : "smooth" }); }));
      FR.update();
    }
    $("#search").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); pg = 0; render(); });
    const sw = $("#viewSwitch");
    sw.addEventListener("click", () => { const l = sw.getAttribute("aria-pressed") !== "true"; sw.setAttribute("aria-pressed", l); sw.querySelector(".lbl").textContent = l ? "list view" : "grid view"; box.classList.toggle("list", l); FR.update(); });
    render();
  }

  /* ================= CONTACT ================= */
  if (page === "contact") {
    const form = $("#cform");
    $$(".fld[data-opts]", form).forEach((f) => {
      const opts = f.dataset.opts.split("|");
      const sel = f.querySelector(".sel");
      f.insertAdjacentHTML("beforeend", `<ul class="opts"><div>${opts.map((o) => `<li><button type="button">${o}</button></li>`).join("")}</div></ul>`);
      sel.addEventListener("click", () => { f.classList.toggle("open"); sel.setAttribute("aria-expanded", f.classList.contains("open")); });
      $$(".opts button", f).forEach((b) => b.addEventListener("click", () => {
        $$(".opts button", f).forEach((x) => x.classList.toggle("on", x === b));
        sel.querySelector("span").textContent = b.textContent; sel.classList.add("picked"); sel.dataset.value = b.textContent;
        f.classList.remove("open", "err");
      }));
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$(".fld", form).forEach((f) => {
        const inp = f.querySelector("input"), sel = f.querySelector(".sel");
        let bad = false;
        if (f.dataset.req) bad = inp ? !inp.value.trim() : !sel.dataset.value;
        if (inp && inp.type === "email" && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) bad = true;
        f.classList.toggle("err", bad); if (bad) ok = false;
      });
      if (!ok) { const first = $(".fld.err input, .fld.err .sel", form); first && first.focus(); return; }
      form.hidden = true; $("#formDone").classList.add("on"); FR.update();
    });
    $$(".fld input", form).forEach((i) => i.addEventListener("input", () => i.closest(".fld").classList.remove("err")));
    const nf = $("#inboxForm");
    nf.addEventListener("submit", (e) => { e.preventDefault(); const i = nf.querySelector("input"); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) { i.focus(); return; } nf.innerHTML = '<p class="t-body"><b>Thanks!</b> Watch your inbox.</p>'; });
  }

  /* ================= CASE STUDY ================= */
  if (page === "case") {
    const id = new URLSearchParams(location.search).get("c") || "vantage";
    const c = FR.caseById(id) || D.cases[1];
    document.title = `${c.client} | FarReach`;
    $("#cTitle").textContent = c.client;
    $("#cSub").textContent = c.title;
    $("#cVideo").innerHTML = `<video muted playsinline loop autoplay poster="assets/video/${c.video}.jpg" src="assets/video/${c.video}.mp4"></video>`;
    $("#cIndustry").textContent = c.industry;
    $("#cBig").innerHTML = `${c.big[0]}<small>${c.big[1]}</small>`;
    $("#cChips").innerHTML = c.services.slice(0, 3).map((s) => `<span>${s}</span>`).join("");
    $("#cBrief").textContent = c.brief;
    $("#cImg").src = img(c.img); $("#cImg").alt = c.client;
    $("#cQuote").textContent = `“${c.quote[0]}”`;
    $("#cQuoteBy").textContent = "— " + c.quote[1];
    $("#cResults").innerHTML = c.results.map((r) => `<div class="r rv"><b>${r[0]}</b><span>${r[1]}</span></div>`).join("");
    $$("#cResults .rv").forEach((r) => FR.observe(r));
    FR.bigMarquee($("#cMarquee"), c.word);
    FR.rail($(".rail-wrap"), $("#rail"), D.cases.filter((x) => x.id !== c.id));
    const sw = $("#visSwitch");
    sw.addEventListener("click", () => { const v = sw.getAttribute("aria-pressed") !== "true"; sw.setAttribute("aria-pressed", v); document.body.classList.toggle("visual", v); FR.update(); });
  }

  FR.update();
})();
