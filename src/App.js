import { LiveKitRoom } from "livekit-react";
import { Room } from "livekit-client";

function App() {
  const url = "wss://localhost:7880";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InJvb20iLCJjYW5QdWJsaXNoIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWV9LCJpYXQiOjE2NjYxNTY2NjMsIm5iZiI6MTY2NjE1NjY2MywiZXhwIjoxNjY2MTc4MjYzLCJpc3MiOiJkZXZrZXkiLCJzdWIiOiJ1c2VyLW5hbWUiLCJqdGkiOiJ1c2VyLW5hbWUifQ.2t2c_s98vX6qpnjQZT79xPqNVzv6M-mXQvwiqXAFWT4";

  function onConnected(room) {
    // publish both camera and mic with a single permission request
    room.localParticipant.enableCameraAndMicrophone();
  }

  return (
    <div className="App">
      <LiveKitRoom url={url} token={token} onConnected={room => onConnected(room)}/>
    </div>
  );
}

export default App;
