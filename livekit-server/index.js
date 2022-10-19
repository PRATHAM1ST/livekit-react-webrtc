import { AccessToken } from 'livekit-server-sdk';

const roomName = 'room';
const participantName = 'user-name';

const at = new AccessToken('devkey', 'secret', {
  identity: participantName,
});
at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

const token = at.toJwt();
console.log('access token', token);
console.log(at)