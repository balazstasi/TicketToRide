import React, { useContext } from "react";
import { Context } from "../store/store";
import Player from "../components/player";
import { players } from "../constants/players";
import { Link } from "react-router-dom";
import { Button } from "../common/button";

const EndScreen = () => {
  const [state] = useContext(Context);
  return (
    <div>
      <h1 className="mx-4 text-5xl w-full text-center mb-2 font-semibold text-blue-100 p-6">
        Score Table
      </h1>
      <div className="flex justify-center items-center">
        {/* <div className="text-center flex-1"> */}
        {players.map((name, i) => (
          <div>
            <Player
              number={i + 1}
              name={name}
              renderCards={false}
              turnPlayer={true}
            />
            <hr className="bg-blue-400" />
            <p className="text-left my-4 mx-8 p-2 font-semibold text-white">
              Score:
              <span className="text-blue-900 font-bold text-3xl">
                {" " + Math.trunc(Math.random() * 1000)}
              </span>
            </p>
          </div>
        ))}
        {/* </div> */}
      </div>
      <div className="w-full text-center">
        <Link to="/">
          <Button>Back to Title Screen</Button>
        </Link>
      </div>
    </div>
  );
};

export default EndScreen;
