import React from "react";

const CardStack = ({ drawCard }) => {
  return (
    <div
      className="self-center w-1/6 my-4 mx-4 px-2 cursor-pointer"
      onClick={() => drawCard()}
    >
      <div
        className={`w-full align-items-center justify-items-center
        border-2 border-black px-4 bg-white rounded-md tracking-wide shadow-lg`}
      >
        <div id="header" className="my-4 w-full items-center flex flex-col">
          <h4 id="name" className="text-xl font-semibold">
            Draw Card
          </h4>
        </div>
        <div id="image"></div>
      </div>
    </div>
  );
};

export default CardStack;
