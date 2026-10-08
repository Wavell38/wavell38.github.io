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
    results: ['Livré'], limits: 'Limite', environment: ['JavaScript'],
    labels: {
      context: '<Contexte>', objectives: '<Objectifs>', work: '<Travaux>',
      results: '<Résultats>', limits: '<Limites>', environment: '<Outils>',
    },
    resultsIntro: '<script>alert(1)</script>',
  });
  for (const label of ['Contexte', 'Objectifs', 'Travaux', 'Résultats', 'Limites', 'Outils']) {
    assert.ok(html.includes('&lt;' + label + '&gt;'));
    assert.ok(!html.includes('<' + label + '>'));
  }
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /class="toc-label">&lt;Résultats&gt;/);
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
    environment: [''], environmentGroups: [null, { title: 'Vide', items: [' '] }],
    sections: [null, {}, { title: 'Titre seul', text: ' ', bullets: [''], media: [{ src: ' ' }] }],
    media: { lead: { src: ' ' } },
    labels: { objectives: 'Personnalisé' }, resultsIntro: 'Ne suffit pas à créer un bloc',
  }]) {
    const html = render(fields);
    assert.doesNotMatch(html, /class="case-study"|class="case-toc"|id="context"|id="results"|id="limits"|id="stack"/);
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

test('all combinations of optional blocks retain only valid navigation links', () => {
  const blocks = [
    ['context', { context: 'Contexte' }],
    ['context', { objective: ['But'] }],
    ['work-1', { sections: [{ title: 'Travail', bullets: ['Action'] }] }],
    ['results', { results: ['Livré'] }],
    ['limits', { limitsItems: ['Limite'] }],
    ['stack', { environment: ['JavaScript'] }],
  ];
  for (let mask = 0; mask < 64; mask++) {
    const fields = {};
    const expected = new Set();
    blocks.forEach(([id, data], index) => {
      if (mask & (1 << index)) { Object.assign(fields, data); expected.add(id); }
    });
    const html = render(fields);
    for (const id of new Set(blocks.map(([id]) => id))) {
      assert.equal(html.includes('id="' + id + '"'), expected.has(id), `mask ${mask}, ${id}`);
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
  assert.doesNotMatch(fallback, /Vide|class="tech-groups"/);
  const grouped = render({ environmentGroups: [null, { title: 'Vide' }, { title: 'Langage', items: ['', 'C++'] }], environment: ['Rust'] });
  assert.match(grouped, /<h3>Langage<\/h3>/);
  assert.match(grouped, /<span>C\+\+<\/span>/);
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
