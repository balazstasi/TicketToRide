import { ticketToRideData } from "../assets/ticket-to-ride-data";

const getRandomDestination = () => {
  //TODO: Csinald meg, hogy 1 hosszu es 3 rovid cel legyen
  const number = Math.trunc(Math.random() * 46);
  if (number >= 41 && number <= 46) {
    return ticketToRideData.longDestinations[number];
  } else {
    return ticketToRideData.destinations[number];
  }
};

export { getRandomDestination };
