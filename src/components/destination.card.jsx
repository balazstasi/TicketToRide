import React from "react";

export const DestinationCard = ({ destination, to, from }) => {
  return (
    <div>
      <p className="bg-blue-400 m-1 text-blue-900 border-2 border-blue-300 cursor-pointer select-none rounded-md p-4 text-center font-semibold">
        {from + " ➡️➡️➡ " + to}
      </p>
    </div>
  );
};
