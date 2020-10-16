import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Header, TextInput, Button, Modal } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '@slices/account';

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
    NavigationService.goBack()
  };

  resetErr = () => {
    onChangeerrFirstname('');
    onChangeerrLastname('');
    onChangeerrEmail('');
    onChangeerrUsername('');
    onChangeerrPassword('');
    dispatch(clearError());
  }

  const validate = () => {
    if (firstname === '') {
      onChangeerrFirstname('Vui lòng nhập tên')
    }
    if (lastname === '') {
      onChangeerrLastname('Vui lòng nhập họ')
    }
    const checkemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!checkemail.test(email)) {
      onChangeerrEmail('Email không hợp lệ')
    }
    if (email === '') {
      onChangeerrEmail('Vui lòng nhập email')
    }
    if (username === '') {
      onChangeerrUsername('Vui lòng nhập tên đăng nhập')
    }
    const checkpass = /^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{7,})$/
    if (!checkpass.test(password)) {
      onChangeerrPassword('Mật khẩu phải có ít nhất 7 kí tự gồm số và chữ')
    }
    if (password === '') {
      onChangeerrPassword('Vui lòng nhập mật khẩu')
    }
  }

  const Signup = () => {
    validate()
    if (errfirstname === '' && errlastname === '' && erremail === '' && errusername === '' && errpassword === ''
      && firstname != '' && lastname != '' && email != '' && username != '' && password != '') {
      dispatch(signUp({ firstname: firstname, lastname: lastname, email: email, username: username, password: password }));
    }
  }
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
                  placeholder={'Tên đăng nhập *'}
                  value={username}
                  onChangeText={onChangeUsername}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>{error != '' ? error : errusername}</Text>
              </View>
              <View style={styles.space} />
              <View>
                <TextInput.Signin
                  placeholder={'Mật khẩu *'}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={onChangePassword}
                  resetErr={resetErr}
                />
                <Text style={styles.err}>{errpassword}</Text>
              </View>
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
  err: {
    height: 15,
    fontSize: 10,
    color: AppStyles.colors.red,
    fontWeight: '400',
    paddingLeft: 5,
    paddingTop: 2
  }
});


export default Signup;
