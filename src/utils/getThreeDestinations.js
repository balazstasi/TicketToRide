import { getRandomShortDestination } from "./getRandomDestination";

export default function getThreeShortDestinations() {
  const destResult = [];

  let newDestination = getRandomShortDestination();
  destResult.push(newDestination);
  for (let i = 0; i < 2; i++) {
    // eslint-disable-next-line no-loop-func
    while (destResult.find((dest) => newDestination.id === dest.id)) {
      newDestination = getRandomShortDestination();
    }
    destResult.push(newDestination);
  }

  return destResult;
}

export { getThreeShortDestinations };
