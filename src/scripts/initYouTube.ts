export const initYoutube = () => {
  document.querySelectorAll('.youtube').forEach((block: HTMLElement) => {
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
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.classList.add('aspect16-9', 'no-print');

      block.removeChild(anchor);
      block.appendChild(iframe);
    });
  });
};
