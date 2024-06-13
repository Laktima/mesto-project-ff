const imagePopup = document.querySelector('.popup_type_image');

export const removeCard = (card) => {
  card.remove();
};

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
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
  
  cardImage.addEventListener('click', () => openCard(imagePopup, card));

  return cardElement;
};