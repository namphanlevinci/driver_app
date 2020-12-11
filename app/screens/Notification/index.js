import { Header, Item } from '@components';
import * as NavigationService from '@navigate/NavigationService';
import { notification } from '@slices/notification';
import { AppStyles } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Notification = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const data = useSelector((state) => state.notification.notificationList);
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

    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const renderHeader = () => (
    !loading && data.length < 1 ?
    <Text style={styles.none}>Bạn chưa có thông báo nào</Text> : null
  )
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Thông báo'} goback={back} />
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
          data={data.slice(0, 20)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Item.Notify
              item={item}
              index={index}
              lastIndex={data.length - 1}
            />
          )}
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
    marginTop: 10
  }
});

export default Notification;
