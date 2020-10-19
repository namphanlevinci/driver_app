import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item } from '@components';
import * as NavigationService from '@navigate/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '@slices/notification';
import { images, AppStyles, toCommas } from '@theme';
import ScreenName from '@screen/ScreenName';

const Notification = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notification.notificationList);
  const loading = useSelector((state) => state.app.loadingItem);

  useEffect(() => {
    dispatch(notification({ type: 'delivery' }))
  }, []);

  const back = () => {
    NavigationService.goBack()
  }

  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Thông báo'} goback={back} />
      <View style={styles.container}>
        {loading && data.length < 1 ?
          <View style={styles.loading}>
            <Item.LoaderSmall />
          </View> : null
        }
        <FlatList
          contentContainerStyle={{
            width: '100%',
            backgroundColor: AppStyles.colors.background,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            margin: 5,
            borderTopStartRadius: 10,
            borderTopRightRadius: 10,

            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

          }}
          style={styles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) => <Item.Notify item={item} index={index} lastIndex={data.length - 1} />}
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
  footer: {
    paddingTop: 200,
    backgroundColor: '#FFF',
  }
});

export default Notification;
