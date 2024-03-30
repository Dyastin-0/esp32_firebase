const modal = document.querySelector('#add-switch-modal');
const modalButton = document.querySelector('#add-switch');
const switchName = document.querySelector('#switch-name');
const closeModal = document.querySelector('#close-add-switch');

const overlay = document.querySelector('#overlay');

modalButton.addEventListener('click', () => {
  modal.classList.add('active');
  overlay.classList.add('active');
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});