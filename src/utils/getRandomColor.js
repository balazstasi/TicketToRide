import { trainColors } from "../constants/constants";

const getRandomColor = () => {
  return trainColors[Math.trunc(Math.random() * 9)];
};

console.log(getRandomColor());

export { getRandomColor };
