import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { setGamePhase } from "../store/slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import Player from "../components/lobby/player";
import { WebSocketContext } from "../containers/socket-container";
import io from "socket.io-client";
import { WS_BASE } from "../containers/config";

import { playerOneSlice } from "../store/slices/playerOneSlice";
import { getState, leaveRoom } from "../store/thunk/actions";

const WaitingRoom = () => {
  const history = useHistory();
  const ws = useContext(WebSocketContext);
  const d = useDispatch();
  const game = useSelector((state) => state.game);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const socket = io.connect(WS_BASE);

  useEffect(() => {
    if (game.gameCode.id === "") history.push("/");
  }, []);

  return (
    <div>
      <div className=" flex-1 bg-blue-400 flex justify-center items-center bg-gradient-to-tl from-blue-800 to-blue-500 text-white font-mono flex-col min-h-screen">
        <div className="bg-white w-full md:max-w-4xl rounded-lg shadow p-4">
          <div className="h-12 flex justify-between items-center border-b border-gray-200 m-4">
            <div>
              <div className="text-xl font-bold text-gray-700">Room Code: {game.gameCode.id}</div>
              <div className="text-sm font-base text-gray-500">Waiting for more players...</div>
              <div className="text-sm font-base text-gray-500 mb-8">
                Press the Lock when there are enough players (2)
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center w-full  shadow-md rounded-full">
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
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
            <Player name={playerOne.name} />
            <Player name={playerTwo.name} />
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
                <div className="ml-1 text-gray-500 font-medium">Invite a friend</div>
              </div>
            </div>
          </div>
          <div
            className="p-6 flex flex-col"
            onClick={() => {
              d(setGamePhase("FIRST_DRAW_DESTINATIONS"));
              getState(game.gameCode.id);
            }}
          >
            <Link
              className="p-4 bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white w-full"
              to="/destination-card-select"
            >
              <center>
                <p className="self-center">Start The Game</p>
              </center>
            </Link>
            <Link
              className="p-4 mt-4 bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white w-full"
              to="/"
            >
              <center>
                <p className="self-center" onClick={() => leaveRoom(game.gameCode.id)}>
                  Back To Title Screen
                </p>
              </center>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
