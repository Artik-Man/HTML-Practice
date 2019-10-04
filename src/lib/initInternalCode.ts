export const initInternalCode = () => {
  document.querySelectorAll('.internal-code').forEach((button: HTMLAnchorElement) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const height = button.dataset.height || '600';
      button.remove();
      const container = document.querySelector(`.internal-code-frame[data-id="${id}"]`) as HTMLElement;
      if (container) {
        const iframe = container.querySelector('iframe');
        if (iframe) {
          if (height.includes('vh')) {
            iframe.style.height = (window.innerHeight * parseInt(height, 10)) / 100 + 'px';
          } else {
            iframe.style.height = height + 'px';
          }
        }
        container.classList.add('run');
        container.querySelectorAll(`button[data-id="${id}"]`).forEach((btn: HTMLElement) => {
          btn.addEventListener('click', () => {
            const width = btn.dataset.width;
            if (width) {
              iframe.style.width = width + 'px';
            }
            const height = btn.dataset.height;
            if(height){
              iframe.style.height = height + 'px';
            }
          });
        });
      }
    });
  });
};
