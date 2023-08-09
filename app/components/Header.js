import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as TopBar from './TopBar';
import { images, AppStyles } from '@theme';
import { useSelector, useDispatch } from 'react-redux';
import { notification, markReadAllNotification } from '@slices/notification';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

export const Main = (props) => {
  const dispatch = useDispatch();
  const { notifications, account } = props;
  const total_unread = useSelector(
    state => state.notification?.total_unread
  ) ?? 0;;

  console.log({ total_unread })

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
            {total_unread > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.text}>{total_unread}</Text>
              </View>
            ) : null}
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

export const Notify = (props) => {
  const dispatch = useDispatch();
  const { goback, title } = props;

  const markReadAll = () => {
    dispatch(markReadAllNotification());
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
        <TouchableOpacity onPress={markReadAll}>
          <Icon name="checkmark-done-outline" color="#FFF" size={25} />
        </TouchableOpacity>
      }>
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
        return { title: 'Completed', color: AppStyles.colors.green };
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
        <Text style={styles.time}>
          {moment(time).format('hh:mm A, DD/MM/YYYY')}
        </Text>
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
    fontSize: 12,
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
    fontSize: 9,
    color: AppStyles.colors.text,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
});
