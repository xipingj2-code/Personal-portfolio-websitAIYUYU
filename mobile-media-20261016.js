(()=>{
 'use strict';
 const manifest=window.portfolioMediaManifest||{};
 function apply(img,source,{sizes='(max-width:800px) 92vw, 55vw',eager=false}={}){
  const m=manifest[source];img.decoding='async';img.loading=eager?'eager':'lazy';
  if(!m){img.src=source;return}
  img.dataset.original=source;img.width=m.width;img.height=m.height;img.sizes=sizes;
  img.srcset=m.variants.map(v=>`${v.src} ${v.width}w`).join(', ');img.src=m.src;
 }
 window.portfolioMedia={apply,poster:source=>manifest[source]?.src||source};
})();
