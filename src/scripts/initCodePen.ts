window['initCodePen'] = () => {
  document.querySelectorAll('.codepen').forEach((pen: HTMLElement) => {
    const id = pen.dataset.id;
    pen.innerHTML = pen.innerHTML || `Run Pen`;
    pen.setAttribute('href', 'https://codepen.io/artik-man/pen/' + id);
    pen.setAttribute('target', '_blank');
    pen.addEventListener('click', event => {
      pen.dataset.themeId = pen.dataset.themeId || 'dark';
      pen.dataset.defaultTab = pen.dataset.defaultTab || 'css,result';
      pen.dataset.preview = pen.dataset.preview || 'false';
      pen.dataset.user = pen.dataset.user || 'artik-man';
      pen.dataset.penTitle = pen.dataset.penTitle || id;
      pen.dataset.slugHash = pen.dataset.slugHash || id;
      pen.dataset.editable = pen.dataset.editable || 'editable';
      if (pen.dataset.height && pen.dataset.height.includes('vh')) {
        pen.dataset.height = (window.innerHeight * parseInt(pen.dataset.height, 10)) / 100 + '';
      } else {
        pen.dataset.height = pen.dataset.height || '300';
      }

      const span = document.createElement('span');
      span.innerHTML = `See the Pen <a href="https://codepen.io/artik-man/pen/${ id }/"> ${ id } </a> 
          by Artik (<a href="https://codepen.io/artik-man">@artik-man</a>) on <a href="https://codepen.io">CodePen</a>.`;
      pen.appendChild(span);
      pen.insertAdjacentHTML(
        'beforebegin',
        `<a class="print-only" href="https://codepen.io/artik-man/pen/${ id }/" target="_blank">Посмотреть задачу</a>`,
      );
      try {
        window['__CPEmbed'](pen);
        event.preventDefault();
      } catch (e) {
        pen.removeChild(span);
        console.warn('Can not initialize CodePen');
      }
    });
  });
};

export const initCodePen = () => {
  const script = document.createElement('script');
  script.setAttribute('src', 'https://static.codepen.io/assets/embed/ei.js');
  script.setAttribute('async', 'true');
  script.setAttribute('onload', 'initCodePen()');
  document.body.appendChild(script);
};
