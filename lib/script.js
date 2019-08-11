document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre').forEach((block) => {
        var lang = block.getAttribute('data-lang');
        lang && block.classList.add(lang);
        block.innerHTML = block.innerHTML.replace(/\</g,'&lt;')
        hljs.highlightBlock(block);
    });
});