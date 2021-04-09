import React from "react";

const RandomCard = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-200 flex justify-center items-center">
        <div className="max-w-sm bg-white border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
          <div id="header" className="flex items-center mb-4">
            <img
              alt="avatar"
              className="w-20 rounded-full border-2 border-gray-300"
              src="https://picsum.photos/seed/picsum/200"
            />
            <div id="header-text" className="leading-5 ml-6 sm">
              <h4 id="name" className="text-xl font-semibold">
                John Doe
              </h4>
              <h5 id="job" className="font-semibold text-blue-600">
                Designer
              </h5>
            </div>
          </div>
          <div id="quote">
            <img
              alt="avatar2"
              className="w-full border-2 border-gray-300 mx-2"
              src="https://picsum.photos/seed/picsum/200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomCard;
