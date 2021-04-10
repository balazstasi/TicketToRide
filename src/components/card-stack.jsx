import React from "react";

const CardStack = ({ drawCard, type }) => {
  return (
    <div
      className="self-center w-1/6 my-4 mx-4 px-2 cursor-pointer select-none"
      onClick={drawCard}
    >
      <button
        tabIndex={-1}
        className={`w-full align-items-center justify-items-center
         border-2 bg-white active:bg-blue-400 border-black px-4  rounded-md tracking-wide shadow-lg`}
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
