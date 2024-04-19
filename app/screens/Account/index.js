import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from '../../components';
import { images, AppStyles } from '../../theme';

const Account = () => (
  <View style={AppStyles.styles.container}>
    <Header.Back title={'Thông tin tài khoản'} />
    <SafeAreaView style={styles.container} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default Account;
