import { Button, TextInput } from '@components';
import { scaleHeight } from '@lib/isIphoneX';
import * as NavigationService from '@navigate/NavigationService';
import { signIn, clearError } from '@slices/account';
import { AppStyles, images } from '@theme';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenName from '../ScreenName';
import { NotificationContext } from '../../NotificationProvider';

const Signin = () => {
  const [username, onChangeUser] = useState('');
  const [password, onChangePass] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.account.signInError);
  const device_token = useSelector((state) => state.account.fcm_token);
  const isReview = useSelector((state) => state.app.checkReview);

  const { fcmToken } = React.useContext(NotificationContext);

  const isLogin = () => {
    if (fcmToken) {
      dispatch(
        signIn({
          username: username,
          password: password,
          fcmToken: fcmToken,
        }),
      );
    } else {
      // alert(fcmToken);
    }
  };

  const goSignup = () => {
    NavigationService.navigate(ScreenName.Signup);
  };

  const removeText = () => {
    dispatch(clearError());
  };

  return (
    <KeyboardAvoidingView
      style={AppStyles.styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? scaleHeight(-22) : 0}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.padding}
        keyboardDismissMode={'on-drag'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Image style={styles.logo} source={images.icons.logo} />
          <View style={styles.space} />
          <Text style={styles.title}>VUI LÒNG ĐĂNG NHẬP</Text>
          <View>
            <TextInput.Signin
              placeholder={'Mã nhân viên *'}
              value={username}
              onChangeText={onChangeUser}
              onChange={removeText}
            />
            <View style={styles.space} />
            <TextInput.Signin
              placeholder={'Mật khẩu *'}
              secureTextEntry={true}
              value={password}
              onChangeText={onChangePass}
              onChange={removeText}
            />
            <Text style={styles.error}>
              {error ? 'Mã nhân viên hoặc mật khẩu không đúng!' : ''}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Image style={styles.logo} source={images.icons.down_icon} />
          <Button.Large
            title={'ĐĂNG NHẬP'}
            backgroundColor={AppStyles.colors.red}
            textColor={AppStyles.colors.white}
            onPress={isLogin}
          />
          <View style={styles.space} />
          {/* {isReview ? (
            <Button.Large
              title={'ĐĂNG KÝ'}
              backgroundColor={AppStyles.colors.white}
              textColor={AppStyles.colors.red}
              onPress={goSignup}
            />
          ) : null} */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {},
  top: {
    width: '100%',
    height: scaleHeight(65),
    backgroundColor: AppStyles.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    height: scaleHeight(35),
    backgroundColor: AppStyles.colors.yellow,
    alignItems: 'center',
  },
  space: {
    height: scaleHeight(1.5),
  },
  padding: {
    // flex: 1,
    backgroundColor: AppStyles.colors.red,
  },
  title: {
    color: AppStyles.colors.white,
    fontSize: 26,
    // fontWeight: 'bold',
    marginBottom: scaleHeight(3),
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
  },
  logo: {
    marginBottom: scaleHeight(3),
  },
  error: {
    marginLeft: 10,
    marginTop: 7,
    color: AppStyles.colors.white,
    fontSize: 12,
  },
});

export default Signin;
