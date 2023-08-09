import { Header, Item } from '@components';
import * as NavigationService from '@navigate/NavigationService';
import { notification } from '@slices/notification';
import { AppStyles } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Notification = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.notification.notificationList);

  const total_pages =
    useSelector(
      state => state.notification?.total_pages
    ) ?? 1;

  const loadingNotify =
    useSelector(
      state => state.notification?.loadingNotify
    );

  // const dateFilter = data.filter(item => item.order_id !== null)

  // console.log(dateFilter)
  const loading = useSelector((state) => state.app.loadingItem);

  useEffect(() => {
    dispatch(notification({ type: 'delivery' }));
  }, [dispatch]);

  const back = () => {
    NavigationService.goBack();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(notification({ type: 'delivery' }));
    setCurrentPage(1);
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const loadMore = () => {
    if (currentPage < total_pages) {
      console.log('load more : ', currentPage + 1)
      setCurrentPage(currentPage + 1);
    }
  };

  const getNotifyList = () => {
    dispatch(notification({
      type: 'delivery',
      currentPage
    }));
  };

  React.useEffect(() => {
    getNotifyList();
  }, [currentPage]);

  const renderHeader = () =>
    !loading && data.length < 1 ? (
      <Text style={styles.none}>Bạn chưa có thông báo nào</Text>
    ) : null;
  return (
    <View style={AppStyles.styles.container}>
      <Header.Notify title={'Thông báo'} goback={back} />
      <View style={styles.container}>
        {loading && data.length < 1 ? (
          <View style={styles.loading}>
            <Item.LoaderSmall />
          </View>
        ) : null}
        {renderHeader()}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            width: '94%',
            backgroundColor: AppStyles.colors.white,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            margin: 10,
            borderTopStartRadius: 10,
            borderTopRightRadius: 10,

            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            // borderBottomWidth: 5,
          }}
          style={styles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          maxToRenderPerBatch={20}
          onEndReached={loadMore}
          renderItem={({ item, index }) => (
            <Item.Notify
              item={item}
              index={index}
              lastIndex={data.length - 1}
            />
          )}
          ListFooterComponent={() =>
            loadingNotify ? <View style={styles.itemLoadMore}>
              {
                (loadingNotify && currentPage > 1) ?
                  <ActivityIndicator
                    size="small"
                    color="#F6C74C"
                  /> : <View />
              }
            </View> : <View />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    alignItems: 'center',
  },
  footer: {
    height: 20,
  },
  list: {
    // marginBottom: 10
  },
  none: {
    textAlign: 'center',
    color: AppStyles.colors.text,
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    marginTop: 10,
  },
  itemLoadMore: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
});

export default Notification;
