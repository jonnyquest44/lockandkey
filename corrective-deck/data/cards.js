// data/cards.js
import cardsJson from './phase1_pattern_cards.json';

export const cards = cardsJson;

// Group cards by region
export const cardsByRegion = cardsJson.reduce((acc, card) => {
  if (!acc[card.region]) acc[card.region] = [];
  acc[card.region].push(card);
  return acc;
}, {});

// Lookup by ID
export const cardsById = cardsJson.reduce((acc, card) => {
  acc[card.id] = card;
  return acc;
}, {});
