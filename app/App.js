/**
 * React Native App
 * Everything starts from the entrypoint
 */
import { Modal } from '@components';
import { useFirebaseCloudMessing, FirebaseProvider } from '@firebase';
import { setI18nConfig } from '@localize';
import { saveTokenDevice, shipperInfo } from '@slices/account';
import { infoNotification, showNewOrder, showRatingOrder } from '@slices/app';
import { deliveryOrderList } from '@slices/order';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ActivityIndicator, Platform } from 'react-native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import makeApolloClient from './apolloClient';
import GraphErrorHandler from './GraphErrorHandler';
import { graphQLErrorRef } from '@navigate/NavigationService';
import { notification } from '@slices/notification';
import PushNotification from 'react-native-push-notification';
import { NotificationProvider } from './NotificationProvider';

const { persistor, store } = configureAppStore();
const apolloClient = makeApolloClient();

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...AppStyles.colors,
  },
  fonts: configureFonts(fontConfig),
};

enableScreens();
setI18nConfig('vi'); // set initial config

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <GraphErrorHandler ref={graphQLErrorRef}>
            <PaperProvider theme={theme}>
              <FirebaseProvider>
                <NotificationProvider>
                  <Navigator />
                </NotificationProvider>
              </FirebaseProvider>
            </PaperProvider>
          </GraphErrorHandler>
        </ApolloProvider>
      </PersistGate>
      <Modal.Loading />
      <Modal.NewOrder />
      <Modal.RatingOrder />
    </Provider>
  );
}

/*
const NotificationProvider = () => {
  const dispatch = useDispatch();

  // PushNotification.createChannel(
  //   {
  //     channelId: '110123',
  //     channelName: 'title',
  //     channelDescription: 'body',
  //     soundName: 'jollibeesound.wav',
  //   },
  //   (created) => console.log(`createChannel returned '${created}'`),
  // );

  const onForegroundMessage = (data) => {
    const title = data?.notification?.title ? data?.notification?.title : '';
    const body = data?.notification?.body ? data?.notification?.body : '';

    PushNotification.localNotification({
      largeIcon: 'icon',
      smallIcon: 'notification_icon',
      color: '#F0810D',
      vibrate: true,
      vibration: 300,
      visibility: 'public',
      title: title,
      message: body,
      playSound: true,
      soundName: 'jollibeesound.wav',
      android: {
        largeIcon: 'icon', // (optional) default: "ic_launcher"
        smallIcon: 'notification_icon',
        sound: 'jollibeesound.wav',
        priority: 'high',
        visibility: 'public',
        importance: 'high',

        // Set color of icon (Optional, defaults to white)
      },
    });

    console.log('==> notification onForegroundMessage', data?.data);
    dispatch(notification({ type: 'delivery' }));
    dispatch(deliveryOrderList());
    dispatch(shipperInfo());
    const type = data?.data?.notification_type;
    switch (type) {
      case '1':
        const info_order = JSON.parse(data?.data?.order);
        dispatch(infoNotification(info_order));
        dispatch(showNewOrder());
        dispatch(deliveryOrderList());
        break;
      case '2':
        const info_rating = JSON.parse(data?.data?.rating);
        dispatch(infoNotification(info_rating));
        dispatch(showRatingOrder());
        break;
      default:
        break;
    }

    // TODO: process message on foreground state
  };

  const onBackgroundMessage = (data) => {
    console.log('===> notification onBackgroundMessage', JSON.stringify(data));
    dispatch(notification({ type: 'delivery' }));
    dispatch(shipperInfo());
    const type = data?.data?.notification_type;
    switch (type) {
      case '1':
        const info_order = JSON.parse(data?.data?.order);
        dispatch(infoNotification(info_order));
        dispatch(showNewOrder());
        dispatch(deliveryOrderList());
        break;
      case '2':
        const info_rating = JSON.parse(data?.data?.rating);
        dispatch(infoNotification(info_rating));
        dispatch(showRatingOrder());
        break;
      default:
        break;
    }
    // const {notification} = data;
    // TODO: process message on background state
  };

  const onOpenedApp = (data) => {
    console.log('=====> notification onOpenedApp', JSON.stringify(data));
    dispatch(shipperInfo());

    // const {notification} = data;
    // TODO: process message on onOpenedApp
  };

  const onMessageError = () => {
    console.log('=====> notification Error');
  };

  const firebaseToken = useFirebaseCloudMessing({
    onForegroundMessage,
    onBackgroundMessage,
    onOpenedApp,
    onMessageError,
  });

  console.log(firebaseToken);
  // TODO : save redux app local
  dispatch(saveTokenDevice(firebaseToken));

  React.useEffect(() => {
    if (firebaseToken) {
      PushNotification.getChannels(function (channels) {
        // Logger.debug(`Get Channels: ${channels}`, 'NotifyService');
        // Nếu đã tồn tại chennels rồi thì ko cần tạo nữa
        if (channels && channels?.length > 0) return;

        PushNotification.createChannel(
          {
            channelId: 'jollibee_vn_driver_channel',
            channelName: 'Jollibee VN',
            channelDescription: 'body',
            soundName: 'jollibeesound.wav',
            playSound: true, // (optional) default: true
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`),
        );
      });
    }
  }, [firebaseToken]);

  return null;
};

*/
