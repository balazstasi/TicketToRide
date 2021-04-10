import { trainColors } from "../constants/trainColors";

const getRandomColor = () => {
  return trainColors[Math.trunc(Math.random() * 6)];
};

export { getRandomColor };
