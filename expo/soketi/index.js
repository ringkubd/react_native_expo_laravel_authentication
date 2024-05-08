import {
  Pusher,
  PusherEvent,
  PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';
import axios from "axios";
import { createContext } from "react";

export const PusherContext = createContext(null);

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
  pusher.init({
    apiKey: process.env.EXPO_PUBLIC_SOKETI_PUBLIC_KEY,
    // onAuthorizer,
    authEndPoint: process.env.EXPO_PUBLIC_SOKETI_PUBLIC_KEY+"/broadcasting/auth",
    host: process.env.EXPO_PUBLIC_SOKETI_HOST,
    cluster: 'mt1',
    onConnectionStateChange: e => {
      console.log('onConnectionStateChange', e);
    },
    onSubscriptionSucceeded: (channelName, data) => console.log(channelName),
    onError: e => {
      console.log('onError', e);
    },
    onEvent: function onEvent( event) {
      console.log(`onEvent: ${event}`);
    }
  });
} catch(e) {
  console.log(e)
}

export default pusher;
