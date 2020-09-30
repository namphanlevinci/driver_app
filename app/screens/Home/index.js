import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl, StatusBar } from 'react-native';
import { Header, Modal, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '../ScreenName';
import { useDispatch, useSelector } from 'react-redux';
import { orderList } from '@slices/order';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector((state) => state.app.loadingItem);
  const newOrder = useSelector((state) => state.order.new);
  const recentlyOrder = useSelector((state) => state.order.recently);

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification)
  }

  const opened = () => {
    navigation.openDrawer()
  }

  useEffect(() => {
    dispatch(orderList())
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(orderList())

    wait(2000).then(() => setRefreshing(false));
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
            width: scaleWidth(90),
            margin: 5,
            marginTop: 15
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={recentlyOrder}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <View>
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
              renderItem={({ item, index }) => <Item.Order item={item}  status={true} />}
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
          renderItem={({ item, index }) => <Item.Order item={item}  status={false} />}
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
