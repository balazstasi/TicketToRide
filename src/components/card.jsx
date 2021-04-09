import React from "react";

const Card = ({ color }) => {
  return (
    <div className="flex items-center w-1/6 my-4 px-2 cursor-pointer">
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
