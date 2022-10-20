import { RoomEvent } from "livekit-client";
import { useRoom, useParticipant } from "@livekit/react-components";
import { useEffect, useState } from "react";
import User from "./User";

export default function Room() {
  const [props, setProps] = useState();

  const url = "ws://localhost:7880";

  const { room, isConnecting, participants, audioTracks } = useRoom({
    adaptiveStream: true,
    dynacast: true,
  });

  async function connectRoom(room) {
    const token = await fetch("http://localhost:7884/getToken")
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });

    await room.connect(url, token, {
      autoSubscribe: true,
    });

    await room.on(
      RoomEvent.TrackPublished,
      (track, publication, participant) => {
        publication.setSubscribed(true);
      }
    );
    setProps(<User room={room} />);
  }
  useEffect(() => {
    connectRoom(room);
  }, []);

  return <>{props}</>;
}
