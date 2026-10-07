(() => {
  const data = window.PORTFOLIO?.projects || [];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  const tags = arr => '<div class="tags">' + (arr||[]).map(t => '<span class="tag">'+esc(t)+'</span>').join('') + '</div>';
  const list = a => '<ul>'+(a||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';

  function card(p, featured=false){
    return '<a class="card '+(featured?'featured':'')+'" href="./project.html?id='+encodeURIComponent(p.id)+'">'+
      '<div class="card-meta"><span>'+esc(p.kind)+'</span><span>'+esc(p.status)+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p>'+tags(p.tags)+
      '<div class="card-link">Voir le projet →</div></a>';
  }

  function renderHome(){
    const set = (id, items, featured=false) => {
      const el = document.getElementById(id); if(!el) return;
      el.innerHTML = items.map(p=>card(p,featured)).join('');
    };
    set('featured-grid', data.filter(p=>p.group==='featured').sort((a,b)=>(a.order||0)-(b.order||0)), true);
    set('systems-grid', data.filter(p=>p.group==='systems'));
    set('mechanical-grid', data.filter(p=>p.group==='mechanical'));
    set('experience-grid', data.filter(p=>p.group==='experience'));
  }

  function renderStandard(p, root){
    const factHtml=(p.facts||[]).map((f,i)=>'<div><span>'+['État','Repère','Point clé'][i%3]+'</span><strong>'+esc(f)+'</strong></div>').join('');
    const links = (p.links||[]).length ? '<div class="project-links">'+p.links.map(l=>'<a class="btn secondary" href="'+esc(l[1])+'" target="_blank" rel="noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div>' : '';
    root.innerHTML =
      '<a class="project-back" href="./index.html#projets">← Retour aux projets</a>'+
      '<section class="project-hero"><p class="eyebrow">'+esc(p.kind)+' · '+esc(p.period)+'</p><h1>'+esc(p.title)+'</h1><p class="project-summary">'+esc(p.subtitle)+'</p>'+tags(p.tags)+
      '<div class="project-facts">'+factHtml+'</div>'+links+'</section>'+
      '<div class="project-content">'+
      '<section class="detail-section"><h2>Contexte</h2><div><p>'+esc(p.context)+'</p></div></section>'+
      '<section class="detail-section"><h2>Travaux réalisés</h2><div>'+list(p.work||[])+'</div></section>'+
      '<section class="detail-section"><h2>Résultats</h2><div>'+list(p.results||[])+'</div></section>'+
      '<section class="detail-section"><h2>Limites / état</h2><div><p>'+esc(p.limits)+'</p></div></section>'+
      '</div>';
  }

  function renderCaseStudy(p, root){
    const factHtml=(p.facts||[]).map((f,i)=>'<div><span>'+['État','Repère','Point clé'][i]+'</span><strong>'+esc(f)+'</strong></div>').join('');
    const arch=(p.architecture||[]).map((x,i)=>'<div class="arch-node"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(x)+'</strong></div>').join('<div class="arch-arrow">→</div>');
    const sections=(p.sections||[]).map((s,i)=>
      '<section class="case-section" id="section-'+(i+1)+'">'+
      '<div class="case-index">'+String(i+1).padStart(2,'0')+'</div>'+
      '<div class="case-copy"><h2>'+esc(s.title)+'</h2>'+(s.text?'<p class="case-lede">'+esc(s.text)+'</p>':'')+list(s.bullets||[])+'</div></section>'
    ).join('');
    const env=(p.environment||[]).map(x=>'<span>'+esc(x)+'</span>').join('');
    const links=(p.links||[]).length ? '<div class="project-links">'+p.links.map(l=>'<a class="btn secondary" href="'+esc(l[1])+'" target="_blank" rel="noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div>' : '';

    root.innerHTML =
      '<a class="project-back" href="./index.html#projets">← Retour aux projets</a>'+
      '<section class="project-hero case-hero">'+
        '<div class="case-kicker"><span>'+esc(p.kind)+'</span><span>'+esc(p.period)+'</span><span class="status">'+esc(p.status)+'</span></div>'+
        '<h1>'+esc(p.title)+'</h1>'+
        '<p class="project-summary">'+esc(p.subtitle)+'</p>'+
        '<p class="project-role">'+esc(p.role||'')+'</p>'+
        tags(p.tags)+
        '<div class="project-facts">'+factHtml+'</div>'+links+
      '</section>'+
      '<div class="case-study">'+
        '<section class="case-overview">'+
          '<div><p class="eyebrow">Contexte</p><p class="case-intro">'+esc(p.context)+'</p></div>'+
          '<div class="objective-box"><p class="eyebrow">Objectif V1</p>'+list(p.objective||[])+'</div>'+
        '</section>'+
        '<section class="architecture-strip"><p class="eyebrow">Chaîne système</p><div class="arch-flow">'+arch+'</div></section>'+
        '<div class="case-sections">'+sections+'</div>'+
        '<section class="evidence-section">'+
          '<div class="evidence-card validated"><p class="eyebrow">Établi / validé dans la V1</p>'+list(p.validated||[])+'</div>'+
          '<div class="evidence-card experimental"><p class="eyebrow">Encore expérimental / différé</p>'+list(p.experimental||[])+'</div>'+
        '</section>'+
        '<section class="case-section results-section"><div class="case-index">R</div><div class="case-copy"><h2>Résultats</h2>'+list(p.results||[])+'</div></section>'+
        '<section class="case-section"><div class="case-index">L</div><div class="case-copy"><h2>Limites / état actuel</h2><p class="case-lede">'+esc(p.limits)+'</p></div></section>'+
        '<section class="tech-environment"><div><p class="eyebrow">Environnement technique</p><h2>Stack & outils</h2></div><div class="tech-cloud">'+env+'</div></section>'+
      '</div>';
  }

  function renderProject(){
    const root = document.getElementById('project-root'); if(!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = data.find(x=>x.id===id);
    if(!p){ root.innerHTML='<section class="project-hero"><p class="eyebrow">404</p><h1>Projet introuvable</h1><p class="project-summary">Revenez à la page principale du portfolio.</p><a class="btn secondary" href="./index.html">← Retour</a></section>'; return; }
    document.title = p.title + ' — Vincent Grange';
    if(p.sections) renderCaseStudy(p,root); else renderStandard(p,root);
  }

  if(document.body.dataset.page==='home') renderHome();
  if(document.body.dataset.page==='project') renderProject();
})();