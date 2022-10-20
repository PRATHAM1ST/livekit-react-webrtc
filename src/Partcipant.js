import { VideoRenderer, AudioRenderer, useParticipant } from "@livekit/react-core";
import {  } from "livekit-client";

export default function Participant({ audioTrack, videoTrack, isLocal }) {
//   const { isSpeaking } = useParticipant(participant);
  return (
    <div>
      <VideoRenderer track={videoTrack} isLocal={isLocal} />
      <AudioRenderer track={audioTrack} isLocal={isLocal} />
      {/* {isSpeaking ? "speaking" : "not speaking"} */}
    </div>
  );
}
