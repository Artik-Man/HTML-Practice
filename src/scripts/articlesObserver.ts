type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;

const callbacks: IntersectionObserverCallback[] = [];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    callbacks.forEach(cb => {
      cb(entries);
    });
  });
  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    observer.observe(article);
  });
}

export const articlesObserver = (callback: IntersectionObserverCallback) => {
  callbacks.push(callback);
};
