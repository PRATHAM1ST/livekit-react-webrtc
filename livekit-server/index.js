import { RoomServiceClient, AccessToken } from "livekit-server-sdk";

const livekitHost = "ws://localhost:7880";
const svc = new RoomServiceClient(livekitHost, "devkey", "secret");
const roomName = "myroom";
const participantName = "user-name";

function getRooms() {
  svc.listRooms().then((rooms) => {
    // console.log('existing rooms', rooms);
  });
}

function createRoom() {
  const opts = {
    name: "myroom",
    // timeout in seconds
    emptyTimeout: 10 * 60,
    maxParticipants: 20,
  };
  svc.createRoom(opts).then((room) => {
    console.log("room created");
  });
}

function deleteRoom(roomId) {
  svc.deleteRoom("myroom").then(() => {
    console.log("room deleted");
  });
}

const at = new AccessToken("devkey", "secret", {
  identity: participantName,
});

at.addGrant({
  roomJoin: true,
  room: roomName,
  canPublish: true,
  canSubscribe: true,
});

createRoom();

const token = at.toJwt();

// const client = new RoomServiceClient(livekitHost, "devkey", "secret")

// // subscribe to new track
// client.updateSubscriptions("myroom", "receiving-participant-identity", ["TR_TRACKID"], true)

// // unsubscribe from existing track
// client.updateSubscriptions("myroom", "receiving-participant-identity", ["TR_TRACKID"], false)

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

var jsonParser = bodyParser.json();
const app = express();
const PORT = 7884;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/getToken", (req, res) => {
  console.log("yes got the res");
  res.send(JSON.stringify(token));
});

app.listen(PORT, () => console.log("Connecting to port " + PORT));
