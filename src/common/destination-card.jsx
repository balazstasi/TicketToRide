import React from "react";

const DestinationCard = ({ from, to, destination, click }) => {
  console.log(from, to, destination);
  return (
    <div className="w-full flex justify-center mt-10" onClick={click}>
      <div className="w-1/3 self-center">
        <p className="bg-blue-400 m-1 text-blue-900  hover:bg-blue-500 border-2 border-blue-300 cursor-pointer select-none rounded-md p-4 text-center font-semibold">
          {from + " ➡️➡️➡ " + to}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
