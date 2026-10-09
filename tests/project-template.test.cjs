const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function render(fields = {}) {
  const root = { innerHTML: '' };
  const project = {
    id: 'fixture', title: 'Projet de test', kind: 'Projet', period: '2026', status: 'En cours',
    sections: [], ...fields,
  };
  vm.runInNewContext(source, {
    window: { PORTFOLIO: { projects: [project] } },
    location: { search: '?id=fixture' },
    URLSearchParams,
    document: {
      body: { dataset: { page: 'project' } },
      getElementById: id => id === 'project-root' ? root : null,
      querySelector: () => null,
    },
  });
  return root.innerHTML;
}

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
  assert.match(html, /href="drawing.png\?x=&quot;y&quot;" target="_blank" rel="noreferrer"/);
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
