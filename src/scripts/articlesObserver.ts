type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;

export const articlesObserver = (callback: IntersectionObserverCallback) => {
  const callbacks: IntersectionObserverCallback[] = [];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      callbacks.forEach(cb => {
        cb(entries);
      });
    });
    const articles = document.querySelectorAll('.container>section');
    articles.forEach(article => {
      observer.observe(article);
    });
  }

  callbacks.push(callback);
};
