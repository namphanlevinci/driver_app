import { checkReview, startUp } from '../../redux/slices/app';
import { AppStyles, images } from '../../theme';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import codePush from 'react-native-code-push';
import Spinner from 'react-native-spinkit';
import { useDispatch } from 'react-redux';

// YellowBox.ignoreWarnings(['']);

const CodePushWelcomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    dispatch(checkReview());
  }, [dispatch]);

  useEffect(() => {
    const loadingApp = () => {
      setIsVisible(false);
      delay(1000);
      const action = startUp();
      dispatch(action);
    };

    const checkUpdate = () => {
      try {
        codePush
          .checkForUpdate()
          .then((update) => {
            if (update) {
              setIsVisible(true);
              if (update?.failedInstall) {
                /* đã update */
                loadingApp();
              } else {
                let options = {
                  installMode: codePush.InstallMode.ON_NEXT_RESTART,
                  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                };

                codePush.sync(
                  options,
                  codePushStatusDidChange,
                  // codePushDownloadDidProgress
                );
              }
            } else {
              loadingApp();
            }
          })
          .catch(() => {
            loadingApp();
          });
      } catch (err) {
        loadingApp();
      }
    };

    checkUpdate();
  }, [dispatch]);

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
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.icons.logo_image} />
      <View style={styles.ckecking}>
        <Spinner
          isVisible={isVisible}
          size={30}
          type={'ThreeBounce'}
          color={'white'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.red,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  ckecking: {
    position: 'absolute',
    bottom: 10,
  },
});

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
const WelcomeScreen = codePush(codePushOptions)(CodePushWelcomeScreen);

export default WelcomeScreen;
