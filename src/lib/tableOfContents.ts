import { debounce } from './debounce';

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

  if (window.innerWidth > 1000) {
    const debouncedScroll = debounce(() => {
      articles.forEach(article => {
        const activeArticle = mainMenu.querySelector(`[href="#${article.id}"]`);
        if (window.scrollY > article.offsetTop - window.innerHeight / 2) {
          mainMenu.querySelectorAll('.active').forEach(a => {
            a.classList.remove('active');
          });
          activeArticle.classList.add('active');
          if (document.location.hash !== '#' + article.id) {
            history.pushState(null, null, '#' + article.id);
          }
        } else {
          activeArticle.classList.remove('active');
        }
      });
    }, 500);

    window.addEventListener('scroll', () => {
      debouncedScroll();
    });
  }

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
