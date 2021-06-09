import { trainColors } from "../constants/constants";

const getRandomColor = () => {
  return trainColors[Math.trunc(Math.random() * 9)];
};

export { getRandomColor };
