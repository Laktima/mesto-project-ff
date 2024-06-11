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