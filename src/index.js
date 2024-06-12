import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const cardContainer = document.querySelector('.places__list');
const editForm = document.querySelector('.popup_type_edit');
const newForm = document.querySelector('.popup_type_new-card');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const urlInput = document.querySelector('.popup__input_type_url');
const cardNameInput = document.querySelector('.popup__input_type_card-name');

const imagePopap = document.querySelector('.popup_type_image');


///modal.js



function openModal(element) {
  element.classList.add('popup_is-opened');
};

function closeModal(element) {
  element.classList.remove('popup_is-opened');
};

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeModal(editForm);
    closeModal(newForm);
  }
});
document.addEventListener('click', function(evt){
  if (evt.target === editForm) {
    closeModal(editForm);
  }
  if (evt.target === newForm) {
    closeModal(newForm);
  }
});

///

///card.js

const removeCard = (card) => {
  card.remove();
}

const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

const openCard = (openClick) => {
  openClick.classList.toggle('popup_is-opened');
}

const createCard = (card, removeCard, likeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  const openClick = cardElement.querySelector('.card__image');
  openClick.addEventListener('click', () => openCard(imagePopap));
  

  return cardElement;
}

///



initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard, likeCard));
});

////////

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;

    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closeModal(editForm);
}

editButton.addEventListener('click', function(evt){
  openModal(editForm);
  const closeButton = editForm.querySelector('.popup__close');
  closeButton.addEventListener('click', function(evt) {
    closeModal(editForm);
  });

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  editForm.addEventListener('submit', handleEditFormSubmit);
});


////////

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const url = urlInput.value;
    const card = {
      name: cardName,
      link: url
    }
    cardContainer.insertBefore(createCard(card, removeCard, likeCard), cardContainer.firstChild)  ;
    cardNameInput.value = '';
    urlInput.value = '';
    closeModal(newForm);
}

addButton.addEventListener('click', function(evt){
  openModal(newForm);
  const closeButton = newForm.querySelector('.popup__close');
  closeButton.addEventListener('click', function(evt) {
    closeModal(newForm);
  });
  newForm.addEventListener('submit', handleAddFormSubmit);
  });