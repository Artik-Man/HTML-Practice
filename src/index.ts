import './index.less';
import { runCode } from './lib/runCode';
import { highlight } from './lib/highlight';
import { initYoutube } from './lib/initYouTube';
import { initCodePen } from './lib/initCodePen';
import { tableOfContents } from './lib/tableOfContents';
import { initInternalCode } from './lib/initInternalCode';
import { simpleVirtualScroll } from './lib/simpleVirtualScroll';

document.addEventListener('DOMContentLoaded', () => {
  const imports = [
    tableOfContents,
    runCode,
    highlight,
    initYoutube,
    initCodePen,
    initInternalCode,
    simpleVirtualScroll,
  ];
  imports.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.warn(e);
    }
  });
});


(()=>{
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   // @ts-ignore
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   // @ts-ignore
   ym(56975518, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
})()
