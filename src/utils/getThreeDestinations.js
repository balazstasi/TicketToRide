import { getRandomDestination } from "./getRandomDestination";

export default function getThreeDestinations() {
  const destResult = [];
  for (let i = 0; i < 3; i++) destResult.push(getRandomDestination());

  return destResult;
}

export { getThreeDestinations };
