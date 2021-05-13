import React from "react";

export const Button = (props) => {
  return (
    <button
      className="font-semibold w-full min-w-1/2 font-sans rounded px-3 py-2 m-2 border-b-4 border-l-2 shadow-lg bg-blue-400 border-blue-500 text-blue-900"
      {...props}
    >
      {props.children}
    </button>
  );
};
