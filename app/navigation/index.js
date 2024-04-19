import { NavigationContainer } from '@react-navigation/native';
import { WelcomeScreen } from '../screens';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { navigationRef } from './NavigationService';

function App() {
  const isLogIn = useSelector((state) => state.account.isLogin);
  const isLoadingApp = useSelector((state) => state.app.isLoadingApp);

  if (isLoadingApp) {
    return <WelcomeScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {isLogIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
