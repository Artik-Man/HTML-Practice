import './index.less';
import { highlight } from './lib/highlight';
import { runCode } from './lib/runCode';
import { tableOfContents } from './lib/tableOfContents';
import { initYoutube } from './lib/initYouTube';
import { initCodePen } from './lib/initCodePen';

document.addEventListener('DOMContentLoaded', () => {
  try {
    tableOfContents();
  } catch (e) {
    console.warn(e);
  }

  try {
    runCode();
  } catch (e) {
    console.warn(e);
  }

  try {
    highlight();
  } catch (e) {
    console.warn(e);
  }

  try {
    initYoutube();
  } catch (e) {
    console.warn(e);
  }

  try {
    initCodePen();
  } catch (e) {
    console.warn(e);
  }
});
