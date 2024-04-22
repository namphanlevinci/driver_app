import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import {isEmpty} from 'lodash';

export function useAppState(settings) {
  const {
    onChange,
    onForeground,
    onBackground,
    onBackForeground = () => {},
    onBackToActive = () => {},
  } = settings || {};
  const [appState, setAppState] = useState(AppState.currentState);

  const [countAppState, setCountAppState] = useState('0');

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      if (appState == 'inactive' && nextAppState == 'active') {
        if (typeof countAppState == 'number' && countAppState > 0) {
          onBackForeground();
        }
      } else if (nextAppState === 'active' && appState !== 'active') {
        isValidFunction(onForeground) && onForeground();
        if (typeof countAppState == 'number' && countAppState > 0) {
          onBackToActive();
        }
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        isValidFunction(onBackground) && onBackground();
      }
      setAppState(nextAppState);
      if (countAppState == 0) {
        setCountAppState(count => parseInt(count) + 1);
      }
      isValidFunction(onChange) && onChange(nextAppState);
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, [onChange, onForeground, onBackground, appState]);

  // settings validation
  function isValidFunction(func) {
    return func && typeof func === 'function';
  }

  return appState;
}
