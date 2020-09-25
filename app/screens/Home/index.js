import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Header, Modal, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { orderList } from '@slices/order';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loadingItem);
  const newOrder = useSelector((state) => state.order.new);
  const recentlyOrder = useSelector((state) => state.order.recently);

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

  ]

  const data1 = [
    {
      "id": 3,
      "order_name": "Đơn hàng #0000065",
      "status": "completed",
      "time": "1 phut",
      "name": "Nguyen Van B",
      "address": "Quan 1",
      "total_money": "100000",
      "payment": "card"
    },

  ]

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification)
  }

  const opened = () => {
    navigation.openDrawer()
  }

  const gotoDetailNewOrder = () => {
    NavigationService.navigate(ScreenName.NewOrder)
  }

  const gotoDetailOldOrder = () => {
    NavigationService.navigate(ScreenName.OldOrder)
  }

  useEffect(() => {
    dispatch(orderList())
  }, []);

  return (
    <View style={AppStyles.styles.container}>
      <Header.Main
        notification={navigateNotification}
        account={opened}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            width: scaleWidth(90),
            margin: 5,
            marginTop: 15
          }}
          data={data1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View>
            <Text style={styles.title}>Đơn Hàng Mới</Text>
            {loading && newOrder.length < 1 ?
              <View style={styles.loading}>
                <Item.Loader />
              </View> : null
            }
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Item.Order item={item} newOrder={gotoDetailNewOrder} status={true} />}
            />
            <Text style={styles.title}>Đã Giao Gần Đây</Text>
            {loading && recentlyOrder.length < 1 ?
              <View style={styles.loading}>
                <Item.Loader />
              </View> : null
            }
            <View style={styles.list} />
          </View>
          }
          renderItem={({ item, index }) => <Item.Order item={item} oldOrder={gotoDetailOldOrder} status={false} />}
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
  },
  loading: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  }
});

export default HomeScreen;
