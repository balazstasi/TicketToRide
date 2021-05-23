import React from "react";

export const Button = (props) => {
  return (
    <button
      className={`${
        props.highlighted ? "bg-blue-500" : "bg-blue-400"
      } p-4 bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white w-full`}
      {...props}
    >
      {props.children}
    </button>
  );
};
