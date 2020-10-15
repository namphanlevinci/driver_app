import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Header, TextInput, Button, Modal } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '@slices/account';

const Signup = () => {
  const [firstname, onChangeFirstname] = useState('');
  const [lastname, onChangeLastname] = useState('');
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const dispatch = useDispatch();
  const back = () => {
    NavigationService.goBack()
  };
  const Signup = () => {
    dispatch(signUp({firstname: firstname, lastname: lastname, email: email, username: username, password: password }));
  }
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Đăng kí tài khoản'} goback={back} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.container}>
            <View style={styles.space2x} />
            <View style={styles.textInput}>
              <TextInput.Signin
                placeholder={'Tên *'}
                value={firstname}
                onChangeText={onChangeFirstname}
              />
              <View style={styles.space} />
              <TextInput.Signin
                placeholder={'Họ *'}
                value={lastname}
                onChangeText={onChangeLastname}
              />
              <View style={styles.space} />
              <TextInput.Signin
                placeholder={'Email *'}
                value={email}
                onChangeText={onChangeEmail}
              />
              <View style={styles.space} />
              <TextInput.Signin
                placeholder={'Tên đăng nhập *'}
                value={username}
                onChangeText={onChangeUsername}
              />
              <View style={styles.space} />
              <TextInput.Signin
                placeholder={'Mật khẩu *'}
                secureTextEntry={true}
                value={password}
                onChangeText={onChangePassword}
              />
            </View>
            <Button.Large title={'Đăng kí'}
              backgroundColor={AppStyles.colors.red}
              textColor={AppStyles.colors.white}
              onPress={Signup}
            />
          </View>
          <Modal.Success />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    height: scaleHeight(1.5)
  },
  space2x: {
    height: scaleHeight(4)
  },
  textInput: {
    marginBottom: scaleHeight(5)
  },
});


export default Signup;
