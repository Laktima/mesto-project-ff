import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { removeCard, likeCard, openCard, createCard } from './components/card.js';

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

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard, likeCard, openCard));
});

////////

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(editForm);
};

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
  cardContainer.insertBefore(createCard(card, removeCard, likeCard, openCard), cardContainer.firstChild)  ;
  cardNameInput.value = '';
  urlInput.value = '';
  closeModal(newForm);
};

addButton.addEventListener('click', function(evt){
  openModal(newForm);
  const closeButton = newForm.querySelector('.popup__close');
  closeButton.addEventListener('click', function(evt) {
    closeModal(newForm);
  });
  newForm.addEventListener('submit', handleAddFormSubmit);
});