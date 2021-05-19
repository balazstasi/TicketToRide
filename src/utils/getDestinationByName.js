import { ticketToRideData } from "../assets/ticket-to-ride-data";

const getDestinationByName = (name) => {
  return ticketToRideData.cities[
    Object.keys(ticketToRideData.cities).find((dest) => {
      return ticketToRideData.cities[dest].city === name;
    })
  ];
};

export { getDestinationByName };
