import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Header, TextInput, Button, Modal } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '@slices/app';

const Signup = () => {
  const dispatch = useDispatch();
  const back = () => {
    NavigationService.goBack()
  };
  const show = () => {
    dispatch(showModal());
  }
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Đăng kí tài khoản'} goback={back} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.container}>
            <View style={styles.space2x} />
            <View style={styles.textInput}>
              <TextInput.Signin placeholder={'Họ & Tên *'} />
              <View style={styles.space} />
              <TextInput.Signin placeholder={'Số điện thoại *'} />
              <View style={styles.space} />
              <TextInput.Signin placeholder={'Email *'} />
            </View>
            <Button.Large title={'Đăng kí'}
              backgroundColor={AppStyles.colors.red}
              textColor={AppStyles.colors.white}
              onPress={show}
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
    alignItems: 'center'
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
