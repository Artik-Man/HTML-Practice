import './index.less';
import { highlight } from './lib/highlight';
import { runCode } from './lib/runCode';
import { tableOfContents } from './lib/tableOfContents';
import { initYoutube } from './lib/initYouTube';
import { initCodePen } from './lib/initCodePen';
import { simpleVirtualScroll } from './lib/simpleVirtualScroll';

document.addEventListener('DOMContentLoaded', () => {
  const imports = [tableOfContents, runCode, highlight, initYoutube, initCodePen, simpleVirtualScroll];
  imports.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.warn(e);
    }
  });
});
