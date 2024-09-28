import { deleteCard, setLike, deleteLike } from "../api";

export const removeCard = (card, cardId) => {
  deleteCard(cardId)
    .then(() => {
      card.remove()
    })
    .catch((err) => {
      console.log(err);
    })
};

export const likeCard = (likeButton, cardId, likeCounter) => {
  /*likeButton.classList.toggle('card__like-button_is-active');*/

  if (!likeButton.classList.contains('card__like-button_is-active')) {
    setLike(cardId)
    .then((res) =>{
      likeButton.classList.add('card__like-button_is-active')
      updateLikeInfo(res, likeCounter);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  else {
    deleteLike(cardId)
    .then((res) =>{
      likeButton.classList.remove('card__like-button_is-active')
      updateLikeInfo(res, likeCounter);
    })
    .catch((err) => {
      console.log(err);
    })
  }

};

export const createCard = (card, removeCard, likeCard, openCard, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (userId !== card.owner._id) {
      deleteButton.remove();
  }
  else {
    deleteButton.addEventListener('click', () => removeCard(cardElement, card._id));
  }

  const likeCounter = cardElement.querySelector('.card__like-counter');
  const likeButton = cardElement.querySelector('.card__like-button');

  likeCounter.textContent = card.likes.length;
  
  likeButton.addEventListener('click', () => likeCard(likeButton, card._id, likeCounter));
  cardImage.addEventListener('click', () => openCard(card));
  

  card.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })


  
  return cardElement;
};

function updateLikeInfo (cardInfo, likeCounter) {
  likeCounter.textContent = cardInfo.likes.length;
};