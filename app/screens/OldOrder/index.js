import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';

const OldOrder = () => {
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

  ]
  const back = () => {
    NavigationService.goBack()
  }
  return (
    <View style={AppStyles.styles.container}>
      <Header.BackOrder title={'Đơn hàng #0000015'} time={'10:30, 30-08-2020'} goback={back} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            width: '100%',
            margin: 5,
            marginTop: 15
          }}
          ListHeaderComponent={() => <View >
            <Text style={styles.title}>Giao đến</Text>
            <Item.Info />
            <Text style={styles.title}>Tổng thanh toán</Text>
            <Item.Payment />
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
          </View>
          }

          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) => <Item.OrderInfo item={item} />}

          ListFooterComponent={() => <View >
            <Text style={styles.title}>Đánh giá của khách hàng</Text>
            <Item.Rating />
            <Item.Reviews />
            <View style={styles.space} />
          </View>
          }

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
  },
  space: {
    height: 30
  }
});

export default OldOrder;
