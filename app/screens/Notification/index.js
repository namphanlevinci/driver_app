import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';

const Notification = () => {
  const data = [
    {
      "id": 1,
      "title": "Đơn hàng mới",
      "content": "Bạn vừa nhận được đơn hàng mới",
      "isNew": true
    },
    {
      "id": 2,
      "title": "Bạn nhận được đánh giá 5 sao",
      "content": "Khách hàng Nguyen van D đánh giá bạn 5 sao",
      "isNew": true
    },
    {
      "id": 3,
      "title": "Đơn hàng mới",
      "content": "Bạn vừa nhận được đơn hàng mới",
      "isNew": true
    },
    {
      "id": 4,
      "title": "Bạn nhận được đánh giá 5 sao",
      "content": "Khách hàng Nguyen van D đánh giá bạn 5 sao",
      "isNew": false
    },
    {
      "id": 5,
      "title": "Đơn hàng mới",
      "content": "Bạn vừa nhận được đơn hàng mới",
      "isNew": false
    },
    {
      "id": 6,
      "title": "Bạn nhận được đánh giá 5 sao",
      "content": "Khách hàng Nguyen van D đánh giá bạn 5 sao",
      "isNew": false
    },

  ]
  const back = () => {
    NavigationService.goBack()
  }
  return (
    <View style={AppStyles.styles.container}>
      <Header.Back title={'Thông báo'} goback={back} />
      <View style={styles.container}>
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
            margin: 10,
            borderTopStartRadius: 10,
            borderTopRightRadius: 10,

            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
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

  list: {
  }
});

export default Notification;
