import React from 'react';
import {StyleSheet, Platform, View, TouchableOpacity, Text} from 'react-native';
import {scaleHeight} from '../../lib/isIphoneX';
import {AppStyles} from '../../theme';
import NotificationSetting from 'react-native-open-notification';

import Modal from 'react-native-modal';

const ModalOpenNotify = () => {
  return (
    <Modal isVisible={true}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Vui lòng bật thông báo trong cài đặt để đăng nhập vào ứng dụng
        </Text>
        <TouchableOpacity
          onPress={() => NotificationSetting.open()}
          style={styles.button}>
          <Text style={styles.txtButton}>MỞ THÔNG BÁO</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    color: AppStyles.colors.red,
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    padding: scaleHeight(3),
  },
  button: {
    backgroundColor: AppStyles.colors.red,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: scaleHeight(6),
  },
  txtButton: {
    color: 'white',
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
  },
});
export default ModalOpenNotify;
