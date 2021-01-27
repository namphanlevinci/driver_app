import { Header, Item } from '@components';
import * as NavigationService from '@navigate/NavigationService';
import { hideLoadingItem } from '@slices/app';
import { deliveryOrderList, recentlyOrderList } from '@slices/order';
import { AppStyles } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenName from '../ScreenName';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const loading = useSelector((state) => state.app.loadingItem);
  const newOrder = useSelector((state) => state.order.new);
  const recentlyOrder = useSelector((state) => state.order.recently);

  const navigateNotification = () => {
    NavigationService.navigate(ScreenName.Notification);
  };

  const opened = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    dispatch(deliveryOrderList());
    dispatch(recentlyOrderList({ page: page }));
    setTimeout(() => {
      dispatch(hideLoadingItem());
    }, 5000);
  }, [dispatch, page]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(deliveryOrderList());
    dispatch(recentlyOrderList({ page: 1 }));

    wait(2000).then(() => setRefreshing(false));
    wait(3000).then(() => dispatch(hideLoadingItem())); // Timeout hide loading
  }, [dispatch]);

  return (
    <View style={AppStyles.styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Header.Main notifications={navigateNotification} account={opened} />
      <View style={styles.container}>
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingLeft: 15,
            paddingRight: 15,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={recentlyOrder}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.space} />
              <Text style={styles.title}>ĐƠN HÀNG MỚI</Text>
              {loading && newOrder.length < 1 ? (
                <View style={styles.loading}>
                  <Item.Loader />
                </View>
              ) : null}
              <FlatList
                style={styles.list}
                data={newOrder}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Item.Order item={item} status={true} />
                )}
              />
              <Text style={[styles.title, { paddingTop: 3 }]}>
                ĐÃ GIAO GẦN ĐÂY
              </Text>
              {loading && recentlyOrder.length < 1 ? (
                <View style={styles.loading}>
                  <Item.Loader />
                </View>
              ) : null}
              <View style={styles.list} />
            </View>
          )}
          renderItem={({ item, index }) => (
            <Item.Order item={item} status={false} />
          )}
          ListFooterComponent={() => <View style={styles.list} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    // alignItems: 'center'
  },

  title: {
    fontSize: 21,
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    color: AppStyles.colors.text,
  },
  list: {
    paddingTop: 10,
  },
  loading: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  space: {
    height: 10,
  },
});

export default HomeScreen;
