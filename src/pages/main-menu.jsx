import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGameCode, setPlayerName, setStateGame, setTurnPlayer } from "../store/slices/gameSlice";
import { WebSocketContext } from "../containers/socket-container";
import { WS_BASE } from "../containers/config";
import io from "socket.io-client";
import { createRoom, joinRoom, syncState } from "../store/thunk/actions";
import { socket } from "../index";
import { useHistory } from "react-router-dom";
import { setJoinedOne, setNameOne, setStateOne } from "../store/slices/playerOneSlice";
import { setJoinedTwo, setNameTwo, setStateTwo } from "../store/slices/playerTwoSlice";
import { setActualPlayer } from "../store/slices/uiSlice";
import { cloneDeep } from "lodash";
import { syncStateGame, syncStateOne, syncStateTwo } from "../store/thunk/actions";
import { syncAction } from "../index";

const MainMenu = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const local = useSelector((state) => state.ui);
  const playerOne = useSelector((state) => state.playerOne);
  const playerTwo = useSelector((state) => state.playerTwo);
  const ws = useContext(WebSocketContext);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket.on("action-sent", (ack) => {
      console.log("action-sent", ack.action);
      dispatch(ack.action);
    });
  }, []);

  const createRoom = (roomSize) => {
    socket.emit("create-room", roomSize, (ack) => {
      console.log(ack.roomId);
      if (ack.status === "ok") {
        console.log("create-room", ack.status);
        dispatch(setGameCode(ack.roomId));
        dispatch(setNameOne(name));
        history.push("/waiting-room");
      } else {
        console.log("create-room", ack.message);
      }
    });
  };

  const joinRoom = (roomId) => {
    socket.emit("join-room", roomId, (ack) => {
      if (ack.status === "ok") {
        console.log(name);
        dispatch(setNameTwo(name));
        syncAction(setNameTwo(name), roomId, false);
        console.log("join-room", ack.status);
      } else {
        console.log("join-room", ack.message);
      }
    });
  };

  socket.on("player-joined", (ack) => {
    if (playerOne.name.length > 0) {
      console.log("sync playerOne.name szarrrrrrrrrr", game.roomId);
      if (playerOne.name !== "") syncAction(setNameOne(playerOne.name), ack.roomId, false);
    }
  });

  socket.on("room-is-full", (ack) => {
    console.log("room-is-full", ack.roomId, ack.player);
    dispatch(setGameCode(ack.roomId));
    // if (playerOne.name.length > 0) syncAction(setNameOne(playerOne.name), game.roomId, false);
    // if (playerTwo.name.length > 0) syncAction(setNameTwo(playerTwo.name), ack.roomId, false);
    history.push("/waiting-room");
  });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <div className="flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <form className="p-4 bg-white md:max-w-4xl lg:w-1/2 w-8/12 rounded-lg shadow mt-12 flex flex-col">
            <h1 className="font-bold text-5xl my-10 text-blue-500 self-center">🎟️➡️🚆➡️🇪🇺</h1>

            <div className="text-blue-500 mb-4 text-center font-semiblue text-md">
              Enter a name and the game code given to you to join a Room
            </div>
            <div className="text-sm font-base text-gray-500"></div>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-6 pr-10 border-2 border-blue-400">
              <div className="flex -mr-px justify-center w-15">
                <span className="flex items-center leading-normal px-3 border-0 rounded rounded-r-none text-2xl text-white bg-blue-400 m-1 p-2">
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow leading-normal w-px flex-1 h-10 rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none text-blue-500"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-4 border-2 border-blue-400">
              <div className="flex -mr-px justify-center w-15">
                <span className="flex items-center leading-normal rounded rounded-r-none text-2xl px-3 whitespace-no-wrap text-white bg-blue-400 m-1 p-2">
                  <i className="fas fa-train"></i>
                </span>
              </div>
              <input
                onChange={(e) => setInput(e.target.value)}
                type="password"
                className="flex-shrink flex-grow leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none text-blue-500"
                placeholder="Game Code"
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"></span>
              </div>
            </div>
            <div className="w-1/6 ml-1">
              <Link to="/rules">
                <p className="text-blue-500">Rules</p>
              </Link>
            </div>
            <Link
              className="p-2 mt-8 w-full bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white"
              to="/waiting-room"
              onClick={() => {
                joinRoom(input);
              }}
              // onClick={() => {
              //   dispatch(joinRoom(input));
              //   dispatch(setGameCode({ id: input }));
              //   dispatch(setJoinedTwo(true));
              //   dispatch(setNameTwo(name));
              //   dispatch(setActualPlayer(2));
              //   dispatch(setTurnPlayer(2));
              //   dispatch(syncStateGame(input, { game }));
              // }}
            >
              <center>
                <p className="self-center">ENTER LOBBY</p>
              </center>
            </Link>
            <p className="text-blue-500 mt-4 text-center">Or, fill in just your name and press:</p>
            <Link
              className="p-2 mt-4 w-full bg-blue-400 hover:bg-blue-500 rounded-lg shadow text-xl font-medium uppercase text-white"
              // to="/waiting-room"
              onClick={() => {
                createRoom(2);
              }}
              // onClick={() => {
              //   const id = game.gameCode.id;
              //   dispatch(createRoom(2));
              //   dispatch(setNameOne(name));
              //   dispatch(setTurnPlayer(1));
              //   dispatch(setJoinedOne(true));
              //   dispatch(setActualPlayer(1));
              //   dispatch(syncStateGame(id, "anyukadat kocsog"));
              // }}
            >
              <center>
                <p className="self-center">CREATE LOBBY</p>
              </center>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
