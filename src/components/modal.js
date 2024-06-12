export function openModal(element) {
  element.classList.remove('popup_is-animated');
  element.classList.add('popup_is-opened');
  };
  
export function closeModal(element) {
  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
};

const editForm = document.querySelector('.popup_type_edit');
const newForm = document.querySelector('.popup_type_new-card');
const imagePopap = document.querySelector('.popup_type_image');

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeModal(editForm);
    closeModal(newForm);
    closeModal(imagePopap);
  }
});

document.addEventListener('click', function(evt){
  if (evt.target === editForm) {
    closeModal(editForm);
  }
  if (evt.target === newForm) {
    closeModal(newForm);
  }
  if (evt.target === imagePopap) {
    closeModal(imagePopap);
  }
});