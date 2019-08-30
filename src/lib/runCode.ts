export const runCode = () => {
  const iframes = new Map();

  document.querySelectorAll('[data-code]').forEach((pre: HTMLElement) => {
    const id = pre.dataset.code;
    const type = pre.dataset.lang;
    if (!iframes.has(id)) {
      iframes.set(id, {});
    }
    const item = iframes.get(id);
    item[type] = (item[type] || '') + pre.innerText;
  });

  document.querySelectorAll('[data-run]').forEach((div: HTMLElement) => {
    if (div.dataset.height) {
      div.style.height = div.dataset.height;
    }
    if (iframes.has(div.dataset.run)) {
      const code = iframes.get(div.dataset.run);
      div.attachShadow({ mode: 'open' });
      div.shadowRoot.innerHTML = `
        <style>
          ${code.css || ''}
        </style>
        ${code.html || ''}
        `;
    }
  });
};
