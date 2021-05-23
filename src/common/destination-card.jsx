import React from "react";

const DestinationCard = ({ from, to, destination, click, toggled }) => {
  const { value } = destination;
  return (
    <div className={"w-full flex justify-center mt-10"} onClick={click}>
      <div className="w-1/3 self-center">
        <p
          className={`${
            toggled ? "bg-blue-500 text-blue-300" : "bg-blue-400 hover:bg-blue-500"
          } p-4 rounded-lg shadow text-xl font-medium select-none cursor-pointer uppercase text-center text-white w-full`}
        >
          <div className="flex flex-col">
            <span className="text-2xl">{value}</span>
            <span className="text-3xl">{from + " ➡️➡️➡️ " + to}</span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
