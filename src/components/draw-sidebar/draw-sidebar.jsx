import React from "react";
import Card from "../card";
import CardStack from "../card-stack";

const DrawSidebar = () => {
  return (
    <>
      <div
        className={`min-h-screen h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 text-gray-800`}
      >
        <div className="fixed flex flex-col top-0 right-0 w-64 bg-blue-900 h-full shadow-lg">
          <div className="flex items-center pl-6 h-20 border-b border-gray-800">
            <div className="ml-1">
              <p className="ml-1 mt-4 text-3xl font-medium tracking-wide truncate text-blue-100 font-sans">
                Draw Cards
              </p>
              {/* <div className="badge my-2">
                <div className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-900 bg-blue-100 rounded-full"></div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col justify-between mt-1 flex-grow">
            {[1, 2, 3, 4, 5].map((card) => (
              <div className="w-full px-6">
                <Card color="rainbow" click={() => null} />
              </div>
            ))}
            <div className="flex flex-row">
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack type="trains" />
              </div>
              <div className="flex-grow mr-2 px-1 text-center">
                <CardStack type="destinations" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawSidebar;
