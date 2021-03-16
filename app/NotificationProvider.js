import { NotifyService } from '@notifications';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, { createContext, useState } from 'react';
// import { checkNotifications } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { saveTokenDevice, shipperInfo } from '@slices/account';
import { infoNotification, showNewOrder, showRatingOrder } from '@slices/app';
import { deliveryOrderList } from '@slices/order';
import { notification } from '@slices/notification';

const log = (obj, message = '') => {
  //   Logger.debug(obj, `./handlers/NotificationProvider  [${message}]`);
  console.log(`${message}`, obj);
};

export const NotificationContext = createContext({});

const FIREBASE_TOKEN_STORE_KEY = 'fcmToken';
const DEFINE_SAVE_TOKEN = false;

export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const notifyService = React.useRef(null);

  const [enableNotify, setEnableNotify] = React.useState(false);
  const [token, setFirebaseToken] = useState(null);
  const [order_detail_status, setOderDetailStatus] = useState(null);

  const onForegroundMessage = async (resp) => {
    log(resp, 'Foreground Message ');
    notifyService.current?.firebaseNotify(resp);

    const { messageId, notification = {}, data = {}, sentTime } = resp || {};

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
  };

  const onBackgroundMessage = async (data) => {
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
  };

  const onOpenedApp = async (data) => {
    log(data, 'On Opened App Data');
    /**
     * TRƯỜNG HỢP APP IN OPENING
     * - sau khi mở nhảy vào order list
     *
     */
    dispatch(shipperInfo());
  };

  const onInit = (data) => {
    // Logger.debug('onInit', data);
  };

  const onMessageError = (data) => {
    // Logger.debug('onMessageError', data);
  };

  const onUserActionDenied = () => {
    // Logger.debug('onMessageError', data);
    // NavigationService.showConfirm(
    //   translate('txtWarningNotification'),
    //   translate('txtWarningNotificationDesc'),
    //   () => {
    //     NotificationSetting.open();
    //   },
    // );
  };

  // get firebase token for device
  const getToken = async () => {
    let fcmToken;
    if (DEFINE_SAVE_TOKEN) {
      fcmToken = await AsyncStorage.getItem(FIREBASE_TOKEN_STORE_KEY);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem(FIREBASE_TOKEN_STORE_KEY, fcmToken);
        }
      }
    } else {
      fcmToken = await messaging().getToken();
    }

    // console.log('token = ', fcmToken);
    setFirebaseToken(fcmToken);
    dispatch(saveTokenDevice(fcmToken));
  };

  // request when first launch app
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('==========> requestUserPermission:', authStatus);
    switch (authStatus) {
      case messaging.AuthorizationStatus.DENIED:
        //The user has denied notification permissions.
        // await requestUserPermission();
        if (typeof onUserActionDenied === 'function') {
          onUserActionDenied();
        }
        log(authStatus, 'requestUserPermission');
        break;
      case messaging.AuthorizationStatus.NOT_DETERMINED:
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        break;
    }
  };

  // check permissions firebase
  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    // console.log('==========> checkPermission: ', authStatus);

    switch (authStatus) {
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        //Permission has not yet been requested for your application.
        await requestUserPermission();

        break;
      case messaging.AuthorizationStatus.DENIED:
        //The user has denied notification permissions.
        // await requestUserPermission();
        log(authStatus, 'checkPermission');
        if (typeof onUserActionDenied === 'function') {
          onUserActionDenied();
        }
        break;
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        break;
    }
  };

  // const checkNotificationSetting = async (callBack) => {
  //   try {
  //     checkNotifications().then(({ status, settings }) => {
  //       log(status, 'Notification Check Permission');
  //       setEnableNotify(status === 'granted');
  //       if (callBack && typeof callBack === 'function') {
  //         callBack(status);
  //       }
  //       // if (status === 'blocked') {
  //       //   requestNotifications(['alert', 'sound']).then((notify) => {
  //       //     Logger.debug(notify, '=======> checkPermissionNotify notify');
  //       //   });
  //       // }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const onClickedNotifyMessage = () => {
    if (token) {
      // dispatch(actions.app.closeAllPopupPincode());
      // NavigationServices.navigate('Home');
      notifyService.current?.resetBadgeNumber();
    } else {
      // NavigationServices.navigate('SignIn');
    }
  };

  React.useEffect(() => {
    // dispatch(app.updateFcmToken(token));
    if (token) {
      // console.log('useEffect token notifyService=========> ' + token);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      notifyService.current = new NotifyService(onClickedNotifyMessage);
      //   updateFcmToken(token);
    } else {
      //   updateFcmToken(' ');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /**
   * Những trường hợp sẽ gọi lấy fcm token
   * 1. khi người dùng bật pushnotify app ()
   *  - push notify enable mà chưa có token
   *  - người dùng ra setting bật và quay lại app
   * 2.
   */
  //   React.useEffect(() => {
  //     if (enableNotify && !token) {
  //       getToken();
  //     }

  //     checkNotificationSetting();
  //   }, [enableNotify]);

  React.useEffect(() => {
    checkPermission();

    // Register background handler & Quit state messages
    messaging().setBackgroundMessageHandler(onBackgroundMessage);
    const unsubcribe_foreground = messaging().onMessage(onForegroundMessage);
    messaging().onNotificationOpenedApp(onOpenedApp);

    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );

          if (typeof onInit === 'function') {
            onInit(remoteMessage);
          }
        }
      });
    return () => {
      unsubcribe_foreground();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        enableNotify,
        fcmToken: token,
        // checkNotificationSetting: checkNotificationSetting,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
