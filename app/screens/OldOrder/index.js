import React from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Header } from '@components';
import { images, AppStyles } from '@theme';

const OldOrder= () => (
  <View style={AppStyles.styles.container}>
    <Header.Back title={'Danh sách đơn hàng'} />
    <SafeAreaView style={styles.container} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default OldOrder;
