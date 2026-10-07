(() => {
  const data = window.PORTFOLIO?.projects || [];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  const tags = arr => '<div class="tags">' + (arr||[]).map(t => '<span class="tag">'+esc(t)+'</span>').join('') + '</div>';

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

  function renderProject(){
    const root = document.getElementById('project-root'); if(!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = data.find(x=>x.id===id);
    if(!p){ root.innerHTML='<section class="project-hero"><p class="eyebrow">404</p><h1>Projet introuvable</h1><p class="project-summary">Revenez à la page principale du portfolio.</p><a class="btn secondary" href="./index.html">← Retour</a></section>'; return; }
    document.title = p.title + ' — Vincent Grange';
    const factHtml=(p.facts||[]).map((f,i)=>'<div><span>'+['État','Repère','Point clé'][i%3]+'</span><strong>'+esc(f)+'</strong></div>').join('');
    const list = a => '<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
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

  if(document.body.dataset.page==='home') renderHome();
  if(document.body.dataset.page==='project') renderProject();
})();