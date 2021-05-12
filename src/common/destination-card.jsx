import React from "react";

const DestinationCard = ({ from, to, destination, click, toggled }) => {
  console.log(from, to, destination);
  const { value } = destination;
  return (
    <div className={"w-full flex justify-center mt-10"} onClick={click}>
      <div className="w-1/3 self-center">
        <p
          className={`${
            toggled ? "bg-blue-700 text-blue-300" : "bg-blue-400 hover:bg-blue-500 text-blue-900"
          } m-1  border-2 border-blue-300 cursor-pointer select-none rounded-md p-4 text-center font-semibold`}
        >
          <div className="flex flex-col">
            <span className="text-2xl">{value}</span>
            <span className="text-3xl">{from + " ➡️➡️➡ " + to}</span>
          </div>
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
