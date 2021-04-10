import { ticketToRideData } from "../assets/ticket-to-ride-data";

const getRandomDestination = () => {
  const number = Math.trunc(Math.random() * 46);
  if (number >= 41 && number <= 46) {
    return ticketToRideData.longDestinations[number];
  } else {
    return ticketToRideData.destinations[number];
  }
};

export { getRandomDestination };
