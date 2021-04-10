import React, { useContext, useEffect } from "react";
import { Context } from "../store/store";
import { Link } from "react-router-dom";
import "./main-menu.css";

const MainMenu = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "SET_GAME_STATE", payload: "MAIN_PAGE" });
  }, [dispatch]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <div className="flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <form className="p-4 bg-white md:max-w-4xl lg:w-1/2 w-8/12 rounded-lg shadow mt-12 flex flex-col">
            <h1 className="font-bold text-5xl my-10 text-white self-center">
              🎟️➡️🚆➡️🇪🇺
            </h1>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-6 pr-10 border-2 border-blue-400">
              <div className="flex -mr-px justify-center w-15">
                <span className="flex items-center leading-normal px-3 border-0 rounded rounded-r-none text-2xl text-white bg-blue-400 p-2">
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow leading-normal w-px flex-1 h-10 rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none "
                placeholder="Name"
              />
            </div>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-4 border-2 border-blue-400">
              <div className="flex -mr-px justify-center w-15">
                <span className="flex items-center leading-normal rounded rounded-r-none text-2xl px-3 whitespace-no-wrap text-white bg-blue-400 p-2">
                  <i className="fas fa-train"></i>
                </span>
              </div>
              <input
                type="password"
                className="flex-shrink flex-grow leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none"
                placeholder="Game Code"
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"></span>
              </div>
            </div>
            <Link
              to="/waiting-room"
              className="bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-20 w-2/3 self-center"
            >
              Enter Lobby
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
