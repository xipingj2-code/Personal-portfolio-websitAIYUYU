// Original lightweight vanilla adaptation inspired by the user's React Bits reference.
// Not the React Bits simulation or a copy of its component source.
(()=>{
 const v=document.querySelector('#hero-video');
 const oldButton=document.querySelector('#video-toggle');
 const button=oldButton.cloneNode(true);oldButton.replaceWith(button); // Remove obsolete V16 listener.
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 v.pause();v.removeAttribute('autoplay');v.loop=false;v.muted=true;v.defaultMuted=true;v.playsInline=true;
 v.poster=window.portfolioMedia.poster('assets/hero-still.png');v.preload='none';
 const connection=navigator.connection;
 const limited=connection?.saveData||/^(slow-)?2g$/.test(connection?.effectiveType||'');
 const videoSource=matchMedia('(max-width:800px)').matches?'assets/hero-mobile-20261016.mp4':'assets/hero-web-20261016.mp4';
 let userPaused=reduce.matches||limited,finished=false,inView=true;
 function label(){button.textContent=finished?'重播 ↻':v.paused?'播放 ▶':'暂停 Ⅱ';button.setAttribute('aria-label',finished?'重播首屏视频':v.paused?'播放首屏视频':'暂停首屏视频')}
 async function play(){if(!v.getAttribute('src')){v.src=videoSource;v.load()}try{await v.play()}catch(e){/* Keep the poster and visible play control if autoplay is blocked. */}label()}
 button.addEventListener('click',()=>{if(v.paused||finished){if(finished){v.currentTime=0;finished=false}userPaused=false;play()}else{userPaused=true;v.pause();label()}});
 v.addEventListener('ended',()=>{finished=true;label()});v.addEventListener('play',label);v.addEventListener('pause',label);v.addEventListener('error',()=>{v.style.visibility='hidden';button.textContent='视频暂不可用';button.disabled=true});
 const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView)v.pause();else if(!userPaused&&!finished&&!document.hidden)play()},{threshold:.12});observer.observe(v);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)v.pause();else if(inView&&!userPaused&&!finished)play()});
 reduce.addEventListener('change',()=>{if(reduce.matches){userPaused=true;v.pause()}label()});label();

 const config=Object.freeze({glow:.3,intensity:.6,followSpeed:.25,linger:.8,style:'soft-liquid-ink'});
 const canvas=document.createElement('canvas');canvas.className='glow-canvas';canvas.setAttribute('aria-hidden','true');canvas.dataset.config=JSON.stringify(config);document.body.append(canvas);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const control=document.createElement('button');control.className='glow-control';control.type='button';document.body.append(control);
 const fine=matchMedia('(hover:hover) and (pointer:fine)');let enabled=true;
 try{enabled=sessionStorage.getItem('aiyuyu-glow')!=='off'}catch(e){}
 let raf=0,points=[],bursts=[],blobs=[],x=0,y=0,tx=0,ty=0,initialized=false,lastMove=0,lastFrame=0,dpr=1,dark=false,emitted=0;
 const palette=[[145,102,230],[90,163,225],[198,119,203],[93,181,203]];
 const sprites=palette.map(rgb=>{const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d'),rad=g.createRadialGradient(48,48,0,48,48,48);rad.addColorStop(0,`rgba(${rgb},.85)`);rad.addColorStop(.34,`rgba(${rgb},.5)`);rad.addColorStop(.72,`rgba(${rgb},.13)`);rad.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=rad;g.fillRect(0,0,96,96);return c});
 function ink(px,py,dx,dy,now,burst=false){const n=emitted++;blobs.push({x:px,y:py,vx:dx*.05,vy:dy*.05,r:burst?27:Math.min(38,19+Math.hypot(dx,dy)*.45),phase:n*1.31,angle:Math.atan2(dy,dx),color:n%palette.length,time:now,life:760+(n%4)*35});if(blobs.length>100)blobs.shift()}
 const allowed=()=>enabled&&fine.matches&&!reduce.matches&&!document.hidden;
 function resize(){dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(innerWidth*dpr);canvas.height=Math.round(innerHeight*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);points=[];bursts=[];blobs=[]}
 function clear(){cancelAnimationFrame(raf);raf=0;points=[];bursts=[];blobs=[];initialized=false;ctx.clearRect(0,0,innerWidth,innerHeight)}
 function update(){control.textContent=enabled?'光效：开':'光效：关';control.setAttribute('aria-label',enabled?'关闭鼠标跟随光效':'开启鼠标跟随光效');control.setAttribute('aria-pressed',String(enabled));if(!allowed())clear()}
 function wake(){if(!raf&&allowed()){lastFrame=performance.now();raf=requestAnimationFrame(draw)}}
 function draw(now){raf=0;if(!allowed()){clear();return}const dt=Math.min(40,Math.max(1,now-lastFrame)),step=dt/16.67;lastFrame=now;
  const ox=x,oy=y,follow=1-Math.pow(1-config.followSpeed,step);x+=(tx-x)*follow;y+=(ty-y)*follow;const dx=x-ox,dy=y-oy;
  const moving=now-lastMove<150&&Math.hypot(dx,dy)>.35;
  if(initialized&&moving){points.push({x,y,time:now,color:Math.floor(emitted/5)%4});if(points.length>90)points.shift();ink(x,y,dx,dy,now)}
  points=points.filter(p=>now-p.time<config.linger*1000);bursts=bursts.filter(b=>now-b.time<850);blobs=blobs.filter(b=>now-b.time<b.life);
  ctx.clearRect(0,0,innerWidth,innerHeight);ctx.globalAlpha=1;ctx.lineCap='round';ctx.lineJoin='round';
  // Slow drifting elliptic pigment clouds make a viscous, fluid-like wake, not a rigid neon line.
  for(const b of blobs){const age=(now-b.time)/b.life,drag=Math.pow(.93,step),curl=Math.sin(b.phase+age*4.5)*.04;b.vx=(b.vx+curl)*drag;b.vy=(b.vy-curl*.6)*drag;b.x+=b.vx*step;b.y+=b.vy*step;const r=b.r*(1+age*.5);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.angle+age*.35);ctx.scale(1.22,.8);ctx.globalAlpha=Math.pow(1-age,1.5)*(dark?.29:.20);ctx.drawImage(sprites[b.color],-r,-r,r*2,r*2);ctx.globalAlpha*=.55;ctx.drawImage(sprites[(b.color+1)%4],-r*.6,-r*.9,r*1.5,r*1.5);ctx.restore()}
  for(let i=1;i<points.length;i++){const p=points[i],a=Math.pow(1-(now-p.time)/(config.linger*1000),1.5),q=points[i-1],rgb=palette[p.color];ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle=`rgba(${rgb},${a*(dark?.15:.10)})`;ctx.lineWidth=16*a+3;ctx.stroke();ctx.strokeStyle=`rgba(${rgb},${a*(dark?.48:.36)})`;ctx.lineWidth=3.2*a+.4;ctx.shadowBlur=10;ctx.shadowColor=`rgba(${rgb},.3)`;ctx.stroke();ctx.shadowBlur=0}
  for(const b of bursts){const t=(now-b.time)/850,r=8+66*(1-Math.pow(1-t,2));ctx.globalAlpha=1;ctx.strokeStyle=`rgba(156,126,231,${Math.pow(1-t,2)*.36})`;ctx.lineWidth=1.8*(1-t)+.3;ctx.beginPath();ctx.ellipse(b.x,b.y,r,r*.84,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle=`rgba(105,178,218,${Math.pow(1-t,2)*.26})`;ctx.beginPath();ctx.ellipse(b.x,b.y,r*.7,r*.58,.25,0,Math.PI*2);ctx.stroke()}
  ctx.globalAlpha=1;
  if(moving||points.length||bursts.length||blobs.length)raf=requestAnimationFrame(draw);else initialized=false;
 }
 document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!allowed())return;dark=!!e.target.closest?.('.dark,.case-dialog,.image-preview');tx=e.clientX;ty=e.clientY;if(!initialized){x=tx;y=ty;initialized=true}lastMove=performance.now();wake()},{passive:true});
 document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&allowed()){const now=performance.now();bursts.push({x:e.clientX,y:e.clientY,time:now});if(bursts.length>5)bursts.shift();for(let i=0;i<10;i++){const a=i*Math.PI/5;ink(e.clientX+Math.cos(a)*5,e.clientY+Math.sin(a)*5,Math.cos(a)*12,Math.sin(a)*12,now,true)}wake()}},{passive:true});
 document.documentElement.addEventListener('pointerleave',clear);addEventListener('blur',clear);addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',update);fine.addEventListener('change',update);reduce.addEventListener('change',update);
 control.addEventListener('click',()=>{enabled=!enabled;try{sessionStorage.setItem('aiyuyu-glow',enabled?'on':'off')}catch(e){}update()});
 // Move into the native dialog top layer so glow remains visible there without intercepting clicks.
 new MutationObserver(()=>{const host=[...document.querySelectorAll('dialog[open]')].at(-1)||document.body;if(canvas.parentElement!==host){clear();host.append(canvas)}}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});
 resize();update();
})();
