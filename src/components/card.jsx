import React from "react";

const Card = ({ color, click, fromDeck }) => {
  return (
    <div
      className="self-top p-2 ml-6 items-center cursor-pointer w-1/8"
      onClick={click}
    >
      <div
        className={`w-full ${
          color === "rainbow"
            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-yellow-200"
            : `bg-${color}-200`
        }  border-2 border-${color}-600 px-4 rounded-md tracking-wide shadow-lg flex flex-row items-center self-center`}
      >
        <div id="header" className="flex flex-col w-full items-center my-4">
          {/* <h4 id="name" className="text-xl font-semibold mx-2">
            <span className={`text-${color}-600`}>{color}</span> Train
          </h4> */}
          <i className={`fa fa-train text-4xl text-${color}-600`}></i>
        </div>
        <div id="image"></div>
      </div>
    </div>
  );
};

export default Card;
