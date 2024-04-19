import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ScreenName, WelcomeScreen, Signup, Signin } from '../screens';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={Signin} name={ScreenName.Signin} />
      <Stack.Screen component={Signup} name={ScreenName.Signup} />
    </Stack.Navigator>
  );
}

export default AuthStack;
