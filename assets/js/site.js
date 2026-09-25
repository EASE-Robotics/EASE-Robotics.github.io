// ─── Shared site behavior ───────────────────────────────────────────────────────
// Injects the navbar and footer, wires Google Form buttons from config.js,
// and renders the leaderboard on rankings.html.

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "compete.html", label: "Compete", needs: "any" },
  ];

  function currentPage() {
    const file = location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  function renderNav() {
    const slot = document.getElementById("site-nav");
    if (!slot) return;
    const page = currentPage();
    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}"${l.href === page ? ' aria-current="page"' : ""}${
          l.needs ? ` data-needs="${l.needs}"` : ""
        }>${l.label}</a>`
    ).join("");

    slot.outerHTML = `
      <nav class="nav">
        <div class="nav-inner">
          <a class="brand" href="index.html">
            <span class="brand-mark"></span>
            <span class="brand-name">EASE Robotics</span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <div class="nav-links">
            ${links}
            <a class="btn btn-plum btn-sm" href="compete.html" data-needs="any">Get started</a>
          </div>
        </div>
      </nav>`;

    const nav = document.querySelector(".nav");
    const toggle = nav.querySelector(".nav-toggle");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function renderFooter() {
    const slot = document.getElementById("site-footer");
    if (!slot) return;
    slot.outerHTML = `
      <footer class="footer">
        EASE Robotics Competition &mdash; a program for student engineers.
      </footer>`;
  }

  function formUrl(key) {
    return ((window.EASE_FORMS || {})[key] || "").trim();
  }

  // Form-related content stays hidden (see style.css) until its link is set in config.js:
  //   data-needs="requestKit"  → shown once that form has a link
  //   data-needs="any"         → shown once any form has a link
  //   data-unless="any"        → shown only while no form has a link
  // Buttons marked data-form="registerTeam" (etc.) open the matching Google Form.
  function wireForms() {
    const anyForm = Object.keys(window.EASE_FORMS || {}).some(formUrl);
    const has = (key) => (key === "any" ? anyForm : !!formUrl(key));

    document.querySelectorAll("[data-needs]").forEach((el) => {
      if (has(el.dataset.needs)) el.classList.add("is-ready");
    });
    document.querySelectorAll("[data-unless]").forEach((el) => {
      if (has(el.dataset.unless)) el.hidden = true;
    });
    document.querySelectorAll("[data-form]").forEach((el) => {
      const url = formUrl(el.dataset.form);
      if (!url) return;
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }

  // Graded teams first (score high → low), ungraded teams at the bottom.
  function sortRankings(rows) {
    return rows.slice().sort((a, b) => {
      const as = typeof a.score === "number", bs = typeof b.score === "number";
      if (as && bs) return b.score - a.score;
      if (as) return -1;
      if (bs) return 1;
      return 0;
    });
  }

  function cell(text, className) {
    const td = document.createElement("td");
    td.textContent = text;
    if (className) td.className = className;
    return td;
  }

  async function renderRankings() {
    const root = document.getElementById("rankings");
    if (!root) return;

    let rows;
    try {
      const res = await fetch("data/rankings.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(res.statusText);
      rows = await res.json();
    } catch (err) {
      root.innerHTML = '<p class="empty">Couldn’t load rankings. Please try again later.</p>';
      return;
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      root.innerHTML =
        '<p class="empty">No submissions yet — check back after the competition begins!</p>';
      return;
    }

    const table = document.createElement("table");
    table.innerHTML =
      '<thead><tr><th style="width:64px">Rank</th><th>Team</th><th>School</th><th class="num">Score</th></tr></thead>';
    const tbody = document.createElement("tbody");

    sortRankings(rows).forEach((row, i) => {
      const graded = typeof row.score === "number";
      const tr = document.createElement("tr");
      tr.append(
        cell(graded ? String(i + 1) : "—", "rank"),
        cell(row.team || "", "team-name"),
        cell(row.school || "", "school"),
        cell(graded ? `${row.score} / 100` : "—", "score num")
      );
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.appendChild(table);
    root.replaceChildren(wrap);
  }

  renderNav();
  renderFooter();
  wireForms();
  renderRankings();
})();
