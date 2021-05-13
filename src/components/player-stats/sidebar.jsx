import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../common/button";
import Stats from "./stats";

const Sidebar = () => {
  const gameState = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);

  const [opened, setOpened] = useState(true);

  const toggleSideBar = (event) => {
    console.log(event.key);
    if (event.key === "s") {
      setOpened(!opened);
    }
  };

  return (
    //TODO: TEGYEL GOMBOT SIDEBARHOZ RENDESEN
    <>
      <span className="bg-blue-800 w-1/3 h-1/3" onClick={() => setOpened(!opened)}>
        OPEN/CLOSE
      </span>
      <div
        className={`h-1/4 flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 text-gray-800 ${
          !opened && "hidden"
        }`}
      >
        <div
          className="flex flex-col top-0  left-0 w-64 bg-blue-900 h-full shadow-lg"
          onClick={() => setOpened(!opened)}
        >
          <span className="text-blue-500 text-xl text-right mx-1 p-1">CLOSE</span>
          <div className="flex items-center pl-6 h-20 border-b border-gray-800">
            <div className="ml-1">
              <p className="ml-1 text-3xl font-medium tracking-wide truncate text-blue-100 font-sans">
                Players
              </p>
              <div className="badge my-2">
                <div className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-900 bg-blue-100 rounded-full">
                  Current Player:
                  <span> {gameState.turnPlayer === 1 ? playerOne.name : playerTwo.name}</span>
                </div>
              </div>
            </div>
          </div>
          <Stats />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
