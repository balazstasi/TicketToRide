import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/store";

const WaitingRoom = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "WAITING_FOR_PLAYERS" });
  }, []);

  return (
    <div>
      <div className="min-h-screen flex-1 bg-blue-400 p-4 flex justify-center items-center">
        <div className="bg-white w-full md:max-w-4xl rounded-lg shadow">
          <div className="h-12 flex justify-between items-center border-b border-gray-200 m-4">
            <div>
              <div className="text-xl font-bold text-gray-700">Tasi's Room</div>
              <div className="text-sm font-base text-gray-500">
                Waiting for more players...
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center w-full  shadow-md rounded-full">
                <label
                  htmlFor="toogleA"
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex items-center">
                    <input id="toogleA" type="checkbox" className="hidden" />
                    <div className="toggle__line w-20 h-10 bg-gray-300 rounded-full shadow-inner"></div>
                    <div className="toggle__dot bg-blue-400 absolute w-10 h-10 rounded-full shadow flex items-center justify-center">
                      <svg
                        className="text-white w-6 h-6 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
              <div className="flex items-center">
                <img
                  className="rounded-full h-12 w-12"
                  src="https://eadn-wc03-1341917.nxedge.io/cdn/wp-content/uploads/2020/10/png-clipart-xubuntu-xfce-menu-element-hand-logo-150x150.png"
                  alt="Logo"
                />
                <div className="ml-2">
                  <div className="text-sm font-semibold text-gray-600">Már</div>
                  {/* <div className="text-sm font-light text-gray-500">
                    Alcím
                  </div> */}
                </div>
              </div>
              <div>
                <button className="bg-red-400 hover:bg-red-500 p-2 rounded-full shadow-md flex justify-center items-center">
                  <svg
                    className="text-white toggle__lock w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
              <div className="flex items-center">
                <img
                  className="rounded-full h-12 w-12"
                  src="https://www.shareicon.net/data/2015/09/16/101867_archlinux_512x512.png"
                  alt="Logo"
                />
                <div className="ml-2">
                  <div className="text-sm font-semibold text-gray-600">
                    Megint
                  </div>
                  {/* <div className="text-sm font-light text-gray-500">
                    Alcím
                  </div> */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md">
              <div className="flex items-center">
                <img
                  className="rounded-full h-12 w-12"
                  src="https://ia801905.us.archive.org/30/items/librewolf-81.0/logo.png"
                  alt="Logo"
                />
                <div className="ml-2">
                  <div className="text-sm font-semibold text-gray-600">
                    Társasjáték :P
                  </div>
                  {/* <div className="text-sm font-light text-gray-500">
                    Alcím
                  </div> */}
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
                    <path
                      // strokeLinecap="round"
                      // strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex bg-gray-200 justify-center items-center h-16 p-4 my-6  rounded-lg  shadow-inner">
              <div className="flex items-center border border-gray-400 p-2 border-dashed rounded cursor-pointer">
                <div>
                  <svg
                    className="text-gray-500 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="ml-1 text-gray-500 font-medium">
                  Invite a friend
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-row">
            <Link
              className="p-4 bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white w-full"
              to="/game"
            >
              <center>
                <p className="self-center">Start The Game</p>
              </center>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
