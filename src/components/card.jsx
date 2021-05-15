import React from "react";

const Card = ({ color, click }) => {
  return (
    <div className="p-3 items-center place-self-center cursor-pointer w-40" onClick={click}>
      <div
        className={`w-full ${
          color === "locomotive" &&
          "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-yellow-200"
        }  border-2 border-${color}-600 px-4 rounded-md tracking-wide shadow-lg flex flex-row items-center self-center`}
        style={{ backgroundColor: color }}
      >
        <div id="header" className="flex flex-col w-full items-center my-4">
          <i
            className={`fa fa-train text-4xl`}
            style={{ color: color, WebkitFilter: "invert(100%)" }}
          ></i>
        </div>
        <div id="image"></div>
      </div>
    </div>
  );
};

export default Card;
