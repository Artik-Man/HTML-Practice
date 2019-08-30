import hljs from '../../node_modules/highlight.js/lib/highlight';
import javascript from '../../node_modules/highlight.js/lib/languages/javascript';
import xml from '../../node_modules/highlight.js/lib/languages/xml.js';
import css from '../../node_modules/highlight.js/lib/languages/css.js';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

export const highlight = () => {
  document.querySelectorAll('pre[data-lang]:not([hidden])').forEach((block: HTMLElement) => {
    const lang = block.dataset.lang;
    lang && block.classList.add(lang);

    hljs.highlightBlock(block);
  });
};
