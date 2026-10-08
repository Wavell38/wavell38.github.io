(() => {
  const projects = window.PORTFOLIO?.projects || [];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  const list = items => '<ul>'+(items||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';

  function techIcon(name){
    const n=String(name||'').toLowerCase();
    if(n.includes('ros')) return '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="1.4"/><circle cx="12" cy="6" r="1.4"/><circle cx="18" cy="6" r="1.4"/><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/><circle cx="6" cy="18" r="1.4"/><circle cx="12" cy="18" r="1.4"/><circle cx="18" cy="18" r="1.4"/></svg>';
    if(n.includes('c++')) return '<svg viewBox="0 0 24 24"><path d="M8 7.2a5.8 5.8 0 1 0 0 9.6"/><path d="M14 9v6M11 12h6M20 9v6M17 12h6"/></svg>';
    if(n.includes('typescript')) return '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 9h6M10 9v8M15 16.5c.7.5 1.5.7 2.2.7 1.1 0 1.8-.5 1.8-1.3 0-2-3.7-1-3.7-3.2 0-.9.8-1.6 2.1-1.6.7 0 1.3.2 1.8.5"/></svg>';
    if(n.includes('vision')) return '<svg viewBox="0 0 24 24"><path d="M2.8 12s3.5-5 9.2-5 9.2 5 9.2 5-3.5 5-9.2 5-9.2-5-9.2-5z"/><circle cx="12" cy="12" r="2.4"/></svg>';
    if(n.includes('freecad')) return '<svg viewBox="0 0 24 24"><path d="M12 2.8 20 7v10l-8 4.2L4 17V7z"/><path d="m4 7 8 4 8-4M12 11v10"/></svg>';
    return '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg>';
  }

  function tags(arr, rich=false){
    return '<div class="tags '+(rich?'tags-rich':'')+'">'+(arr||[]).map(t =>
      '<span class="tag">'+(rich?'<span class="tag-icon">'+techIcon(t)+'</span>':'')+'<span>'+esc(t)+'</span></span>'
    ).join('')+'</div>';
  }

  function card(p, featured=false){
    return '<a class="card '+(featured?'featured':'')+'" href="./project.html?id='+encodeURIComponent(p.id)+'">'+
      '<div class="card-meta"><span>'+esc(p.kind)+'</span><span>'+esc(p.status)+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p>'+tags(p.tags)+
      '<div class="card-link">Voir le projet →</div></a>';
  }

  function renderHome(){
    const set=(id,items,featured=false)=>{
      const el=document.getElementById(id); if(!el) return;
      el.innerHTML=items.map(p=>card(p,featured)).join('');
    };
    set('featured-grid',projects.filter(p=>p.group==='featured').sort((a,b)=>(a.order||0)-(b.order||0)),true);
    set('systems-grid',projects.filter(p=>p.group==='systems'));
    set('mechanical-grid',projects.filter(p=>p.group==='mechanical'));
    set('experience-grid',projects.filter(p=>p.group==='experience'));
  }

  function renderStandard(p,root){
    const factHtml=(p.facts||[]).map((f,i)=>'<div><span>'+['État','Repère','Point clé'][i%3]+'</span><strong>'+esc(f)+'</strong></div>').join('');
    const links=(p.links||[]).length?'<div class="project-links">'+p.links.map(l=>'<a class="btn secondary" href="'+esc(l[1])+'" target="_blank" rel="noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div>':'';
    root.innerHTML=
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

  function projectTitle(p){
    return p.id==='cards-analyzer' ? 'Cards <span class="title-accent">Analyzer</span>' : esc(p.title);
  }

  function archIcon(i){
    const icons=[
      '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 17h6"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 11H6z"/><path d="M8 8V5h8v3"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4"/><path d="M8.5 14.5C6.9 13.4 6 11.6 6 9.5a6 6 0 0 1 12 0c0 2.1-.9 3.9-2.5 5"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M8 7l1.5-3h5L16 7"/></svg>',
      '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></svg>',
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></svg>',
      '<svg viewBox="0 0 24 24"><path d="M12 3l2 3 4-.3-.3 4 3 2-3 2 .3 4-4-.3-2 3-2-3-4 .3.3-4-3-2 3-2-.3-4 4 .3z"/><circle cx="12" cy="12" r="2.5"/></svg>',
      '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8M12 18v4"/></svg>'
    ];
    return icons[i]||icons[0];
  }

  function tocHtml(){
    const items=[
      ['Intro','top'],
      ['Contexte','context'],
      ['Chaîne','architecture'],
      ['Travaux','work-1'],
      ['Validation','validation'],
      ['Résultats','results'],
      ['Limites','limits']
    ];
    return '<aside class="case-toc" aria-label="Navigation du projet"><div class="toc-line"></div>'+
      items.map(([label,target])=>'<a class="toc-link" href="#'+target+'" data-target="'+target+'"><span class="toc-label">'+label+'</span><span class="toc-dot"></span></a>').join('')+
      '</aside>';
  }

  function setupScrollSpy(){
    const toc=document.querySelector('.case-toc'); if(!toc) return;
    const links=[...toc.querySelectorAll('.toc-link')];
    const entries=links.map(link=>({link,el:document.getElementById(link.dataset.target)})).filter(x=>x.el);
    let ticking=false;
    const update=()=>{
      ticking=false;
      const marker=190;
      let active=entries[0];
      for(const entry of entries){
        if(entry.el.getBoundingClientRect().top<=marker) active=entry; else break;
      }
      links.forEach(l=>l.classList.remove('active'));
      if(active) active.link.classList.add('active');
    };
    window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
    window.addEventListener('resize',update);
    update();
  }

  function setupArchitectureFlow(){
    const flow=document.querySelector('.arch-flow');
    if(!flow) return;
    const nodes=[...flow.querySelectorAll('.arch-node')];
    const update=()=>{
      nodes.forEach(n=>n.classList.remove('arch-next','arch-wrap-down'));
      for(let i=0;i<nodes.length-1;i++){
        const current=nodes[i];
        const next=nodes[i+1];
        if(next.offsetTop>current.offsetTop+4) current.classList.add('arch-wrap-down');
        else current.classList.add('arch-next');
      }
    };
    requestAnimationFrame(update);
    window.addEventListener('resize',update,{passive:true});
    if('ResizeObserver' in window) new ResizeObserver(update).observe(flow);
  }

  function renderEnvironment(p){
    if(p.environmentGroups?.length){
      return '<div class="tech-groups">'+p.environmentGroups.map(group=>
        '<section class="tech-group"><h3>'+esc(group.title)+'</h3><div class="tech-cloud">'+
        group.items.map(x=>'<span>'+esc(x)+'</span>').join('')+
        '</div></section>'
      ).join('')+'</div>';
    }
    return '<div class="tech-cloud">'+(p.environment||[]).map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>';
  }

  function renderCaseStudy(p,root){
    const factHtml=(p.facts||[]).map((f,i)=>'<div><span>'+['État','Repère','Point clé'][i]+'</span><strong>'+esc(f)+'</strong></div>').join('');
    const tones=['slate','slate','amber','violet','blue','green','purple','cyan'];
    const arch=(p.architecture||[]).map((x,i)=>
      '<div class="arch-node arch-'+tones[i%tones.length]+'"><div class="arch-icon">'+archIcon(i)+'</div><strong>'+esc(x)+'</strong></div>'
    ).join('');
    const sections=(p.sections||[]).map((s,i)=>
      '<section class="case-section" id="work-'+(i+1)+'"><div class="case-index"><span>Travaux réalisés</span>'+String(i+1).padStart(2,'0')+'</div>'+
      '<div class="case-copy"><h2>'+esc(s.title)+'</h2>'+(s.text?'<p class="case-lede">'+esc(s.text)+'</p>':'')+list(s.bullets||[])+'</div></section>'
    ).join('');
    const links=(p.links||[]).length?'<div class="project-links">'+p.links.map(l=>'<a class="btn secondary" href="'+esc(l[1])+'" target="_blank" rel="noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div>':'';

    root.innerHTML=
      tocHtml()+
      '<a class="project-back" href="./index.html#projets">← Retour aux projets</a>'+
      '<section class="project-hero case-hero" id="top">'+
        '<div class="case-kicker"><span>'+esc(p.kind)+'</span><span>'+esc(p.period)+'</span><span class="status">'+esc(p.status)+'</span></div>'+
        '<h1>'+projectTitle(p)+'</h1>'+
        '<p class="project-summary">'+esc(p.subtitle)+'</p>'+
        '<p class="project-role">'+esc(p.role||'')+'</p>'+
        tags(p.tags,true)+
        '<div class="project-facts">'+factHtml+'</div>'+links+
      '</section>'+
      '<div class="case-study">'+
        '<section class="case-overview" id="context">'+
          '<div><p class="eyebrow">Contexte</p><p class="case-intro">'+esc(p.context)+'</p></div>'+
          '<div class="objective-box"><p class="eyebrow">Objectif V1</p>'+list(p.objective||[])+'</div>'+
        '</section>'+
        '<section class="architecture-strip" id="architecture"><p class="eyebrow">Chaîne système</p><div class="arch-flow">'+arch+'</div></section>'+
        '<div class="case-sections">'+sections+'</div>'+
        '<section class="evidence-section" id="validation">'+
          '<div class="evidence-card validated"><p class="eyebrow">Établi / validé dans la V1</p>'+list(p.validated||[])+'</div>'+
          '<div class="evidence-card experimental"><p class="eyebrow">Encore expérimental / différé</p>'+list(p.experimental||[])+'</div>'+
        '</section>'+
        '<section class="case-section results-section" id="results"><div class="case-index"><span>Bilan</span>R</div><div class="case-copy"><h2>Résultats</h2>'+list(p.results||[])+'</div></section>'+
        '<section class="case-section" id="limits"><div class="case-index"><span>Bilan</span>L</div><div class="case-copy"><h2>Limites / état actuel</h2><p class="case-lede">'+esc(p.limits)+'</p></div></section>'+
        '<section class="tech-environment" id="stack"><div><p class="eyebrow">Environnement technique</p><h2>Stack & outils</h2></div>'+renderEnvironment(p)+'</section>'+
      '</div>';
    setupScrollSpy();
    setupArchitectureFlow();
  }

  function renderProject(){
    const root=document.getElementById('project-root'); if(!root) return;
    const id=new URLSearchParams(location.search).get('id');
    const p=projects.find(x=>x.id===id);
    if(!p){root.innerHTML='<section class="project-hero"><p class="eyebrow">404</p><h1>Projet introuvable</h1><p class="project-summary">Revenez à la page principale du portfolio.</p><a class="btn secondary" href="./index.html">← Retour</a></section>';return;}
    document.title=p.title+' — Vincent Grange';
    if(p.sections) renderCaseStudy(p,root); else renderStandard(p,root);
  }

  if(document.body.dataset.page==='home') renderHome();
  if(document.body.dataset.page==='project') renderProject();
})();