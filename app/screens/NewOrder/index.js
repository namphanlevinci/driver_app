import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item, Button } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';

const NewOrder = () => {
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
      <Header.Back title={'Đơn hàng #0000015'} goback={back} />
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
            <Item.Reviews />
            <Text style={styles.title}>Tổng thanh toán</Text>
            <Item.Payment />
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
          </View>
          }

          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) => <Item.OrderInfo item={item} />}

        />
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Button.SmallRadius
            title={'Gọi điện'}
            backgroundColor={AppStyles.colors.blue}
            textColor={AppStyles.colors.white}
          //  onPress={isLogin}
          />
          <Button.SmallRadius
            title={'Nhắn tin'}
            backgroundColor={AppStyles.colors.blue}
            textColor={AppStyles.colors.white}
          //  onPress={isLogin}
          />
          <Button.SmallRadius
            title={'Bom'}
            backgroundColor={AppStyles.colors.red}
            textColor={AppStyles.colors.white}
          //  onPress={isLogin}
          />
        </View>

        <Button.LargeRadius
          title={'SHIPPING'}
          backgroundColor={AppStyles.colors.yellow}
          textColor={AppStyles.colors.text}
        //  onPress={isLogin}
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
  },
  footer: {
    width: '100%',
    height: 150,
    backgroundColor: AppStyles.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {

    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default NewOrder;
