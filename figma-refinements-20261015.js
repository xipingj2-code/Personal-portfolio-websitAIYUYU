(()=>{
 'use strict';
 const hero=document.querySelector('.hero-copy'),wordmark=document.querySelector('.nav-wordmark');
 if(wordmark)wordmark.textContent='AIYUYU';
 const heading=hero?.querySelector('h1');
 if(!hero||!heading)return;
 heading.className='hero-english-title';
 heading.setAttribute('aria-label','DESIGN IDEAS MAKE VISIBLE WORKS');
 heading.replaceChildren(...['DESIGN IDEAS','MAKE','VISIBLE WORKS'].map(copy=>{
   const line=document.createElement('span');line.className='hero-title-line';line.setAttribute('aria-hidden','true');
   for(const letter of copy){const char=document.createElement('span');char.className='hero-title-char';char.textContent=letter===' '?'\u00a0':letter;line.append(char)}return line;
 }));
 hero.querySelector('.contact-inline')?.querySelector('br')?.remove();
 const experience=[...document.querySelectorAll('main>section')].find(s=>s.querySelector('h2')?.textContent.trim()==='工作经历');
 experience?.classList.add('experience-panel');
 // User-supplied copy and wrapping revisions from the nine section screenshots.
 const productTitle=document.querySelector('#digital .case-title h3');if(productTitle)productTitle.textContent='A / 产品网页：先吸引，再解释';
 const ecommerceTitle=document.querySelectorAll('#digital .case-title h3')[1];if(ecommerceTitle)ecommerceTitle.textContent=ecommerceTitle.textContent.replace(/。\s*$/,'');
 const ipTitle=document.querySelector('#ip .ip-lead h2');if(ipTitle)ipTitle.textContent='把今天，交给夜晚处理';
 const filmTag=document.querySelector('#film .film-feature .tagline');if(filmTag)filmTag.textContent='原创短片 / 国风传统水墨动画风格';
 const processCopy=['TVC脚本+分镜图+视频生成+人物配音+音效+背景音乐+后期剪辑','故事脚本+人物设定+场景构建+故事分镜图+打斗分镜设计+后期剪辑'];
 document.querySelectorAll('#film .film-card').forEach((card,i)=>{
   const description=card.querySelector(':scope>p');
   if(description){const process=document.createElement('p');process.className='film-production';process.textContent=processCopy[i];description.after(process)}
   const caption=card.querySelector('.watch-qr figcaption');if(caption)caption.replaceChildren(document.createTextNode('微信扫一扫'),document.createElement('br'),document.createTextNode('观看完整制作流程'));
 });
 const cyberTitle=document.querySelectorAll('#film .film-card h3')[1];if(cyberTitle)cyberTitle.textContent='《赛博长安 · 闪送刀客》';
 const brandTitle=document.querySelector('#brand .brand-entry h3');if(brandTitle)brandTitle.textContent='从一个角色，到完整品牌体验';
 const brandDescription=document.querySelector('#brand .brand-entry p:not(.brand-open-hint)');
 if(brandDescription)brandDescription.replaceChildren(document.createTextNode('查看企业IP、发布会传播、数字页面与周边物料。'),document.createElement('br'),document.createTextNode('完整作品在弹窗内连续浏览。'));
 const closing=document.querySelector('#contact h2');if(closing)closing.replaceChildren(document.createTextNode('下一件作品，'),document.createElement('br'),document.createTextNode('期待与你一起完成'));
 // As in the supplied 6.617s reference: a quick left-to-right title reveal,
 // followed by the lower information group. Never hide content in the stylesheet.
 const gsap=window.gsap;if(!gsap)return;
 const mm=gsap.matchMedia();
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const greeting=hero.querySelector('.hero-greeting'),lines=hero.querySelectorAll('.hero-title-line');
   const details=[hero.querySelector('.hero-person'),hero.querySelector('.scope'),hero.querySelector('.button'),hero.querySelector('.contact-inline')].filter(Boolean);
   const targets=[greeting,...hero.querySelectorAll('.hero-title-char'),...details];
   const tl=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>{gsap.set(targets,{clearProps:'opacity,visibility,transform'});hero.dataset.entrance='complete'}});
   hero.dataset.entrance='running';
   tl.addLabel('hello',0).from(greeting,{autoAlpha:0,y:12,duration:.38},'hello');
   tl.addLabel('title',.18);
   [0,.44,.65].forEach((offset,i)=>tl.from(lines[i].children,{autoAlpha:0,y:8,duration:.18,stagger:.045},'title+='+offset));
   tl.addLabel('details',1.3).from(details,{autoAlpha:0,y:16,duration:.6,stagger:.10},'details');
   const finish=()=>{tl.progress(1);gsap.set(targets,{clearProps:'opacity,visibility,transform'});hero.dataset.entrance='complete'};
   const visibility=()=>{if(document.hidden)finish()};document.addEventListener('visibilitychange',visibility);
   return()=>{document.removeEventListener('visibilitychange',visibility);hero.dataset.entrance='complete'};
 },hero);
})();
