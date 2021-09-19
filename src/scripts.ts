import { articlesObserver } from "./scripts/articlesObserver";

const mainMenu = document.querySelector('nav');


articlesObserver(entries => {
  entries.forEach(entry => {
    const article: HTMLElement = entry.target as HTMLElement;
    const activeMenuItem = mainMenu.querySelector(`[href$="#${ article.id }"]`);

    if (entry.intersectionRatio > 0) {
      activeMenuItem?.classList.add('active');
      if (document.location.hash !== '#' + article.id) {
        history.pushState(null, null, `${ location.pathname }#${ article.id }`);
      }
    } else {
      activeMenuItem?.classList.remove('active');
    }
  });
});


(() => {
  if (location.hostname !== 'localhost') {
    try {
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
          (m[i].a = m[i].a || []).push(arguments)
        };
        // @ts-ignore
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
      })
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      // @ts-ignore
      ym(56975518, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    } catch (e) {
      console.warn('Yandex.Metrika is blocked')
    }
  }
})()
