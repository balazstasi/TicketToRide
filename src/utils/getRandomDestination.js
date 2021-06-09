import { ticketToRideData } from "../assets/ticket-to-ride-data";

const SHORT = "short";
const LONG = "long";

const getRandomDestination = () => {
  const number = Math.trunc(Math.random() * 46) + 1;
  if (number >= 41 && number <= 46) {
    return ticketToRideData.longDestinations[number];
  } else {
    return ticketToRideData.destinations[number];
  }
};

const getRandomShortDestination = () => {
  const number = Math.floor(Math.random() * 40) + 1;
  const destination = ticketToRideData.destinations[number];
  return { ...destination, type: SHORT };
};

const getRandomLongDestination = () => {
  const number = Math.floor(Math.random() * 6) + 41;
  const destination = ticketToRideData.longDestinations[number];
  return { ...destination, type: LONG };
};

export { getRandomDestination, getRandomLongDestination, getRandomShortDestination };
