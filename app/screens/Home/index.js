import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Header, Modal, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '@slices/app';
import { logout } from '@slices/account';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const data = [
    {
      "id": 1,
      "order_name": "Đơn hàng #0000067",
      "status": "ready",
      "time": "1 phut",
      "name": "Nguyen Van A",
      "address": "61 Cao Thang, Phuong Quan 3",
      "total_money": "100000",
      "payment": "card"
    },
    {
      "id": 2,
      "order_name": "Don hang #0000068",
      "status": "shipping",
      "time": "1 phut",
      "name": "Nguyen Van A",
      "address": "Quan 3",
      "total_money": "100000",
      "payment": "cash"
    },
  ]

  const data1 = [
    {
      "id": 3,
      "order_name": "Đơn hàng #0000065",
      "status": "completed",
      "time": "1 phut",
      "name": "Lan",
      "address": "Quan 3",
      "total_money": "100000",
      "payment": "card"
    },
    {
      "id": 4,
      "order_name": "Đơn hàng #0000066",
      "status": "bom",
      "time": "1 phut",
      "name": "Lan",
      "address": "Quan 3",
      "total_money": "100000",
      "payment": "cash"
    },
  ]

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification)
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
        <FlatList
           contentContainerStyle={{
            width: '100%',
            margin: 5,
            marginTop: 15
          }}
          data={data1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View >
            <Text style={styles.title}>Đơn Hàng Mới</Text>
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Item.Order item={item} />}
            />
            <Text style={styles.title}>Đã Giao Gần Đây</Text>
            <View style={styles.list} />
          </View>
          }
          renderItem={({ item, index }) => <Item.Order item={item} />}
          ListFooterComponent={() => <View style={styles.list} />}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    alignItems: 'center'
  },

  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: AppStyles.colors.text,
    // marginLeft: 10,
  },
  list: {
    paddingTop: 10,
  }
});

export default HomeScreen;
