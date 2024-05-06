import {
  Pusher,
  PusherEvent,
  PusherAuthorizerResult,
} from '@pusher/pusher-websocket-react-native';

function onAuthorizer() {

}

const handleConnect = async () => {
  try {
    const pusher = Pusher.getInstance();
    await pusher.init({
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
    await pusher.connect();
  } catch {}
};

export {
  handleConnect
}