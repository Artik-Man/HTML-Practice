document.addEventListener('DOMContentLoaded', event => {
  document.querySelectorAll('pre').forEach(block => {
    const lang = block.dataset.lang;
    lang && block.classList.add(lang);
    block.innerHTML = block.innerHTML.replace(/\</g, '&lt;');

    hljs.highlightBlock(block);
  });

  document.querySelectorAll('.youtube').forEach(block => {
    const id = block.dataset.video;
    const link = 'https://www.youtube.com/watch?v=' + id;
    const src = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';

    const anchor = document.createElement('a');
    anchor.setAttribute('href', link);

    const image = document.createElement('img');
    image.setAttribute('alt', 'YouTube');
    image.setAttribute('src', src);

    anchor.appendChild(image);
    block.appendChild(anchor);

    anchor.addEventListener('click', e => {
      e.preventDefault();

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', true);
      iframe.classList.add('aspect16-9', 'no-print');

      block.removeChild(anchor);
      block.appendChild(iframe);
    });
  });

  const contents = document.getElementById('contents').querySelector('ul');
  document.querySelectorAll('article').forEach(article => {
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

  document.querySelectorAll('.codepen').forEach(pen => {
    const id = pen.dataset.id;
    pen.innerHTML = pen.innerHTML || `Run Pen`;
    pen.setAttribute('href', 'https://codepen.io/artik-man/pen/' + id);
    pen.setAttribute('target', '_blank');
    pen.addEventListener('click', event => {
      event.preventDefault();

      pen.dataset.height = pen.dataset.height || 300;
      pen.dataset.themeId = pen.dataset.themeId || 'dark';
      pen.dataset.defaultTab = pen.dataset.defaultTab || 'css,result';
      pen.dataset.preview = pen.dataset.preview || false;
      pen.dataset.user = pen.dataset.user || 'artik-man';
      pen.dataset.penTitle = pen.dataset.penTitle || id;
      pen.dataset.slugHash = pen.dataset.slugHash || id;
      pen.dataset.editable = pen.dataset.editable || 'editable';

      const span = document.createElement('span');
      span.innerHTML = `See the Pen <a href="https://codepen.io/artik-man/pen/${id}/"> ${id} </a> 
        by Artik (<a href="https://codepen.io/artik-man">@artik-man</a>) on <a href="https://codepen.io">CodePen</a>.`;
      pen.appendChild(span);
      pen.insertAdjacentHTML(
        'beforebegin',
        '<a class="print-only" href="https://codepen.io/artik-man/pen/' +
          id +
          '/" target="_blank">Посмотреть задачу</a>',
      );
      __CPEmbed(pen);
    });
  });
});
