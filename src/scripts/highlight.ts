// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript.js';
// import xml from 'highlight.js/lib/languages/xml.js';
// import css from 'highlight.js/lib/languages/css.js';
//
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('css', css);
//
// export const highlight = () => {
//   document.querySelectorAll('pre[data-lang]:not([hidden])').forEach((block: HTMLElement) => {
//     const lang = block.dataset.lang;
//     lang && block.classList.add(lang);
//
//     hljs.highlightBlock(block);
//   });
// };

import Prism from 'prismjs';

export const highlight = () => {
  document.querySelectorAll('pre[data-lang]:not([hidden])').forEach((block: HTMLElement) => {
    const lang = block.dataset.lang;
    lang && block.classList.add(`language-${ lang }`);
    block.innerHTML = block.innerHTML.trim()
    Prism.highlightElement(block, false);
  });
};
