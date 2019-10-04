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
