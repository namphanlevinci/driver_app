import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as TopBar from './TopBar';
import { images, AppStyles } from '@theme';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from '@slices/notification';

export const Main = (props) => {
  const dispatch = useDispatch();
  const { notifications, account } = props;
  const data = useSelector((state) => state.notification.notificationList);
  const count = data.length - 1;

  useEffect(() => {
    dispatch(notification({ type: 'delivery' }));
  }, []);

  return (
    <TopBar.Bar
      style={AppStyles.styles.topBar}
      leftComponents={
        <TouchableOpacity onPress={account}>
          <TopBar.Action source={images.icons.nav_account} />
        </TouchableOpacity>
      }
      rightComponents={
        <>
          <TouchableOpacity onPress={notifications}>
            <TopBar.Action source={images.icons.nav_notify} />
            <View style={styles.badge}>
              <Text style={styles.text}>{count}</Text>
            </View>
          </TouchableOpacity>
        </>
      }>
      <TopBar.Logo source={images.icons.nav_logo} />
    </TopBar.Bar>
  );
};

export const Back = (props) => {
  const { goback, title } = props;
  return (
    <TopBar.Bar
      style={AppStyles.styles.topBar}
      leftComponents={
        <TouchableOpacity onPress={goback}>
          <TopBar.Action source={images.icons.nav_back} />
        </TouchableOpacity>
      }
      rightComponents={<TopBar.Space />}>
      <Text style={styles.title}>{title}</Text>
    </TopBar.Bar>
  );
};

export const BackOrder = (props) => {
  const { goback, title, time, status } = props;

  const checkStatus = () => {
    switch (status) {
      case 'ready_to_ship':
        return { title: 'Ready To Ship', color: AppStyles.colors.blue };
      case 'shipping':
        return { title: 'Shipping', color: AppStyles.colors.yellow };
      case 'arrived':
        return { title: 'Arrived', color: AppStyles.colors.orange };
      case 'bom':
        return { title: '   Bom   ', color: AppStyles.colors.silver };
      case 'complete':
        return { title: 'Completed', color: AppStyles.colors.silver };
      default:
        return { title: 'Shipping', color: AppStyles.colors.yellow };
    }
  };

  return (
    <TopBar.Bar
      style={AppStyles.styles.topBar}
      leftComponents={
        <TouchableOpacity onPress={goback}>
          <TopBar.Action source={images.icons.nav_back} />
        </TouchableOpacity>
      }
      rightComponents={
        <View style={[styles.status, { backgroundColor: checkStatus().color }]}>
          <Text style={styles.colors}>{checkStatus().title}</Text>
        </View>
      }>
      <View style={styles.content}>
        <Text style={styles.title}>Đơn hàng #{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TopBar.Bar>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16.5,
    fontWeight: 'bold',
    color: AppStyles.colors.white,
  },
  time: {
    fontSize: 14,
    color: AppStyles.colors.white,
  },
  content: {
    marginRight: -45,
    alignItems: 'center',
  },
  status: {
    height: 25,
    borderRadius: 20,
    backgroundColor: AppStyles.colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -12,
  },
  colors: {
    paddingLeft: 5,
    paddingRight: 5,
    color: AppStyles.colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: AppStyles.colors.yellow,
    position: 'absolute',
    top: '15%',
    left: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 10,
    color: AppStyles.colors.text,
    fontWeight: 'bold',
    padding: 2,
    paddingHorizontal: 4,
  },
});
