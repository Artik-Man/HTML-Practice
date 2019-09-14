import { articlesObserver } from './articlesObserver';

export const tableOfContents = () => {
  const contents = document.getElementById('contents').querySelector('ul');
  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    const id = article.id;
    if (id) {
      const title = article.querySelector('h2').textContent;
      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + id);
      anchor.innerText = title;
      const listItem = document.createElement('li');
      listItem.appendChild(anchor);
      contents.appendChild(listItem);
    }
  });

  const main = document.querySelector('main');
  const mainMenu = document.getElementById('menu');
  mainMenu.innerHTML = contents.innerHTML;

  articlesObserver(entries => {
    entries.forEach(entry => {
      const article: HTMLElement = entry.target as HTMLElement;
      if (entry.intersectionRatio > 0) {
        mainMenu.querySelector(`[href="#${article.id}"]`).classList.add('active');
        if (document.location.hash !== '#' + article.id) {
          history.pushState(null, null, '#' + article.id);
        }
      } else {
        mainMenu.querySelector(`[href="#${article.id}"]`).classList.remove('active');
      }
    });
  });

  let withoutMenu = !!localStorage.getItem('menu-switch-button');
  if (withoutMenu) {
    main.classList.add('without-menu');
  }
  document.getElementById('menu-switch-button').addEventListener('click', () => {
    main.classList.toggle('without-menu');
    withoutMenu = !withoutMenu;
    localStorage[withoutMenu ? 'setItem' : 'removeItem']('menu-switch-button', 'true');
  });
};
