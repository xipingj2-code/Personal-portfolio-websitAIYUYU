const directory=document.querySelector('#index');
const cards=[...directory.querySelectorAll('.category')];
const controls=document.createElement('div');controls.className='directory-controls';controls.setAttribute('aria-label','切换作品类别');
const hint=document.createElement('p');hint.className='directory-hint';hint.textContent='悬停或选择编号展开卡片 · 点击卡片进入案例';
directory.append(controls,hint);
let selected=2;
const mobile=matchMedia('(max-width:800px)');
function selectCard(index,scroll=false){
 selected=index;
 cards.forEach((card,i)=>{
  const d=i-index;
  card.style.setProperty('--x',`${(i-2)*166+(2-index)*20}px`);
  card.style.setProperty('--y',`${Math.abs(d)*24}px`);
  card.style.setProperty('--r',`${Math.max(-25,Math.min(25,d*11))}deg`);
  card.style.setProperty('--z',String(10-Math.abs(d)));
  card.classList.toggle('active',i===index);
 });
 [...controls.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
 if(scroll&&mobile.matches){const fan=directory.querySelector('.fan');fan.scrollTo({left:cards[index].offsetLeft-fan.offsetLeft-(fan.clientWidth-cards[index].offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}
}
cards.forEach((card,i)=>{
 const footer=document.createElement('span');footer.className='ticket-footer';footer.textContent='AIYUYU / DESIGN ARCHIVE ↗';card.append(footer);
 card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')selectCard(i)});
 card.addEventListener('focus',()=>selectCard(i));
 const button=document.createElement('button');button.type='button';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',`展开${card.querySelector('h3').textContent}`);
 button.addEventListener('click',()=>selectCard(i,true));controls.append(button);
});
controls.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=(selected+(e.key==='ArrowRight'?1:-1)+cards.length)%cards.length;selectCard(next,true);controls.children[next].focus()}});
selectCard(2);
const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});
