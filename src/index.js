import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { removeCard, likeCard, createCard } from './scripts/components/card.js';

import { enableValidation } from './scripts/validation.js';
import { getInitialCards, getUserInfo, editUserInfo, createNewCard, editUserAvatar } from './scripts/api.js';

const cardContainer = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditPopupButton = editPopup.querySelector('.popup__close');
const closeNewPopupButton = newPopup.querySelector('.popup__close');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');

const urlInput = document.querySelector('.popup__input_type_url');
const cardNameInput = document.querySelector('.popup__input_type_card-name');

const cardImage = cardPopup.querySelector('.popup__image');
const cardCaption = cardPopup.querySelector('.popup__caption');

const avatarEditButton = document.querySelector('.avatar_edit-button');
const avatarPopup = document.querySelector('.popup_type_avatar-eddit');
const avatarInputUrl = document.querySelector('.popup__input_type_avatar-url');
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close');

const avatarSaveButton = avatarPopup.querySelector('.popup__button');
const editSaveButton = editPopup.querySelector('.popup__button');
const newSaveButton = newPopup.querySelector('.popup__button');

let userId = '';

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const openCard = (card) => {
  cardImage.src = card.link;
  cardCaption.textContent = card.name;
  cardImage.alt = card.name;
  openModal(cardPopup);
};

////////

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  editSaveButton.textContent = 'Сохранение...'

  editUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
  .then((newUserInfo) => {
    updateUserInfo(newUserInfo);
  
    closeModal(editPopup);

  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editSaveButton.textContent = 'Сохранить'
  })

};

editPopup.querySelector('.popup__form').addEventListener('submit', handleEditFormSubmit);
  
editButton.addEventListener('click', function(evt){
  openModal(editPopup);
  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
});

//////

function handleAvatarEditFormSubmit (evt) {
  evt.preventDefault();

  avatarSaveButton.textContent = 'Сохранение...'

  editUserAvatar(avatarInputUrl.value)
  .then((newUserInfo) => {
    updateUserInfo(newUserInfo);
    closeModal(avatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarSaveButton.textContent = 'Сохранить'
  })
}

avatarPopup.querySelector('.popup__form').addEventListener('submit', handleAvatarEditFormSubmit)

avatarEditButton.addEventListener('click', function(evt){
  openModal(avatarPopup);
})
    
////////
    
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  newSaveButton.textContent = 'Сохранение...'

  createNewCard({
    name: cardNameInput.value,
    link: urlInput.value
  })
  .then((newCard) => {
    cardContainer.insertBefore(createCard(newCard, removeCard, likeCard, openCard, userId), cardContainer.firstChild);
    cardNameInput.value = '';
    urlInput.value = '';
    closeModal(newPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    newSaveButton.textContent = 'Сохранить'
  })

};

newPopup.querySelector('.popup__form').addEventListener('submit', handleAddFormSubmit);
        
addButton.addEventListener('click', function(evt){
  openModal(newPopup);
});

///

/*initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard, likeCard, openCard));
});*/


closeEditPopupButton.addEventListener('click', function(evt) {
  closeModal(editPopup);
});

closeNewPopupButton.addEventListener('click', function(evt) {
  closeModal(newPopup);
});

closeCardPopupButton.addEventListener('click', function(evt) {
  closeModal(cardPopup);
});

closeAvatarPopupButton.addEventListener('click', function(evt) {
  closeModal(avatarPopup);
});

/// 24/09/2024 ///

enableValidation(options);

/*getInitialCards()
  .then((result) => {
    console.log(result);
    result.forEach((card) => {
      cardContainer.append(createCard(card, removeCard, likeCard, openCard))
    })
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });*/

Promise.all([
  getInitialCards(), getUserInfo()
    
])
    .then((res) => {
      userId = res[1]._id;
      console.log(res)
      res[0].forEach((card) => {
        cardContainer.append(createCard(card, removeCard, likeCard, openCard, userId))
      })
      updateUserInfo(res[1]);
    })
    .catch((err) => {
      console.log(err);
    })


function updateUserInfo (userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}