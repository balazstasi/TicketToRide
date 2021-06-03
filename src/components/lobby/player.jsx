import React from "react";

const Player = () => {
  return (
    <div className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
      <div className="flex items-center">
        <img
          className="rounded-full h-12 w-12"
          src="https://ia801905.us.archive.org/30/items/librewolf-81.0/logo.png"
          alt="Logo"
        />
        <div className="ml-2">
          <div className="text-sm font-semibold text-gray-600">Társasjáték :P</div>
        </div>
      </div>
      <div>
        <button className="bg-red-400 hover:bg-red-500  p-2 rounded-full shadow-md flex justify-center items-center">
          <svg
            className="text-white toggle__lock w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Player;
