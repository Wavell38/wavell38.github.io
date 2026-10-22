const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function renderPage(fields = {}) {
  const root = { innerHTML: '' };
  const project = {
    id: 'fixture', title: 'Projet de test', kind: 'Projet', period: '2026', status: 'En cours',
    sections: [], ...fields,
  };
  const document = {
    body: { dataset: { page: 'project' } },
    getElementById: id => id === 'project-root' ? root : null,
    querySelector: () => null,
  };
  vm.runInNewContext(source, {
    window: { PORTFOLIO: { projects: [project] } },
    location: { search: '?id=' + encodeURIComponent(project.id) },
    URLSearchParams,
    document,
  });
  return { html: root.innerHTML, title: document.title };
}

const render = fields => renderPage(fields).html;

function renderHome(projects) {
  const grids = Object.fromEntries(['featured', 'systems', 'mechanical', 'experience']
    .map(group => [group + '-grid', { innerHTML: '' }]));
  vm.runInNewContext(source, {
    window: { PORTFOLIO: { projects } },
    document: {
      body: { dataset: { page: 'home' } },
      getElementById: id => grids[id],
      querySelector: selector => selector === 'main' ? { insertAdjacentHTML() {} } : null,
    },
  });
  return Object.values(grids).map(grid => grid.innerHTML).join('');
}

async function loadPortfolio() {
  const previousWindow = global.window;
  global.window = {};
  try {
    await import(pathToFileURL(path.join(__dirname, '..', 'data', 'index.js')).href);
    return global.window.PORTFOLIO.projects;
  } finally {
    if (previousWindow === undefined) delete global.window;
    else global.window = previousWindow;
  }
}

