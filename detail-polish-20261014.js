(()=>{
 const nav=document.querySelector('.navlinks');const links=[...nav.querySelectorAll('a')];const pill=document.createElement('span');pill.className='nav-location-pill';pill.setAttribute('aria-hidden','true');nav.prepend(pill);
 const anchors=links.map(a=>({a,section:document.querySelector(a.getAttribute('href'))})).filter(x=>x.section);
 let scheduled=false;
 function update(){scheduled=false;let current=null;const line=document.querySelector('.nav').getBoundingClientRect().bottom+100;
  for(const x of [...anchors].sort((a,b)=>a.section.offsetTop-b.section.offsetTop))if(x.section.getBoundingClientRect().top<=line)current=x;
  links.forEach(a=>{if(current?.a===a)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  if(!current||current.a.classList.contains('button')){pill.style.opacity=0;return}const r=current.a.getBoundingClientRect(),n=nav.getBoundingClientRect();pill.style.width=`${r.width}px`;pill.style.height=`${r.height}px`;pill.style.transform=`translate(${r.left-n.left}px,${r.top-n.top}px)`;pill.style.opacity=1;
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.fonts.ready.then(update);update();
 // Keep exact labels; decorate only existing arrow glyphs, not copy/phone status buttons.
 document.querySelectorAll('a.button,#open-brand').forEach(button=>{for(const node of [...button.childNodes]){if(node.nodeType===3&&/[↗]/.test(node.textContent)){const text=node.textContent;const frag=document.createDocumentFragment();for(const [i,part]of text.split('↗').entries()){if(i){const arrow=document.createElement('span');arrow.className='button-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';frag.append(arrow)}frag.append(document.createTextNode(part))}node.replaceWith(frag)}}});
 // Content is always visible; first-time entrance uses animation only, never a hidden CSS state.
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');const running=new Set();
 const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;observer.unobserve(e.target);if(!reduce.matches){const a=e.target.animate([{opacity:.65,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'});running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a))}}},{threshold:.3});
 document.querySelectorAll('main>.chapter>.sectionhead').forEach(e=>observer.observe(e));reduce.addEventListener('change',()=>{if(reduce.matches)running.forEach(a=>a.cancel())});
})();
