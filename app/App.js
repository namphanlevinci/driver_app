/**
 * React Native App
 * Everything starts from the entrypoint
 */
import { Modal } from '@components';
import { useFirebaseCloudMessing } from '@firebase';
import { setI18nConfig } from '@localize';
import { saveTokenDevice } from '@slices/account';
import { infoNotification, showNewOrder, showRatingOrder } from '@slices/app';
import { deliveryOrderList } from '@slices/order';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
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
              <Navigator />
              <NotificationProvider />
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

const NotificationProvider = () => {
  const dispatch = useDispatch();
  const onForegroundMessage = (data) => {
    console.log('==> notification onForegroundMessage', data);

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

  return null;
};
