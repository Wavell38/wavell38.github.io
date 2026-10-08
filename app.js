(() => {
  const projects = window.PORTFOLIO?.projects || [];

  const esc = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    })[char]);

  const list = items =>
    "<ul>" + (items || []).map(item => "<li>" + esc(item) + "</li>").join("") + "</ul>";

  function techIcon(name) {
    const value = String(name || "").toLowerCase();

    if (value.includes("ros")) {
      return '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="1.4"/><circle cx="12" cy="6" r="1.4"/><circle cx="18" cy="6" r="1.4"/><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/><circle cx="6" cy="18" r="1.4"/><circle cx="12" cy="18" r="1.4"/><circle cx="18" cy="18" r="1.4"/></svg>';
    }

    if (value.includes("c++")) {
      return '<svg viewBox="0 0 24 24"><path d="M8 7.2a5.8 5.8 0 1 0 0 9.6"/><path d="M14 9v6M11 12h6M20 9v6M17 12h6"/></svg>';
    }

    if (value.includes("typescript")) {
      return '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 9h6M10 9v8M15 16.5c.7.5 1.5.7 2.2.7 1.1 0 1.8-.5 1.8-1.3 0-2-3.7-1-3.7-3.2 0-.9.8-1.6 2.1-1.6.7 0 1.3.2 1.8.5"/></svg>';
    }

    if (value.includes("vision")) {
      return '<svg viewBox="0 0 24 24"><path d="M2.8 12s3.5-5 9.2-5 9.2 5 9.2 5-3.5 5-9.2 5-9.2-5-9.2-5z"/><circle cx="12" cy="12" r="2.4"/></svg>';
    }

    if (value.includes("freecad")) {
      return '<svg viewBox="0 0 24 24"><path d="M12 2.8 20 7v10l-8 4.2L4 17V7z"/><path d="m4 7 8 4 8-4M12 11v10"/></svg>';
    }

    return '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg>';
  }

  function tags(items, rich = false) {
    return (
      '<div class="tags ' + (rich ? "tags-rich" : "") + '">' +
      (items || [])
        .map(item =>
          '<span class="tag">' +
          (rich ? '<span class="tag-icon">' + techIcon(item) + "</span>" : "") +
          "<span>" + esc(item) + "</span></span>"
        )
        .join("") +
      "</div>"
    );
  }

  function card(project, featured = false) {
    return (
      '<a class="card ' + (featured ? "featured" : "") + '" href="./project.html?id=' + encodeURIComponent(project.id) + '">' +
      '<div class="card-meta"><span>' + esc(project.kind) + "</span><span>" + esc(project.status) + "</span></div>" +
      "<h3>" + esc(project.title) + "</h3>" +
      "<p>" + esc(project.summary) + "</p>" +
      tags(project.tags) +
      '<div class="card-link">Voir le projet →</div></a>'
    );
  }

  function renderHome() {
    const setGrid = (id, items, featured = false) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.innerHTML = items.map(project => card(project, featured)).join("");
    };

    setGrid(
      "featured-grid",
      projects.filter(project => project.group === "featured").sort((a, b) => (a.order || 0) - (b.order || 0)),
      true
    );
    setGrid("systems-grid", projects.filter(project => project.group === "systems"));
    setGrid("mechanical-grid", projects.filter(project => project.group === "mechanical"));
    setGrid("experience-grid", projects.filter(project => project.group === "experience"));
  }

  function renderStandard(project, root) {
    const factLabels = ["État", "Repère", "Point clé"];
    const facts = (project.facts || [])
      .map((fact, index) =>
        "<div><span>" + factLabels[index % factLabels.length] + "</span><strong>" + esc(fact) + "</strong></div>"
      )
      .join("");

    const links = (project.links || []).length
      ? '<div class="project-links">' +
        project.links
          .map(link => '<a class="btn secondary" href="' + esc(link[1]) + '" target="_blank" rel="noreferrer">' + esc(link[0]) + " ↗</a>")
          .join("") +
        "</div>"
      : "";

    root.innerHTML =
      '<a class="project-back" href="./index.html#projets">← Retour aux projets</a>' +
      '<section class="project-hero">' +
        '<p class="eyebrow">' + esc(project.kind) + " · " + esc(project.period) + "</p>" +
        "<h1>" + esc(project.title) + "</h1>" +
        '<p class="project-summary">' + esc(project.subtitle) + "</p>" +
        tags(project.tags) +
        '<div class="project-facts">' + facts + "</div>" +
        links +
      "</section>" +
      '<div class="project-content">' +
        '<section class="detail-section"><h2>Contexte</h2><div><p>' + esc(project.context) + "</p></div></section>" +
        '<section class="detail-section"><h2>Travaux réalisés</h2><div>' + list(project.work || []) + "</div></section>" +
        '<section class="detail-section"><h2>Résultats</h2><div>' + list(project.results || []) + "</div></section>" +
        '<section class="detail-section"><h2>Limites / état</h2><div><p>' + esc(project.limits) + "</p></div></section>" +
      "</div>";
  }

  function projectTitle(project) {
    return project.id === "cards-analyzer"
      ? 'Cards <span class="title-accent">Analyzer</span>'
      : esc(project.title);
  }

  function tocHtml() {
    const items = [
      ["Intro", "top"],
      ["Contexte", "context"],
      ["Travaux", "work-1"],
      ["Validation", "validation"],
      ["Résultats", "results"],
      ["Limites", "limits"],
    ];

    return (
      '<aside class="case-toc" aria-label="Navigation du projet">' +
      items
        .map(([label, target]) =>
          '<a class="toc-link" href="#' + target + '" data-target="' + target + '">' +
          '<span class="toc-label">' + label + '</span><span class="toc-dot"></span></a>'
        )
        .join("") +
      "</aside>"
    );
  }

  function setupScrollSpy() {
    const toc = document.querySelector(".case-toc");
    if (!toc) return;

    const links = [...toc.querySelectorAll(".toc-link")];
    const entries = links
      .map(link => ({
        link,
        element: document.getElementById(link.dataset.target),
      }))
      .filter(entry => entry.element);

    let ticking = false;

    const update = () => {
      ticking = false;
      const marker = 190;
      let active = entries[0];

      for (const entry of entries) {
        if (entry.element.getBoundingClientRect().top <= marker) {
          active = entry;
        } else {
          break;
        }
      }

      links.forEach(link => link.classList.remove("active"));
      if (active) active.link.classList.add("active");
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", update);
    update();
  }

  function renderEnvironment(project) {
    if (project.environmentGroups?.length) {
      return (
        '<div class="tech-groups">' +
        project.environmentGroups
          .map(group =>
            '<section class="tech-group">' +
              "<h3>" + esc(group.title) + "</h3>" +
              '<div class="tech-cloud">' +
                group.items.map(item => "<span>" + esc(item) + "</span>").join("") +
              "</div>" +
            "</section>"
          )
          .join("") +
        "</div>"
      );
    }

    return (
      '<div class="tech-cloud">' +
      (project.environment || []).map(item => "<span>" + esc(item) + "</span>").join("") +
      "</div>"
    );
  }

  function renderCaseStudy(project, root) {
    const factLabels = ["État", "Repère", "Point clé"];
    const facts = (project.facts || [])
      .map((fact, index) =>
        "<div><span>" + factLabels[index] + "</span><strong>" + esc(fact) + "</strong></div>"
      )
      .join("");

    const sections = (project.sections || [])
      .map((section, index) =>
        '<section class="case-section" id="work-' + (index + 1) + '">' +
          '<div class="case-index"><span>Travaux réalisés</span>' + String(index + 1).padStart(2, "0") + "</div>" +
          '<div class="case-copy">' +
            "<h2>" + esc(section.title) + "</h2>" +
            (section.text ? '<p class="case-lede">' + esc(section.text) + "</p>" : "") +
            list(section.bullets || []) +
          "</div>" +
        "</section>"
      )
      .join("");

    const links = (project.links || []).length
      ? '<div class="project-links">' +
        project.links
          .map(link => '<a class="btn secondary" href="' + esc(link[1]) + '" target="_blank" rel="noreferrer">' + esc(link[0]) + " ↗</a>")
          .join("") +
        "</div>"
      : "";

    root.innerHTML =
      tocHtml() +
      '<a class="project-back" href="./index.html#projets">← Retour aux projets</a>' +
      '<section class="project-hero case-hero" id="top">' +
        '<div class="case-kicker"><span>' + esc(project.kind) + "</span><span>" + esc(project.period) + '</span><span class="status">' + esc(project.status) + "</span></div>" +
        "<h1>" + projectTitle(project) + "</h1>" +
        '<p class="project-summary">' + esc(project.subtitle) + "</p>" +
        '<p class="project-role">' + esc(project.role || "") + "</p>" +
        tags(project.tags, true) +
        '<div class="project-facts">' + facts + "</div>" +
        links +
      "</section>" +
      '<div class="case-study">' +
        '<section class="case-overview" id="context">' +
          "<div>" +
            '<p class="eyebrow">Contexte</p>' +
            '<p class="case-intro">' + esc(project.context) + "</p>" +
          "</div>" +
          '<div class="objective-box">' +
            '<p class="eyebrow">Objectif V1</p>' +
            list(project.objective || []) +
          "</div>" +
        "</section>" +
        '<div class="case-sections">' + sections + "</div>" +
        '<section class="evidence-section" id="validation">' +
          '<div class="evidence-card validated">' +
            '<p class="eyebrow">Établi / validé dans la V1</p>' +
            list(project.validated || []) +
          "</div>" +
          '<div class="evidence-card experimental">' +
            '<p class="eyebrow">Encore expérimental / différé</p>' +
            list(project.experimental || []) +
          "</div>" +
        "</section>" +
        '<section class="case-section results-section" id="results">' +
          '<div class="case-index"><span>Bilan</span>R</div>' +
          '<div class="case-copy"><h2>Résultats</h2>' + list(project.results || []) + "</div>" +
        "</section>" +
        '<section class="case-section" id="limits">' +
          '<div class="case-index"><span>Bilan</span>L</div>' +
          '<div class="case-copy"><h2>Limites / état actuel</h2><p class="case-lede">' + esc(project.limits) + "</p></div>" +
        "</section>" +
        '<section class="tech-environment" id="stack">' +
          '<div><p class="eyebrow">Environnement technique</p><h2>Stack & outils</h2></div>' +
          renderEnvironment(project) +
        "</section>" +
      "</div>";

    setupScrollSpy();
  }

  function renderProject() {
    const root = document.getElementById("project-root");
    if (!root) return;

    const id = new URLSearchParams(location.search).get("id");
    const project = projects.find(item => item.id === id);

    if (!project) {
      root.innerHTML =
        '<section class="project-hero">' +
          '<p class="eyebrow">404</p>' +
          "<h1>Projet introuvable</h1>" +
          '<p class="project-summary">Revenez à la page principale du portfolio.</p>' +
          '<a class="btn secondary" href="./index.html">← Retour</a>' +
        "</section>";
      return;
    }

    document.title = project.title + " — Vincent Grange";

    if (project.sections) {
      renderCaseStudy(project, root);
    } else {
      renderStandard(project, root);
    }
  }

  if (document.body.dataset.page === "home") renderHome();
  if (document.body.dataset.page === "project") renderProject();
})();