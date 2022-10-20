import { useEffect, useState } from "react";
import {} from "@livekit/react-components";
import {
  VideoPresets,
  createLocalAudioTrack,
  createLocalVideoTrack,
  Room
} from "livekit-client";
import Participant from "./Partcipant";

export default function User({ room }) {
  const [UserAudioTrack, setUserAudioTrack] = useState("");
  const [UserVideoTrack, setUserVideoTrack] = useState("");

  // option 2, settings for individual tracks
  async function publishTracks() {
    const videoTrack = await createLocalVideoTrack({
      facingMode: "user",
      // preset resolutions
      resolution: VideoPresets.h720,
    });
    const audioTrack = await createLocalAudioTrack({
      echoCancellation: true,
      noiseSuppression: true,
    });
    await setUserVideoTrack(videoTrack);
    await setUserAudioTrack(audioTrack);
  }

  useEffect(() => {
    room.localParticipant.setCameraEnabled(false)
    room.localParticipant.setMicrophoneEnabled(false)
    publishTracks()
  }, []);
  return (
    <>
      {UserAudioTrack.length != 0 && UserVideoTrack.length != 0 && (
        <Participant audioTrack={UserAudioTrack} videoTrack={UserVideoTrack} isLocal={true} />
      )}
    </>
  );
}
