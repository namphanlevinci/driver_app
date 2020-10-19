/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { setI18nConfig } from '@localize';
import { AppStyles } from '@theme';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './apolloClient';

import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';
import { Modal } from '@components';
import { saveTokenDevice } from '@slices/account';
import { useDispatch, useSelector } from 'react-redux';
import { showRatingOrder, showNewOrder, hideLoadingItem, infoNotification } from '@slices/app';
import { deliveryOrderList, recentlyOrderList } from '@slices/order';

import { useFirebaseCloudMessing } from '@firebase';

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
          <PaperProvider theme={theme}>
            <Navigator />
            <NotificationProvider />
          </PaperProvider>
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
    // console.log('==> notification onForegroundMessage', data);
    const info = JSON.parse(data?.data?.order);
    dispatch(infoNotification(info))
    // alert('ok')
    // const {notification} = data;
    // if(data.newOrder) {
    dispatch(showNewOrder())
    dispatch(deliveryOrderList());
    // }
    // if(data.newRating) {
    //   dispatch(showRatingOrder())
    // }
    // TODO: process message on foreground state
  };

  const onBackgroundMessage = (data) => {
    console.log('===> notification onBackgroundMessage', JSON.stringify(data));
    dispatch(deliveryOrderList());
    // const {notification} = data;
    // TODO: process message on background state
  };

  const onOpenedApp = ({ data }) => {
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

  console.log(firebaseToken)
  // TODO : save redux app local
  dispatch(saveTokenDevice(firebaseToken));

  return null;
};