document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach(block => {
        const lang = block.getAttribute('data-lang');
        lang && block.classList.add(lang);
        block.innerHTML = block.innerHTML.replace(/\</g, '&lt;')

        hljs.highlightBlock(block);
    });

    document.querySelectorAll('.youtube').forEach(block => {
        const id = block.getAttribute('data-video');
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
        })
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
    })
});