test('lifecycle and maturity have separate labels in both project templates', () => {
  for (const sections of [[], undefined]) {
    const html = render({ sections, status: '<En pause>', facts: ['<Prototype>', 'Capteur', 'Résultat'] });
    const hero = html.match(/<section class="project-hero[\s\S]*?<\/section>/)[0];
    assert.equal((hero.match(/&lt;En pause&gt;/g) || []).length, 1);
    assert.equal((hero.match(/&lt;Prototype&gt;/g) || []).length, 1);
    assert.match(hero, /<span>Maturité<\/span><strong>&lt;Prototype&gt;<\/strong>/);
    assert.doesNotMatch(hero, /<span>État<\/span>|<En pause>|<Prototype>/);
  }
});

test('unknown or blank lifecycle leaves no badge or placeholder on pages and cards', () => {
  for (const status of [undefined, null, '', '  ']) {
    for (const sections of [[], undefined]) {
      const html = render({ sections, status, facts: ['Prototype', 'Capteur', 'Résultat'] });
      assert.doesNotMatch(html, /class="status"|undefined|Non précisé/);
      assert.match(html, /<span>Maturité<\/span><strong>Prototype/);
    }
    const home = renderHome([{ id: 'fixture', group: 'systems', kind: 'Robotique', title: 'Test', status }]);
    assert.match(home, /class="card-meta"><span>Robotique<\/span><\/div>/);
    assert.doesNotMatch(home, /undefined|Non précisé|<span>\s*<\/span>/);
  }
  const home = renderHome([{ id: 'fixture', group: 'systems', status: '<En cours>' }]);
  assert.match(home, /&lt;En cours&gt;/);
  assert.equal((home.match(/&lt;En cours&gt;/g) || []).length, 1);
});

test('company identity is escaped, labelled and decorative on cards and both templates', () => {
  const fields = {
    id: 'fixture', group: 'experience', title: '<Projet & titre>', subtitle: '<Complément>',
    titleAccent: '& titre', company: '  <Agence> & "Partenaire" O\'Neil  ',
  };
  for (const html of [renderHome([fields]), render(fields), render({ ...fields, sections: undefined })]) {
    const company = html.match(/<p class="project-company">[\s\S]*?<\/p>/)[0];
    assert.match(company, /Entreprise : <\/span>&lt;Agence&gt; &amp; &quot;Partenaire&quot; O&#039;Neil/);
    assert.match(company, /<svg[^>]+aria-hidden="true"[^>]+focusable="false"/);
    assert.doesNotMatch(company, /<a\b|href=|<Agence>/);
    assert.equal((html.match(/class="project-company"/g) || []).length, 1);
    assert.doesNotMatch(html, /<Projet|<Complément>/);
    const headingEnd = html.indexOf(html.includes('<h1>') ? '</h1>' : '</h3>');
    assert.ok(headingEnd < html.indexOf(company));
  }
  assert.match(render(fields), /<h1>&lt;Projet <span class="title-accent">&amp; titre<\/span>&gt;<\/h1>/);
  assert.match(render(fields), /class="project-summary">&lt;Complément&gt;<\/p>/);
  assert.equal(renderPage(fields).title, '<Projet & titre> — Vincent Grange');
});

test('missing or blank company does not change rendering or leave a placeholder', () => {
  const project = { id: 'fixture', group: 'systems', title: 'Projet personnel' };
  for (const company of [undefined, null, '', ' \t\n']) {
    for (const sections of [[], undefined]) {
      const html = render({ ...project, sections, company });
      assert.equal(html, render({ ...project, sections }));
      assert.doesNotMatch(html, /project-company|company-label|Entreprise/);
    }
    assert.equal(renderHome([{ ...project, company }]), renderHome([project]));
    assert.doesNotMatch(renderHome([{ ...project, company }]), /project-company|company-label|Entreprise/);
  }
});

test('all twelve real projects preserve identity, editorial metadata, media and navigation', async () => {
  const projects = await loadPortfolio();
  const expected = [
    ['cards-analyzer', 'featured', 'Depuis mai 2026', 'En cours'],
    ['quant-platform', 'featured', 'Depuis juin 2026', 'R&D en cours'],
    ['agentic-workflow', 'featured', 'Depuis janvier 2026', 'En évolution'],
    ['camera-mapper', 'systems', 'Depuis mars 2026', 'V2 en réflexion pour 2027'],
    ['lidar-2d-3d', 'systems', '2026', 'Projet arrêté'],
    ['imu-glove', 'systems', '2025 – janvier 2026', 'En pause'],
    ['drone', 'systems', '2024–2025', undefined],
    ['robot-arm', 'mechanical', '2025', 'Projet arrêté'],
    ['cycloidal', 'mechanical', '2025–2026', undefined],
    ['matrice', 'experience', '2021–2022', 'Collaboration achevée'],
    ['itfs73', 'experience', '2020–janvier 2021', 'Projet arrêté'],
    ['pure-illusion', 'experience', '2020 — mission de fin d’études prolongée brièvement en freelance', 'Mission terminée'],
  ];
  assert.deepEqual(projects.map(p => [p.id, p.group, p.period, p.status]), expected);
  assert.deepEqual(projects.filter(p => p.group === 'featured').map(p => p.order), [1, 2, 3]);
  const ids = new Set(projects.map(p => p.id));
  const experiences = {
    matrice: ['Outil de collecte et de supervision de données sociales', 'Agence Matrice', 'données sociales'],
    itfs73: ['Plateforme pédagogique multi-écrans', 'ITFS73', 'multi-écrans'],
    'pure-illusion': ["Outil de consultation et d'intégration de données SEO", 'Pure Illusion', 'données SEO'],
  };
  const personalTitles = [
    'Cards Analyzer', 'Plateforme de recherche quantitative', 'Workflow de développement assisté par agents IA',
    'Camera Mapper', 'LiDAR 2D → reconstruction 3D', 'Gant IMU', 'Drone semi-autonome',
    'Bras robotique V1', 'Réducteur cycloïdal',
  ];
  assert.deepEqual(projects.filter(p => p.group !== 'experience').map(p => p.title), personalTitles);
  const root = path.join(__dirname, '..');
  for (const project of projects) {
    for (const key of ['title', 'kind', 'subtitle', 'summary', 'context', 'limits']) {
      assert.ok(typeof project[key] === 'string' && project[key].trim(), `${project.id}: ${key}`);
    }
    assert.ok(project.results.length && project.tags.length, project.id);
    assert.equal(project.facts.length, 3, project.id);
    assert.equal(new Set(project.facts).size, 3, project.id);
    for (const fact of project.facts) {
      assert.ok(typeof fact === 'string' && fact.trim(), project.id);
      if (project.status) assert.ok(!fact.includes(project.status), `${project.id}: repeated lifecycle`);
    }
    assert.doesNotMatch(project.facts[0], /^(En cours|En pause|Projet arrêté|R&D|Pipeline)/);
    const { html, title } = renderPage({ status: undefined, ...project });
    const card = renderHome([project]);
    assert.equal(title, project.title + ' — Vincent Grange');
    if (experiences[project.id]) {
      const [expectedTitle, company, accent] = experiences[project.id];
      assert.equal(project.title, expectedTitle);
      assert.equal(project.company, company);
      assert.equal(project.titleAccent, accent);
      assert.notEqual(project.title, project.subtitle);
      assert.notEqual(project.title, project.summary);
      assert.ok(card.includes('<h3>' + expectedTitle.replaceAll("'", '&#039;') + '</h3>'));
      const heading = html.match(/<h1>([\s\S]*?)<\/h1>/)[1];
      assert.equal(heading.replace(/<\/?span[^>]*>/g, ''), expectedTitle.replaceAll("'", '&#039;'));
      assert.ok(heading.includes('<span class="title-accent">' + accent + '</span>'));
      for (const rendered of [card, html]) {
        assert.equal((rendered.match(/class="project-company"/g) || []).length, 1);
        assert.ok(rendered.includes('Entreprise : </span>' + company));
      }
    } else {
      assert.ok(!Object.hasOwn(project, 'company'), project.id);
      assert.doesNotMatch(card + html, /project-company|company-label|Entreprise :/);
    }
    assertNavigationTargets(html);
    assert.doesNotMatch(html, /undefined|<span>État<\/span>|<h[12]><\/h[12]>/, project.id);
    const hero = html.match(/<section class="project-hero[\s\S]*?<\/section>/)[0];
    assert.equal((hero.match(/class="status"/g) || []).length, project.status ? 1 : 0, project.id);
    assert.equal((hero.match(/<span>Maturité<\/span>/g) || []).length, 1, project.id);
    assert.equal((hero.match(/<strong>/g) || []).length, 3, project.id);
    for (const [, href] of html.matchAll(/href="(\.\/[^"#]+)(?:#[^"]*)?"/g)) {
      const url = new URL(href.replaceAll('&amp;', '&'), 'http://portfolio.local/');
      assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url.pathname))), href);
      if (url.pathname === '/project.html') assert.ok(ids.has(url.searchParams.get('id')), href);
    }
    const media = [project.media?.lead, ...project.sections.flatMap(section => section.media || [])].filter(Boolean);
    for (const item of media) {
      assert.ok(item.alt?.trim(), `${project.id}: missing alt`);
      const filename = path.join(root, item.src);
      assert.ok(fs.existsSync(filename), item.src);
      const bytes = fs.readFileSync(filename);
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', item.src);
      assert.equal(item.width, bytes.readUInt32BE(16), `${item.src}: width`);
      assert.equal(item.height, bytes.readUInt32BE(20), `${item.src}: height`);
      if (item.type === 'document') assert.ok(html.includes('href="' + item.src + '"'), item.src);
    }
  }
  const home = renderHome(projects);
  const homeIds = [...home.matchAll(/href="\.\/project.html\?id=([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(homeIds, expected.map(([id]) => id));
  assert.doesNotMatch(home, /undefined|Non précisé/);
});

function assertNavigationTargets(html) {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Missing navigation target: ${target}`);
  }
}

test('generic labels and optional result introduction', () => {
  const html = render({ objective: ['But'], results: ['Livré'] });
  assert.match(html, /<h2 class="eyebrow">Objectifs<\/h2>/);
  assert.match(html, /<h2>Résultats<\/h2>/);
  assert.doesNotMatch(html, /V1|<p><\/p>/);
});

test('result links follow the results and escape labels and URLs', () => {
  const html = render({
    results: ['Published tool'],
    resultsLinks: [['<Repository>', 'https://github.com/example/tool?ref="release"']],
    limits: 'Current limits',
  });
  const results = html.match(/<section class="outcome-results"[\s\S]*?<\/section>/)[0];
  assert.ok(results.indexOf('Published tool') < results.indexOf('class="project-links"'));
  assert.match(results, /href="https:\/\/github.com\/example\/tool\?ref=&quot;release&quot;" target="_blank" rel="noreferrer">&lt;Repository&gt;/);
  assert.doesNotMatch(results, /<Repository>/);
  assertNavigationTargets(html);
});

test('result links remain optional and do not create an empty results section', () => {
  for (const resultsLinks of [undefined, null, {}, [], [null, {}, [], [' ', 'url'], ['Label', ' ']]]) {
    assert.doesNotMatch(render({ results: ['Delivered'], resultsLinks }), /class="project-links"/);
  }
  assert.doesNotMatch(render({ resultsLinks: [['Repository', 'https://github.com/example/tool']] }), /id="results"|href="#results"|class="project-links"/);
});

test('custom labels and result introduction are escaped, including navigation', () => {
  const html = render({
    context: 'Contexte', objective: ['But'], sections: [{ text: 'Travail' }],
    results: ['Livré'], limits: 'Limite', nextSteps: '<Étudier>', nextStepsItems: ['<Mesurer>'], environment: ['JavaScript'],
    labels: {
      context: '<Contexte>', objectives: '<Objectifs>', work: '<Travaux>',
      results: '<Résultats>', limits: '<Limites>', nextSteps: '<Suite>', environment: '<Outils>',
    },
    resultsIntro: '<script>alert(1)</script>',
  });
  for (const label of ['Contexte', 'Objectifs', 'Travaux', 'Résultats', 'Limites', 'Suite', 'Outils']) {
    assert.ok(html.includes('&lt;' + label + '&gt;'));
    assert.ok(!html.includes('<' + label + '>'));
  }
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /class="toc-label">&lt;Résultats&gt;/);
  assert.match(html, /class="toc-label">&lt;Suite&gt;/);
  assert.match(html, /class="toc-label">&lt;Outils&gt;/);
  assert.match(html, /<p>&lt;Étudier&gt;<\/p>/);
  assert.match(html, /<p>&lt;Mesurer&gt;<\/p>/);
  assert.doesNotMatch(html, /<Étudier>|<Mesurer>/);
  assertNavigationTargets(html);
});

test('empty label overrides fall back to generic labels', () => {
  const html = render({ objective: ['But'], results: ['Livré'], labels: { objectives: '  ', results: null } });
  assert.match(html, />Objectifs<\/h2>/);
  assert.match(html, />Résultats<\/h2>/);
});

test('absent or blank content leaves no body, navigation or empty blocks', () => {
  for (const fields of [{}, {
    context: '  ', objective: [null, '', ' '], results: ['', null], limits: '\n', limitsItems: [' '],
    nextSteps: '\n', nextStepsItems: [null, '', ' '],
    environment: [''], environmentGroups: [null, { title: 'Vide', items: [' '] }],
    sections: [null, {}, { title: 'Titre seul', text: ' ', bullets: [''], media: [{ src: ' ' }] }],
    media: { lead: { src: ' ' } },
    labels: { objectives: 'Personnalisé', nextSteps: 'Version suivante', environment: 'Outils' }, resultsIntro: 'Ne suffit pas à créer un bloc',
  }]) {
    const html = render(fields);
    assert.doesNotMatch(html, /class="case-study"|class="case-toc"|id="context"|id="results"|id="limits"|id="next-steps"|id="stack"/);
    assert.doesNotMatch(html, /objective-box|case-sections|project-figure|tech-group/);
    assertNavigationTargets(html);
  }
});

test('context, objectives and lead media can appear independently', () => {
  const context = render({ context: 'Contexte seul' });
  assert.match(context, /class="case-context"/);
  assert.doesNotMatch(context, /objective-box|project-figure/);
  const objectives = render({ objective: ['But seul'] });
  assert.match(objectives, /class="objective-box"/);
  assert.doesNotMatch(objectives, /case-overview-intro|case-context|project-figure/);
  assert.match(objectives, /class="toc-label">Objectifs<\/span>/);
  const photo = render({ media: { lead: { src: 'photo.png', alt: 'Photo' } } });
  assert.match(photo, /project-figure--lead/);
  assert.doesNotMatch(photo, /case-overview-intro--illustrated|case-context|objective-box/);
  assert.match(photo, /class="toc-label">Aperçu<\/span>/);
});

test('standalone lead precedes context without changing the default layout', () => {
  const fields = { context: 'Contexte', media: { lead: { src: 'assembly.png' } } };
  const standard = render(fields);
  assert.match(standard, /case-overview-intro--illustrated/);
  assert.ok(standard.indexOf('id="context"') < standard.indexOf('src="assembly.png"'));

  const standalone = render({ ...fields, media: { ...fields.media, leadPlacement: 'before-context' } });
  assert.ok(standalone.indexOf('id="top"') < standalone.indexOf('src="assembly.png"'));
  assert.ok(standalone.indexOf('src="assembly.png"') < standalone.indexOf('id="context"'));
  assert.equal((standalone.match(/src="assembly.png"/g) || []).length, 1);
  assert.doesNotMatch(standalone, /case-overview-intro--illustrated/);
  assertNavigationTargets(standalone);

  const onlyLead = render({ media: { ...fields.media, leadPlacement: 'before-context' } });
  assert.match(onlyLead, /project-figure--lead/);
  assert.doesNotMatch(onlyLead, /case-study|case-overview|href="#context"/);
  const missingLead = render({ media: { leadPlacement: 'before-context', lead: { src: ' ' } } });
  assert.doesNotMatch(missingLead, /project-figure|case-study|case-overview/);
});

test('technical images link to originals and share the two-media section limit', () => {
  const html = render({ sections: [{ media: [
    { type: 'document', src: 'drawing.png?x="y"', alt: '<Disque>', caption: '<Plan>', width: 2339, height: 1653 },
    { src: 'photo.png', alt: 'Photo' },
    { type: 'document', src: 'extra.png' },
  ] }] });
  assert.match(html, /href="drawing.png\?x=&quot;y&quot;" rel="noreferrer"/);
  assert.match(html, /project-figure--document/);
  assert.match(html, /<img src="drawing.png\?x=&quot;y&quot;" alt="&lt;Disque&gt;" width="2339" height="1653"/);
  assert.match(html, /<figcaption>&lt;Plan&gt;<\/figcaption>/);
  assert.match(html, /<img src="photo.png"/);
  assert.doesNotMatch(html, /<iframe|<object|<embed|extra.png|case-section-text|Ouvrir le PDF/);
  assert.equal((html.match(/<figure /g) || []).length, 2);
  assertNavigationTargets(html);
});

test('all combinations of optional blocks retain only valid navigation links', () => {
  const blocks = [
    ['context', { context: 'Contexte' }],
    ['context', { objective: ['But'] }],
    ['work-1', { sections: [{ title: 'Travail', bullets: ['Action'] }] }],
    ['results', { results: ['Livré'] }],
    ['limits', { limitsItems: ['Limite'] }],
    ['next-steps', { nextStepsItems: ['Étudier'] }],
    ['stack', { environment: ['JavaScript'] }],
  ];
  for (let mask = 0; mask < 2 ** blocks.length; mask++) {
    const fields = {};
    const expected = new Set();
    blocks.forEach(([id, data], index) => {
      if (mask & (1 << index)) { Object.assign(fields, data); expected.add(id); }
    });
    const html = render(fields);
    for (const id of new Set(blocks.map(([id]) => id))) {
      assert.equal(html.includes('id="' + id + '"'), expected.has(id), `mask ${mask}, ${id}`);
      assert.equal(html.includes('href="#' + id + '"'), expected.has(id), `mask ${mask}, navigation ${id}`);
    }
    assertNavigationTargets(html);
  }
});

test('empty work sections are omitted and remaining sections stay numbered from one', () => {
  const html = render({ sections: [
    { title: 'Titre seul' },
    { title: 'Texte', text: 'Contenu', bullets: [' '] },
    { title: 'Images', media: [null, { src: '' }, { src: 'a.png' }, { src: 'b.png' }, { src: 'c.png' }] },
  ] });
  assert.doesNotMatch(html, /Titre seul|work-3|c\.png|<ul><\/ul>/);
  assert.match(html, /id="work-1"/);
  assert.match(html, /id="work-2"/);
  assert.equal((html.match(/<figure /g) || []).length, 2);
  assert.ok(html.indexOf('a.png') < html.indexOf('b.png'));
  assertNavigationTargets(html);
});

test('environment skips empty groups and falls back to the flat list', () => {
  const fallback = render({ environmentGroups: [{ title: 'Vide', items: [] }], environment: ['Rust'] });
  assert.match(fallback, /id="stack"/);
  assert.match(fallback, /<span>Rust<\/span>/);
  assert.match(fallback, /href="#stack"/);
  assert.doesNotMatch(fallback, /Vide|class="tech-groups"/);
  const grouped = render({ environmentGroups: [null, { title: 'Vide' }, { title: 'Langage', items: ['', 'C++'] }], environment: ['Rust'] });
  assert.match(grouped, /<h3>Langage<\/h3>/);
  assert.match(grouped, /<span>C\+\+<\/span>/);
  assert.match(grouped, /href="#stack"/);
  assert.doesNotMatch(grouped, /Vide|Rust|<span><\/span>/);
});

test('media-only work sections have no empty text column', () => {
  const html = render({ sections: [{ media: [{ src: 'photo.png', alt: 'Photo' }] }] });
  assert.match(html, /class="case-section-media"/);
  assert.doesNotMatch(html, /class="case-section-text"|case-section-body--illustrated|<h2><\/h2>/);
  assertNavigationTargets(html);
});

test('limits accept a summary, items, or both without empty content columns', () => {
  const summary = render({ limits: 'Résumé' });
  assert.match(summary, /outcome-limits--summary-only/);
  assert.doesNotMatch(summary, /class="limits-list"/);
  const items = render({ limitsItems: ['Point'] });
  assert.match(items, /class="limits-list"/);
  assert.doesNotMatch(items, /outcome-limits--summary-only|<p><\/p>/);
  const both = render({ limits: 'Résumé', limitsItems: ['Point'] });
  assert.match(both, /<p>Résumé<\/p>/);
  assert.match(both, /<p>Point<\/p>/);
});

test('next steps accept a summary, items, or both independently of current limits', () => {
  const summary = render({ nextSteps: 'Version à étudier' });
  assert.match(summary, /outcome-next-steps--summary-only/);
  assert.match(summary, /<p>Version à étudier<\/p>/);
  assert.doesNotMatch(summary, /class="next-steps-list"|id="limits"|<p><\/p>/);
  const items = render({ nextStepsItems: [null, ' ', 'Étude caméra'] });
  assert.match(items, /class="next-steps-list"/);
  assert.match(items, /<p>Étude caméra<\/p>/);
  assert.doesNotMatch(items, /outcome-next-steps--summary-only|id="limits"|<p><\/p>/);
  assert.equal((items.match(/class="next-step-item"/g) || []).length, 1);
  const both = render({ nextSteps: 'Version à étudier', nextStepsItems: ['Étude caméra'] });
  assert.match(both, /<p>Version à étudier<\/p>/);
  assert.match(both, /<p>Étude caméra<\/p>/);
  for (const html of [summary, items, both]) {
    assert.match(html, /<h2>Suite envisagée<\/h2>/);
    assert.match(html, /class="toc-label">Suite envisagée<\/span>/);
    assertNavigationTargets(html);
  }
});

test('next-step links appear below the items and escape labels and URLs', () => {
  const html = render({
    nextStepsItems: ['Étudier la transmission'],
    nextStepsLinks: [['<Réducteur>', './project.html?id=cycloidal&ref="v2"']],
  });
  assert.ok(html.indexOf('Étudier la transmission') < html.indexOf('class="project-links"'));
  assert.match(html, /href="\.\/project\.html\?id=cycloidal&amp;ref=&quot;v2&quot;">&lt;Réducteur&gt; →<\/a>/);
  assert.doesNotMatch(html, /<Réducteur>|target="_blank"/);
  assertNavigationTargets(html);
});

test('next-step links can stand alone and invalid entries leave no empty block', () => {
  const html = render({ nextStepsLinks: [['Réducteur', './project.html?id=cycloidal']] });
  assert.match(html, /id="next-steps"/);
  assert.match(html, /href="#next-steps"/);
  assert.doesNotMatch(html, /outcome-next-steps--summary-only|class="next-step-item"/);
  assertNavigationTargets(html);
  for (const nextStepsLinks of [undefined, null, {}, [], [null, {}, [], [' ', 'url'], ['Label', ' ']]]) {
    assert.doesNotMatch(render({ nextStepsLinks }), /id="next-steps"|class="project-links"/);
  }
});

test('next steps appear after current limits and before the technical stack', () => {
  const html = render({
    results: ['Livré'], limits: 'Constat actuel', nextStepsItems: ['À explorer'], environment: ['C++'],
    labels: { nextSteps: ' ' },
  });
  assert.ok(html.indexOf('id="results"') < html.indexOf('id="limits"'));
  assert.ok(html.indexOf('id="limits"') < html.indexOf('id="next-steps"'));
  assert.ok(html.indexOf('id="next-steps"') < html.indexOf('id="stack"'));
  assert.match(html, /<h2>Suite envisagée<\/h2>/);
  assertNavigationTargets(html);
});

test('technical stack is the last navigation item and supports label fallback', () => {
  const html = render({
    limits: 'Constat', nextStepsItems: ['À explorer'], environment: ['C++'], labels: { environment: ' ' },
  });
  const navigation = html.match(/<aside class="case-toc"[\s\S]*?<\/aside>/)[0];
  const targets = [...navigation.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(targets, ['top', 'limits', 'next-steps', 'stack']);
  assert.match(navigation, /class="toc-label">Stack &amp; outils<\/span>/);
  assertNavigationTargets(html);
});

test('scroll spy selects a short stack at page bottom and updates when scrolling back', () => {
  const positions = { top: 0, limits: 900, stack: 1600 };
  const active = new Set();
  const handlers = {};
  const frames = [];
  const links = Object.keys(positions).map(target => ({
    dataset: { target },
    classList: { add: () => active.add(target), remove: () => active.delete(target) },
  }));
  const windowState = {
    PORTFOLIO: { projects: [{ id: 'fixture', title: 'Test', sections: [], limits: 'Constat', environment: ['C++'] }] },
    innerHeight: 900,
    scrollY: 0,
    addEventListener: (name, handler) => { handlers[name] = handler; },
  };
  const root = { innerHTML: '' };
  const documentElement = { scrollHeight: 2000 };
  vm.runInNewContext(source, {
    window: windowState,
    location: { search: '?id=fixture' },
    URLSearchParams,
    requestAnimationFrame: callback => frames.push(callback),
    document: {
      body: { dataset: { page: 'project' } },
      documentElement,
      querySelector: () => ({ querySelectorAll: () => links }),
      getElementById: id => id === 'project-root' ? root : {
        getBoundingClientRect: () => ({ top: positions[id] - windowState.scrollY }),
      },
    },
  });
  const scrollTo = position => {
    windowState.scrollY = position;
    handlers.scroll();
    while (frames.length) frames.shift()();
  };
  assert.deepEqual([...active], ['top']);
  scrollTo(1050);
  assert.deepEqual([...active], ['limits']);
  scrollTo(1100);
  assert.ok(positions.stack - windowState.scrollY > 190);
  assert.deepEqual([...active], ['stack']);
  scrollTo(1050);
  assert.deepEqual([...active], ['limits']);
  scrollTo(1100);
  windowState.innerHeight = 600;
  handlers.resize();
  assert.deepEqual([...active], ['limits']);
  windowState.scrollY = 0;
  documentElement.scrollHeight = windowState.innerHeight;
  handlers.resize();
  assert.deepEqual([...active], ['top']);
});

test('homepage navigation stays hidden in the intro and tracks all five sections', () => {
  const positions = { projets: 1000, systemes: 2200, mecanique: 3400, experience: 4600, approche: 5900 };
  const active = new Set();
  const handlers = {};
  const frames = [];
  const links = Object.keys(positions).map(target => ({
    dataset: { target },
    classList: { add: () => active.add(target), remove: () => active.delete(target) },
  }));
  const toc = { hidden: true, querySelectorAll: () => links };
  let html = '';
  const main = { insertAdjacentHTML: (_, content) => { html = content; } };
  const windowState = {
    PORTFOLIO: { projects: [] }, innerHeight: 900, scrollY: 0,
    addEventListener: (name, handler) => { handlers[name] = handler; },
  };
  vm.runInNewContext(source, {
    window: windowState,
    requestAnimationFrame: callback => frames.push(callback),
    document: {
      body: { dataset: { page: 'home' } },
      documentElement: { scrollHeight: 6600 },
      querySelector: selector => selector === 'main' ? main : selector === '.case-toc' ? toc : null,
      getElementById: id => id in positions ? {
        getBoundingClientRect: () => ({ top: positions[id] - windowState.scrollY }),
      } : null,
    },
  });
  const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(targets, Object.keys(positions));
  for (const target of targets) assert.ok(index.includes('id="' + target + '"'));
  assert.match(html, /aria-label="Navigation du portfolio" hidden/);
  assert.equal(toc.hidden, true);
  const scrollTo = position => {
    windowState.scrollY = position;
    handlers.scroll();
    while (frames.length) frames.shift()();
  };
  scrollTo(809);
  assert.equal(toc.hidden, true);
  for (const [target, position] of Object.entries(positions)) {
    scrollTo(Math.min(position - 190, 5700));
    assert.equal(toc.hidden, false);
    assert.deepEqual([...active], [target]);
  }
  scrollTo(810);
  positions.projets = 1200;
  handlers.resize();
  assert.equal(toc.hidden, true);
  scrollTo(0);
  assert.equal(toc.hidden, true);
});
