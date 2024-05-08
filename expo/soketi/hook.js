import {useContext, useEffect} from "react";
import { PusherContext } from "./index";

export const useSocket = ({event, callBack, channel}) => {

  const pusher = useContext(PusherContext)

  useEffect(() => {
    if (!pusher.getChannel(channel)){
      pusher.subscribe({
        channelName: channel,
        onEvent: (pusherEvent) => {
          if (pusherEvent.eventName === event)
            callBack(JSON.parse(pusherEvent.data))
        },
        onSubscriptionSucceeded: (channelName, data) => {
          // console.log(`onSubscriptionSucceeded: ${JSON.stringify(channelName)} data: ${JSON.stringify(data)}`);
          // console.log(`I can now access me: ${channelName.me}`)
        }
      }).then(() => {
        pusher.connect().then()
      })
        .catch((error) => {
          console.log(error)
        })
    }
    pusher.connect().then(r => console.log(r))

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
