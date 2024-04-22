import React, {createContext} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useAppState} from "./useAppState";

export const AppStateContext = createContext({});

const log = (obj, message = '') => {};

export const grantAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

let AppStateComponent = ({children}) => {
  const [appState, setAppState] = React.useState(null);

  useAppState({
    onChange: newAppState => {
      // Logger.debug('====> App To Change ' + newAppState, 'AppState');
      // getVoucherList();
      // setAppState(newAppState);
    },

    onForeground: () => {
      log({}, 'App To Active');
      setAppState('active');
    },

    onBackground: () => {
      log({}, 'App To Background ^^');
      // getVoucherList();
      setAppState('background');
    },

    onBackForeground: () => {
      log({}, 'App from back To foreground');
      // checkUpdateCodePush();
    },

    onBackToActive: () => {
      // checkUpdateCodePush();
    },
  });

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      grantAccessFineLocationPermission();
    }
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        appState,
      }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateComponent;
