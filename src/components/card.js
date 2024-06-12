import { closeModal, openModal } from "./modal";

const imagePopap = document.querySelector('.popup_type_image');

export const removeCard = (card) => {
  card.remove();
};

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

export const openCard = (cardForm, card) => {
  openModal(cardForm);
  const cardImage = cardForm.querySelector('.popup__image');
  const cardCaption = cardForm.querySelector('.popup__caption');
  cardImage.src = card.link;
  cardCaption.textContent = card.name;
  cardForm.querySelector('.popup__close').addEventListener('click', function(evt) {
    closeModal(cardForm);
  })
};

export const createCard = (card, removeCard, likeCard, openCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));
  
  cardImage.addEventListener('click', () => openCard(imagePopap, card));

  return cardElement;
};