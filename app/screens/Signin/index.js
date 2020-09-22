import { Button, TextInput } from '@components';
import { scaleHeight } from '@lib/isIphoneX';
import * as NavigationService from '@navigate/NavigationService';
import { signIn } from '@slices/account';
import { AppStyles, images } from '@theme';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenName from '../ScreenName';

const Signin = () => {
  const dispatch = useDispatch();

  const isLogin = () => {
    dispatch(signIn({ username: 'nhath', password: 'admin123456' }));
  };

  const goSignup = () => {
    NavigationService.navigate(ScreenName.Signup);
  };

  return (
    <KeyboardAvoidingView
      style={AppStyles.styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? scaleHeight(-22) : 0}>
      <ScrollView
        style={styles.padding}
        keyboardDismissMode={'on-drag'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Image style={styles.logo} source={images.icons.logo} />
          <View style={styles.space} />
          <Text style={styles.title}>VUI LÒNG ĐĂNG NHẬP</Text>
          <View>
            <TextInput.Signin placeholder={'Mã nhân viên *'} />
            <View style={styles.space} />
            <TextInput.Signin
              placeholder={'Mật khẩu *'}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          <Image style={styles.logo} source={images.icons.down_icon} />
          <Button.Large
            title={'Đăng nhập'}
            backgroundColor={AppStyles.colors.red}
            textColor={AppStyles.colors.white}
            onPress={isLogin}
          />
          <View style={styles.space} />
          <Button.Large
            title={'Đăng kí'}
            backgroundColor={AppStyles.colors.white}
            textColor={AppStyles.colors.red}
            onPress={goSignup}
          />
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
    fontWeight: 'bold',
    marginBottom: scaleHeight(3),
  },
  logo: {
    marginBottom: scaleHeight(3),
  },
});

export default Signin;
