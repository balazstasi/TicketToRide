import React from "react";

const Card = ({ color, highlighted, click, onSelect }) => {
  return (
    <div
      onClick={click}
      onMouseDown={onSelect}
      className={`p-3 items-center place-self-center cursor-pointer w-40`}
    >
      <div
        className={`w-full ${
          color === "locomotive" &&
          "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-yellow-200"
        }  ${
          highlighted ? "border-black border-4" : `border-4 border-${color}-600`
        } px-4 rounded-md tracking-wide shadow-lg flex flex-row items-center self-center`}
        style={{ backgroundColor: color }}
      >
        <div id="header" className="flex flex-col w-full items-center my-4">
          {!highlighted ? (
            <i
              className={`fa fa-train text-4xl`}
              style={{ color: color, WebkitFilter: "invert(100%)" }}
            ></i>
          ) : (
            <div className="flex flex-col text-center">
              <p
                className={`text-${color}-600 text-xs`}
                style={{ color: color, WebkitFilter: "invert(100%)" }}
              >
                SELECTED
              </p>
              <i
                className={`fa fa-train text-4xl`}
                style={{ color: color, WebkitFilter: "invert(100%)" }}
              ></i>
            </div>
          )}
        </div>
        <div id="image"></div>
      </div>
    </div>
  );
};

export default Card;
