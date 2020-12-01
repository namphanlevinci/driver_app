import { Button, Header, Modal, TextInput } from '@components';
import { scaleHeight } from '@lib/isIphoneX';
import * as NavigationService from '@navigate/NavigationService';
import { clearError, signUp } from '@slices/account';
import { AppStyles } from '@theme';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const error = useSelector((state) => state.account.signUpError);
  const [firstname, onChangeFirstname] = useState('');
  const [lastname, onChangeLastname] = useState('');
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const [errfirstname, onChangeerrFirstname] = useState('');
  const [errlastname, onChangeerrLastname] = useState('');
  const [erremail, onChangeerrEmail] = useState('');
  const [errusername, onChangeerrUsername] = useState('');
  const [errpassword, onChangeerrPassword] = useState('');

  const dispatch = useDispatch();
  const back = () => {
    NavigationService.goBack();
  };

  const resetErr = () => {
    onChangeerrFirstname('');
    onChangeerrLastname('');
    onChangeerrEmail('');
    onChangeerrUsername('');
    onChangeerrPassword('');
    dispatch(clearError());
  };

  const SignUp = async () => {
    let errFirstname = '';
    let errLastname = '';
    let errEmail = '';
    let errUsername = '';
    let errPassword = '';
    if (firstname === '') {
      await onChangeerrFirstname('Vui lòng nhập tên');
      errFirstname = 'Vui lòng nhập tên';
    }
    if (lastname === '') {
      await onChangeerrLastname('Vui lòng nhập họ');
      errLastname = 'Vui lòng nhập họ';
    }
    const checkemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!checkemail.test(email)) {
      await onChangeerrEmail('Email không hợp lệ');
      errEmail = 'Email không hợp lệ';
    }
    if (email === '') {
      await onChangeerrEmail('Vui lòng nhập email');
      errEmail = 'Vui lòng nhập email';
    }
    if (username === '') {
      await onChangeerrUsername('Vui lòng nhập mã nhân viên');
      errUsername = 'Vui lòng nhập mã nhân viên';
    }
    const medium = /^((?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{7,}))|((?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,})$/;
    if (!medium.test(password)) {
      await onChangeerrPassword(
        'Mật khẩu phải có ít nhất 7 kí tự gồm số và chữ hoặc số, chữ và kí tự đặc biệt',
      );
      errPassword =
        'Mật khẩu phải có ít nhất 7 kí tự gồm số và chữ hoặc số, chữ và kí tự đặc biệt';
    }

    if (password === '') {
      await onChangeerrPassword('Vui lòng nhập mật khẩu');
      errPassword = 'Vui lòng nhập mật khẩu';
    }
    setTimeout(() => {
      if (
        errFirstname === '' &&
        errLastname === '' &&
        errEmail === '' &&
        errUsername === '' &&
        errPassword === ''
      ) {
        dispatch(
          signUp({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
          }),
        );
      }
    }, 1000);
  };
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Đăng kí tài khoản'} goback={back} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.container}>
            <View style={styles.space2x} />
            <View style={styles.textInput}>
              <View>
                <TextInput.Signin
                  placeholder={'Tên *'}
                  value={firstname}
                  onChangeText={onChangeFirstname}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>{errfirstname}</Text>
              </View>
              <View style={styles.space} />
              <View>
                <TextInput.Signin
                  placeholder={'Họ *'}
                  value={lastname}
                  onChangeText={onChangeLastname}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>{errlastname}</Text>
              </View>
              <View style={styles.space} />
              <View>
                <TextInput.Signin
                  placeholder={'Email *'}
                  value={email}
                  onChangeText={onChangeEmail}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>{error != '' ? error : erremail}</Text>
              </View>
              <View style={styles.space} />
              <View>
                <TextInput.Signin
                  placeholder={'Mã nhân viên *'}
                  value={username}
                  onChangeText={onChangeUsername}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>
                  {error !== '' ? error : errusername}
                </Text>
              </View>
              <View style={styles.space} />
              <View style={{ width: '80%' }}>
                <TextInput.Signin
                  placeholder={'Mật khẩu *'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={onChangePassword}
                  resetErr={resetErr}
                />
                <Text style={[styles.err, { height: 30 }]}>{errpassword}</Text>
              </View>
            </View>
            <Button.Large
              title={'Đăng kí'}
              backgroundColor={AppStyles.colors.red}
              textColor={AppStyles.colors.white}
              onPress={SignUp}
            />
          </View>
          <Modal.Success />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  space: {
    height: scaleHeight(1.5),
  },
  space2x: {
    height: scaleHeight(4),
  },
  textInput: {
    marginBottom: scaleHeight(5),
  },
  err: {
    height: 15,
    fontSize: 10,
    color: AppStyles.colors.red,
    fontWeight: '400',
    paddingLeft: 5,
    paddingTop: 2,
  },
});

export default Signup;
