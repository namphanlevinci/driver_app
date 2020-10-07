import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { startUp } from '@slices/app';
import { images, AppStyles } from '@theme';
import codePush from 'react-native-code-push';
import Spinner from 'react-native-spinkit';

const WelcomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const loadingApp = React.useCallback(() => {
    setIsVisible(false);
    delay(1000);
    const action = startUp();
    dispatch(action);
  }, [dispatch]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     loadingApp();
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [loadingApp]);

  React.useEffect(() => {
    checkUpdate()
  }, []);


  const checkUpdate = () => {
    try {
      codePush.checkForUpdate().then((update) => {
        if (update) {
          setIsVisible(true);
          if (update.failedInstall) { /* đã update */
            loadingApp();
          } else {
            let options = {
              installMode: codePush.InstallMode.ON_NEXT_RESTART,
              mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
            };
            codePush.sync(
              options,
              codePushStatusDidChange(),
              codePushDownloadDidProgress()
            );
          }
        } else {
          console.log('updated')
          loadingApp();
        }
      }).catch(err => {
        loadingApp();
      })
    } catch (err) {
      console.log('update failed');
      loadingApp();
    }
  }


  const codePushStatusDidChange = (status) => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        codePush.restartApp();
        break;
    }
  }

  const codePushDownloadDidProgress = (progress) => {
    let temp = parseFloat(progress.receivedBytes / progress.totalBytes);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={images.icons.logo_image}
      />
      <View style={styles.ckecking}>
        <Spinner
          isVisible={isVisible}
          size={40}
          type={'ThreeBounce'}
          color={'white'}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.yellow
  },
  logo: {
    width: '100%',
    height: '100%',

  },
  ckecking: {
    position: 'absolute',
    bottom: 25
  }
})


export default WelcomeScreen;
