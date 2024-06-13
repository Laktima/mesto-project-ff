export function openModal(element) {
  element.classList.remove('popup_is-animated');
  element.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleKeyDown);
  element.addEventListener('click', handleClick);
};

function handleClick(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}

function handleKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}
  
export function closeModal(element) {
  document.removeEventListener('keydown', handleKeyDown);
  element.removeEventListener('click', handleClick);

  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
};