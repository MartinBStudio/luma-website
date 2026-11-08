const viewer = document.querySelector('#screenshot-viewer');
const shots = [...document.querySelectorAll('.shots a')];
const image = viewer.querySelector('.viewer-image');
const count = viewer.querySelector('.viewer-count');
let selected = 0;

function show(index) {
  selected = (index + shots.length) % shots.length;
  image.src = shots[selected].href;
  image.alt = shots[selected].querySelector('img').alt;
  count.textContent = `${selected + 1} / ${shots.length}`;
}

shots.forEach((shot, index) => {
  shot.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(index);
    viewer.showModal();
  });
});

viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => show(selected + Number(button.dataset.step)));
});
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    show(selected + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
viewer.addEventListener('click', event => {
  if (event.target === viewer) {
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) viewer.close();
  }
});
