import io from "socket.io-client";
import { WS_BASE } from "../containers/config";

class SocketAPI {
  socket;

  constructor() {
    this.socket = io.connect(WS_BASE);

    this.socket.on("room-is-full", (data) => {
      console.log("room-is-full", data);
    });

    this.socket.on("state-changed", ({ state }) => {
      console.log("state-changed", state);
    });
  }

  // emit = async (name, data, handler) => {
  //   const ack = async function (resp) {
  //     handler(resp);
  //   };
  //   await this.socket.emit(name, data, handler);
  // };

  on = (event, fun) => {
    this.socket.on(event, fun);
  };
}

const socket = new SocketAPI();
export default socket;
