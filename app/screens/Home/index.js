import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Header, Modal, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '@slices/app';
import { logout } from '@slices/account';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const data = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ]

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification)
  }

  const show = () => {
    dispatch(showModal());
  }

  const isLogout = () => {
    dispatch(logout());
  }

  return (
    <View style={AppStyles.styles.container}>
      <Header.Main
        notification={navigateNotification}
        account={isLogout}
      />
      <View style={styles.container}>
        <View style={styles.order}>
          <FlatList
            style={styles.list}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <View >
              <Text style={styles.title}>Đơn Hàng Mới</Text>
              <FlatList
                style={styles.list}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => <Item.Order />}
              />
              <Text style={styles.title}>Đã Giao Gần Đây</Text>
            </View>
            }
            renderItem={() => <Item.Order />}
            ListFooterComponent={() => <View style={styles.list} />}
          />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
  },
  order: {
    marginLeft: scaleWidth(2.5),
    marginRight: scaleWidth(2.5),
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: AppStyles.colors.text,
    marginLeft: 10,
  },
  list: {
    paddingTop: 10,
  }
});

export default HomeScreen;
