import {
  Pusher,
  PusherEvent,
  PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';
import axios from "axios";

export async function onAuthorizer(channelName, socketID) {
  try {
    const response = await axios.post(process.env.EXPO_PUBLIC_API_URL+"/broadcasting/auth", {
      socket_id: socketID,
      channel_name: channelName,
    })
    return await response.data();

  }catch (e) {
    console.log(e)
  }

}

const pusher = Pusher.getInstance();
try {
  await pusher.init({
    apiKey: process.env.EXPO_PUBLIC_SOKETI_PUBLIC_KEY,
    onAuthorizer: (channelName, socketId) => console.log(channelName, socketId),
    host: process.env.EXPO_PUBLIC_SOKETI_HOST,
    cluster: 'mt1',
    onConnectionStateChange: e => {
      console.log('onConnectionStateChange', e);
    },
    onError: e => {
      console.log('onError', e);
    },
  });
  await pusher.connect();
} catch(e) {
  console.log(e)
}

export default pusher;