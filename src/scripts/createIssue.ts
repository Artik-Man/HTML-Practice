const balloon = document.createElement('menu');
balloon.innerHTML = `<p>Нашли опечатку? <a href="" target="_blank">Создайте Issue на GitHub!</a></p>`;
let showed = false;

const createMessage = (text: string, element: Element, h2: Element | null) => encodeURI(`
Опечатка: *${ text }*

В главе: **${ h2?.textContent || 'Неизвестно' }**

В параграфе:
>${ (element?.textContent || 'Неизвестно').trim().replace(/\n/g, '\n>') }
`)

const showBalloon = (url: string, top: number, left: number) => {
  hideBalloon();
  if (!showed) {
    balloon.querySelector('a').href = url;
    balloon.style.top = `${ top }px`;
    balloon.style.left = `${ left }px`;
    document.body.appendChild(balloon);
    showed = true;
  }
}

const hideBalloon = () => {
  if (showed) {
    document.body.removeChild(balloon);
    showed = false;
  }
}

export const createIssue = () => {
  document.addEventListener('mouseup', evt => {
    const selection = window.getSelection();
    const text: string = selection.toString();
    if (text.length) {
      const element: Element = selection.focusNode.nodeType === 1 ? selection.focusNode as Element : selection.focusNode.parentElement;
      const section: Element | null = element?.closest('section[id]') || null;
      const h2: Element | null = section?.querySelector('h2') || null;
      const body = createMessage(text, element, h2);
      const title = `Опечатка в слове ${ text }`;
      if (!showed) {
        showBalloon(`https://github.com/Artik-Man/HTML-Practice/issues/new?title=${ title }&body=${ body }`, evt.y, evt.x);
      }
    } else {
      hideBalloon();
    }
  });
}
