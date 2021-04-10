import React from "react";

const CardStack = ({ drawCard, type }) => {
  return (
    <div
      className="cursor-pointer select-none p-2 mx-24 w-72"
      onClick={drawCard}
    >
      <button
        tabIndex={-1}
        className={`w-full align-items-center justify-items-center
         border-2 bg-blue-700 active:bg-blue-400 border-black text-white p-4 rounded-md tracking-wide shadow-lg`}
      >
        <div id="header" className="my-4 w-full items-center flex flex-col">
          <h4 id="name" className="text-xl font-semibold">
            {type === "trains" ? "Draw Train Card" : "Draw Destination"}
          </h4>
        </div>
        <div id="image"></div>
      </button>
    </div>
  );
};

export default CardStack;
