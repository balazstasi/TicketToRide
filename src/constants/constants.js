// export const TAKE_TOP_CARD_1 = "1st card from top";
// export const TAKE_TOP_CARD_2 = "2nd card from top";
// export const TAKE_PALLET_CARD_1 = "1st card from pallet";
// export const TAKE_PALLET_CARD_2 = "2nd card from pallet";
// export const LAY_STATION = "Lay station";
// export const LAY_ROUTE = "Lay route";
// export const LAY_ROUTE_WITH_TUNNEL = "Lay route with tunnel";
// export const LAY_TUNNEL = "Lay tunnel";
// export const TAKE_ROUTE_CARDS = "Take route cards";

export const BLACK = "black";
export const BLUE = "blue";
export const GREEN = "green";
export const ORANGE = "orange";
export const PINK = "pink";
export const RED = "red";
export const WHITE = "white";
export const YELLOW = "yellow";
export const LOCOMOTIVE = "locomotive";

export const trainColors = [BLACK, BLUE, GREEN, ORANGE, PINK, RED, WHITE, YELLOW, LOCOMOTIVE];

// export const PlayerDataItem = {
//   score: 0,
//   stations: 0,
//   cards: 0,
//   trains: 0,
// };

// export const Game = {
//   deckCount: 0,
//   discardCount: 0,
//   lastCard: "",
//   pallet: "",
//   tunnel: "",
//   whosTurn: "",
//   lastPlayer: "",
//   lastTurn: "",
//   lastHand: "",
//   playerData: "",
//   firstCard: true,
//   from: "",
//   to: "",
// };

export const Pack = [
  { name: BLACK, count: 12 },
  { name: BLUE, count: 12 },
  { name: GREEN, count: 12 },
  { name: ORANGE, count: 12 },
  { name: PINK, count: 12 },
  { name: RED, count: 12 },
  { name: WHITE, count: 12 },
  { name: YELLOW, count: 12 },
  { name: LOCOMOTIVE, count: 14 },
];

export const LetterToCard = {
  k: BLACK,
  b: BLUE,
  g: GREEN,
  o: ORANGE,
  p: PINK,
  r: RED,
  w: WHITE,
  y: YELLOW,
  l: LOCOMOTIVE,
};

export const CardToLetter = {
  black: "k",
  blue: "b",
  green: "g",
  orange: "o",
  pink: "p",
  red: "r",
  white: "w",
  yellow: "y",
  locomotive: "l",
};

export const routeLengths = [1, 2, 3, 4, 6, 8];

export function getCardsFromString(list) {
  const cards = [];
  if (!(list == null)) {
    const listArray = [...list];
    listArray.forEach((card) => {
      cards.push(LetterToCard[card]);
    });
  }
  return cards;
}

export function createDeck() {
  const deck = [];
  for (const cardType of Pack) {
    const card = cardType.name;
    let count = cardType.count;
    while (count) {
      deck.push(card);
      count -= 1;
    }
  }
  return deck;
}
