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

export const PLAYER_STATE = {
  score: 0,
  stations: 0,
  cards: 0,
  trains: 0,
};

export const STATE = {
  deckCount: 0,
  discardCount: 0,
  lastCard: "",
  whosTurn: "",
  lastPlayer: "",
  lastTurn: "",
  lastHand: "",
  playerData: "",
  from: "",
  to: "",
};

export const PACK = [
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

export const LETTER_TO_CARD = {
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

export const CARD_TO_LETTER = {
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

export const MOVE_LIST = {
  TAKE_TOP_CARD: "Take card from the top of the deck",
  TAKE_CARD_FROM_DRAWN: "Take a card from the drawn 5",
  LAY_STATION: "Lay station",
  LAY_ROUTE: "Lay route",
  TAKE_ROUTE_CARDS: "Take route cards",
};

export const ROUTE_LENGTHS = [1, 2, 3, 4, 6, 8];
