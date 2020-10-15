import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl, StatusBar } from 'react-native';
import { Header, Modal, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryOrderList, recentlyOrderList } from '@slices/order';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import { showRatingOrder, showNewOrder, hideLoadingItem } from '@slices/app';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector((state) => state.app.loadingItem);
  const newOrder = useSelector((state) => state.order.new);
  const recentlyOrder = useSelector((state) => state.order.recently);

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification)
    // dispatch(showNewOrder());
  }

  const datanew = [
    {
      "address": "18 Huynh Lan Khanh Ho Chi Minh",
      "created_at": "2020-10-01 08:23:33",
      "firstname": "Lan",
      "grand_total": 75000,
      "id": 26,
      "lastname": "Pham",
      "order_number": "000000025",
      "payment_method": "Thanh toán tiền mặt",
      "status": "ready_to_ship",
    }
  ]

  const dataold = [
    {
      "address": "61 Cao Thang Ho Chi Minh",
      "created_at": "2020-10-01 08:23:33",
      "firstname": "Luc",
      "grand_total": 100000,
      "id": 20,
      "lastname": "Nguyen",
      "order_number": "000000050",
      "payment_method": "Thanh toán tiền mặt",
      "status": "complete",
    },

  ]

  const opened = () => {
    navigation.openDrawer()
  }

  useEffect(() => {
    dispatch(deliveryOrderList());
    dispatch(recentlyOrderList({page: page}));
    setTimeout(() => {
      dispatch(hideLoadingItem());
    }, 5000)

  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(deliveryOrderList());
    dispatch(recentlyOrderList({page: 1}));

    wait(2000).then(() => setRefreshing(false));
    wait(3000).then(() => dispatch(hideLoadingItem())); // Timeout hide loading
  }, []);

  return (
    <View style={AppStyles.styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header.Main
        notification={navigateNotification}
        account={opened}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            // padding: 5,
            paddingLeft: 15,
            paddingRight: 15
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={recentlyOrder}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View>
            <View style={styles.space} />
            <Text style={styles.title}>ĐƠN HÀNG MỚI</Text>
            {loading && newOrder.length < 1 ?
              <View style={styles.loading}>
                <Item.Loader />
              </View> : null
            }
            <FlatList
              style={styles.list}
              data={newOrder}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Item.Order item={item} status={true} />}
            />
            <Text style={styles.title}>ĐÃ GIAO GẦN ĐÂY</Text>
            {loading && recentlyOrder.length < 1 ?
              <View style={styles.loading}>
                <Item.Loader />
              </View> : null
            }
            <View style={styles.list} />
          </View>
          }
          renderItem={({ item, index }) => <Item.Order item={item} status={false} />}
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
    // alignItems: 'center'
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
  },
  space: {
    height: 10
  }
});

export default HomeScreen;
