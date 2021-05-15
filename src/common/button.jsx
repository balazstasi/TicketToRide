import React from "react";

export const Button = (props) => {
  return (
    <button
      className={`${
        props.highlighted ? "bg-blue-200" : "bg-blue-400"
      } font-semibold w-full font-sans rounded px-3 py-2 p-1 mx-2 my-1 border-b-4 border-l-2 shadow-lg border-blue-500 text-blue-900`}
      {...props}
    >
      {props.children}
    </button>
  );
};
