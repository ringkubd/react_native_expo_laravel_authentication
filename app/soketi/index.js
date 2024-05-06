import {
  Pusher,
  PusherEvent,
  PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';
import { createContext, useContext, useEffect } from "react";

export async function onAuthorizer(channelName, socketID) {
  console.log(`Received ${channelName} to ${socketID}`);
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL+"/broadcasting/auth", {
      method: 'POST',
      body: JSON.stringify({socket_id: socketID, channel_name: channelName}),
    })
    console.log(response.json())
    return await response.json();

  }catch (e) {
    console.log(e)
  }
  
}

const PusherConnection = Pusher.getInstance();
  try {
    await PusherConnection.init({
      apiKey: process.env.EXPO_PUBLIC_SOKETI_PUBLIC_KEY,
      onAuthorizer,
      host: process.env.EXPO_PUBLIC_SOKETI_HOST,
      cluster: 'mt1',
      onConnectionStateChange: e => {
        console.log('onConnectionStateChange', e);
      },
      onError: e => {
        console.log('onError', e);
      },
    });
    await PusherConnection.connect();
  } catch(e) {
  console.log(e)
  }

export const useSocket = ({event, callBack, channel}) => {

  const pusher = useContext(PusherContext)

  useEffect(() => {

    if (!pusher.getChannel(channel))
      pusher.subscribe({
        channelName: channel,
        onEvent: (pusherEvent) => {
          if (pusherEvent.eventName === event)
            callBack(JSON.parse(pusherEvent.data))
        },
        onSubscriptionSucceeded: (channelName, data) => {
          console.log(`onSubscriptionSucceeded: ${JSON.stringify(channelName)} data: ${JSON.stringify(data)}`);
          console.log(`I can now access me: ${myChannel.me}`)
        }
      }).then(() => {
        pusher.connect().then()
      })
        .catch((error) => {
          console.log(error)
        })

    return function cleanUp() {
      pusher.unsubscribe({channelName: channel}).then(() => {
        pusher.disconnect()
      })
        .catch((e) => {
          console.log("ERROR in unsubscribe", e)
        })
    };

  }, []);
};

export const PusherContext = createContext(null);
export default PusherConnection;