const cardContainer = document.querySelector('.places__list');

const removeCard = (parent, child) => {
  parent.removeChild(child);
}

const createCard = (card, removeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardContainer, cardElement))

  return cardElement;
}

initialCards.forEach((card) => {
  cardContainer.append(createCard(card, removeCard));
});