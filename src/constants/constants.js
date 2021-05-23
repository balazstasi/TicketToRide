export const PURPLE = "purple";
export const WHITE = "white";
export const BLUE = "blue";
export const YELLOW = "yellow";
export const ORANGE = "orange";
export const BLACK = "black";
export const RED = "red";
export const GREEN = "green";
export const LOCOMOTIVE = "locomotive";
export const GRAY = "gray";

export const trainColors = [BLACK, BLUE, GREEN, ORANGE, PURPLE, RED, WHITE, YELLOW, LOCOMOTIVE];

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
  { name: PURPLE, count: 12 },
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
  p: PURPLE,
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
  purple: "p",
  red: "r",
  white: "w",
  yellow: "y",
  locomotive: "l",
};

export const MOVE_LIST = {
  TAKE_TOP_CARD: "CARD FROM DECK",
  TAKE_CARD_FROM_DRAWN: "CARD FROM PALLET",
  TAKE_ROUTE_CARDS: "TAKE ROUTE FROM DECK",
  LAY_ROUTE: "LAY ROUTE",
};

export const ROUTE_LENGTHS = [1, 2, 3, 4, 6, 8];
