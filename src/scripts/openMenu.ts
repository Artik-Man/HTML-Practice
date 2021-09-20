export const openMenu = () => {
  const nav = document.querySelector('nav');
  const btn = nav.querySelector('button');
  btn.addEventListener('click', () => {
    nav.classList.toggle('opened');
  });
  nav.querySelector('ul').addEventListener('click', () => {
    nav.classList.remove('opened');
  })
}
