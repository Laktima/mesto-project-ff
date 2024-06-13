import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { removeCard, likeCard, createCard } from './scripts/components/card.js';

const cardContainer = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = editPopup.querySelector('.popup__close');
const closeNewPopupButton = newPopup.querySelector('.popup__close');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');

const urlInput = document.querySelector('.popup__input_type_url');
const cardNameInput = document.querySelector('.popup__input_type_card-name');

const cardImage = cardPopup.querySelector('.popup__image');
const cardCaption = cardPopup.querySelector('.popup__caption');

const openCard = (cardPopup, card) => {
  cardImage.src = card.link;
  cardCaption.textContent = card.name;
  cardImage.alt = card.name;
  openModal(cardPopup);
  };
  
cardPopup.querySelector('.popup__close').addEventListener('click', function(evt) {
  closeModal(cardPopup);
});

////////

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
};

editPopup.querySelector('.popup__form').addEventListener('submit', handleEditFormSubmit);
  
editButton.addEventListener('click', function(evt){
  openModal(editPopup);
  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
});
    
////////
    
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: urlInput.value
    }
  cardContainer.insertBefore(createCard(card, removeCard, likeCard, openCard), cardContainer.firstChild);
  cardNameInput.value = '';
  urlInput.value = '';
  closeModal(newPopup);
};

newPopup.querySelector('.popup__form').addEventListener('submit', handleAddFormSubmit);
        
addButton.addEventListener('click', function(evt){
  openModal(newPopup);
});

///

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard, likeCard, openCard));
});


closeEditPopupButton.addEventListener('click', function(evt) {
  closeModal(editPopup);
});

closeNewPopupButton.addEventListener('click', function(evt) {
  closeModal(newPopup);
});

closeCardPopupButton.addEventListener('click', function(evt) {
  closeModal(cardPopup);
});