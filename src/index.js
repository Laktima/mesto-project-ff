import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const cardContainer = document.querySelector('.places__list');

const removeCard = (card) => {
  card.remove();
}

const createCard = (card, removeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard));
});

////////

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function(evt){
  const editForm = document.querySelector('.popup_type_edit');
  openModal(editForm);
  const closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', function(evt) {
    closeModal(editForm);
  });
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closeModal(editForm);
    }
  });
  document.addEventListener('click', function(evt){
    if (evt.target === editForm) {
      closeModal(editForm);
    }
  });

  // Находим поля формы в DOM
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет
  function handleFormSubmit(evt) {
      evt.preventDefault();
      const name = nameInput.value;
      const job = jobInput.value;
  
      profileTitle.textContent = name;
      profileDescription.textContent = job;
      closeModal(editForm);
  }
  
  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  editForm.addEventListener('submit', handleFormSubmit);
});

function openModal(element) {
  element.classList.add('popup_is-opened');
};

function closeModal(element) {
  element.classList.remove('popup_is-opened');
};
