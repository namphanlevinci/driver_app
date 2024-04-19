import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Account,
  HomeScreen,
  Notification,
  NewOrder,
  OldOrder,
  ScreenName,
} from '../screens';
import AccountDrawer from './DrawerTab';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { deliveryOrderList, recentlyOrderList } from '../redux/slices/order';
import { notification } from '../redux/slices/notification';

const Stack = createStackNavigator();

function HomeStack(props) {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('AppState', appState.current);
      dispatch(deliveryOrderList());
      dispatch(recentlyOrderList({ page: 1 }));
      dispatch(notification({ type: 'delivery' }));
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  return (
    <Stack.Navigator headerMode={'none'}>
      <>
        <Stack.Screen
          name={'AccountDrawer'}
          component={AccountDrawer}
        />
        <Stack.Screen
          name={ScreenName.Notification}
          component={Notification}
        />
        <Stack.Screen
          name={ScreenName.NewOrder}
          component={NewOrder}
        />
        <Stack.Screen
          name={ScreenName.OldOrder}
          component={OldOrder}
        />
        <Stack.Screen
          name={ScreenName.Account}
          component={Account}
        />
      </>

    </Stack.Navigator>
  );
}

export default HomeStack;
