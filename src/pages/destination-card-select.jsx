import React, { useContext, useEffect, useState } from "react";
import DestinationCard from "../common/destination-card";
import { Context } from "../store/store";
import { Button } from "../common/button";
import { Link } from "react-router-dom";
import { getRandomDestination } from "../utils/getRandomDestination";

const DestinationCardSelect = () => {
  const [state, dispatch] = useContext(Context);
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "DESTINATION_CARD_SELECT" });
  }, []);

  useEffect(() => {
    const destResult = [];
    for (let i = 0; i < 3; i++) destResult.push(getRandomDestination());
    console.log(destResult);
    setDestinations(destResult);
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-center mt-10 font-bold text-3xl text-blue-200 select-none">
        {/* TODO: EZT IRD MAJD AT A MERETEZEST */}
        Please Select <span className="text-4xl">2</span> Destination Cards!
      </h1>

      {destinations.map((dest) => {
        return (
          <DestinationCard
            destination={dest}
            from={dest.fromCity}
            to={dest.toCity}
            click={() => {
              if (!state[1].destinations.find((destination) => destination.id === dest.id)) {
                dispatch({
                  type: "ADD_DESTINATION_TO_PLAYER",
                  payload: { playerNumber: 1, destination: dest },
                });
              }
            }}
          />
        );
      })}

      <div className="w-full text-center">
        <Link to="/game">
          <Button>Continue</Button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCardSelect;
