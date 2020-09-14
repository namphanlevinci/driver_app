import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { startUp } from '@slices/app';
import { images, AppStyles } from '@theme';


const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const loadingApp= React.useCallback(() => {
    const action = startUp();
    dispatch(action);
  }, [dispatch]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      loadingApp();
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingApp]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={images.icons.logo_image}
      />
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
    
  }
})


export default WelcomeScreen;
