import React from "react";
import Card from "../card";

const DrawBottom = () => {
  return (
    <>
      <div
        className={`w-full flex flex-row flex-auto flex-shrink-0 antialiased bg-blue-900 text-gray-800`}
      >
        {/* <div className="fixed flex flex-row justify-between bg-blue-900 h-full shadow-lg w-full"> */}
        <div className="flex items-center pl-6 h-40 border-b border-gray-800 mr-40">
          {[1, 2, 3, 4, 5].map((card) => (
            <div className="flex flex-grow mx-2">
              <Card color="rainbow" click={() => null} />
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DrawBottom;
