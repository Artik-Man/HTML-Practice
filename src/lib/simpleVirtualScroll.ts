import { articlesObserver } from './articlesObserver';

export const simpleVirtualScroll = () => {
  articlesObserver(entries => {
    entries.forEach(entry => {
      const article: HTMLElement = entry.target as HTMLElement;
      if (entry.intersectionRatio > 0) {
        article.style.visibility = 'visible';
      } else {
        article.style.visibility = 'hidden';
      }
    });
  });
};
