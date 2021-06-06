import { db } from "./sequelize.js";

const MAX_ROOM_SIZE = 5;

export const gameRoom = (io) => {
  io.on("connection", (socket) => {
    console.log("Game room: connected", socket.id);

    socket.on("create-room", async (size = MAX_ROOM_SIZE, ack) => {
      try {
        const { uuid } = await db.rooms.create();
        socket.join(uuid);
        const allRooms = io.sockets.adapter.rooms;
        allRooms.get(uuid).roomSize = parseInt(size);
        ack({ status: "ok", roomId: uuid });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("join-room", async (uuid, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // szoba state lekérése
        // nincs benne db-ben a uuid, meghal a db query
        const room = await db.rooms.findOne({
          where: { uuid },
        });
        if (!room) {
          throw new Error("No such room id in database.");
        }

        // Már a szobában van a kliens
        if (socket.rooms.has(uuid)) {
          throw new Error("The client is already in this room.");
        }

        // Tele van a szoba
        if (allRooms.get(uuid).size >= allRooms.get(uuid).roomSize) {
          throw new Error("The room is already full.");
        }

        socket.join(uuid);
        socket.broadcast
          .to(uuid)
          .emit("player-joined", { roomId: uuid, socketId: socket.id });
        if (allRooms.get(uuid).size === allRooms.get(uuid).roomSize) {
          const clients = Array.from(allRooms.get(uuid));
          clients.forEach((socketId, i) => {
            io.to(socketId).emit("room-is-full", {
              roomId: uuid,
              player: i + 1,
              state: room.state,
            });
          });
        }

        // visszaadás
        ack({ status: "ok", state: room.state });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("sync-state", async (uuid, state, broadcast, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // szoba state lekérése
        // nincs benne db-ben a uuid, meghal a db query
        const room = await db.rooms.findOne({
          where: { uuid },
        });
        if (!room) {
          throw new Error("No such room id in database.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(uuid)) {
          throw new Error("The client is not in this room.");
        }

        // db módosítás
        await db.rooms.update(
          { state: JSON.stringify(state) },
          { where: { uuid } }
        );

        // send to everybody
        let sender;
        if (broadcast) {
          sender = socket.broadcast.to(uuid);
        } else {
          sender = io.to(uuid);
        }
        sender.emit("state-changed", { roomId: uuid, state });

        ack({ status: "ok" });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("sync-action", async (uuid, action, broadcast, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(uuid)) {
          throw new Error("The client is not in this room.");
        }

        // send to everybody
        let sender;
        if (broadcast) {
          sender = socket.broadcast.to(uuid);
        } else {
          sender = io.to(uuid);
        }
        sender.emit("action-sent", { roomId: uuid, action });

        ack({ status: "ok" });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("leave-room", async (uuid, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(uuid)) {
          throw new Error("The client is not in this room.");
        }

        // broadcast
        socket.leave(uuid);
        socket.broadcast
          .to(uuid)
          .emit("player-left", { roomId: uuid, socketId: socket.id });

        ack({ status: "ok" });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("close-room", async (uuid, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(uuid)) {
          throw new Error("The client is not in this room.");
        }

        // szoba state lekérése
        // nincs benne db-ben a uuid, meghal a db query
        const room = await db.rooms.findOne({
          where: { uuid },
        });
        if (!room) {
          throw new Error("No such room id in database.");
        }

        // szoba lezárása
        allRooms.get(uuid).roomSize = allRooms.get(uuid).size;

        // kliensek értesítése
        const clients = Array.from(allRooms.get(uuid));
        clients.forEach((socketId, i) => {
          io.to(socketId).emit("room-is-full", {
            roomId: uuid,
            player: i + 1,
            state: room.state,
          });
        });

        ack({ status: "ok", state: room.state });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });

    socket.on("get-state", async (uuid, ack) => {
      try {
        // nincs ilyen szoba
        const allRooms = io.sockets.adapter.rooms;
        if (!Array.from(allRooms.keys()).includes(uuid)) {
          throw new Error("No such room id on the socket.io server.");
        }

        // szoba state lekérése
        // nincs benne db-ben a uuid, meghal a db query
        const room = await db.rooms.findOne({
          where: { uuid },
        });
        if (!room) {
          throw new Error("No such room id in database.");
        }

        // Nincs a szobában a kliens
        if (!socket.rooms.has(uuid)) {
          throw new Error("The client is not in this room.");
        }

        ack({ status: "ok", state: room.state });
      } catch (e) {
        if (typeof ack === "function") {
          ack({ status: "error", message: e.message });
        }
      }
    });
  });
};
