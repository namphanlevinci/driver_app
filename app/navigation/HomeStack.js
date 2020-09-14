import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Account,
  HomeScreen,
  Notification,
  NewOrder,
  OldOrder,
  ScreenName,
} from '@screen';

const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator headerMode={'none'}>
      <>
        <Stack.Screen
          name={ScreenName.Home}
          component={HomeScreen}
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
