import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import { Header, Item } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetail } from '@slices/order';

const OldOrder = (props) => {
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.order.orderDetail);

  // const orderInfo = {
  //   "address": "61 Cao Thang Ho Chi Minh",
  //   "created_at": "2020-09-23 09:37:25",
  //   "firstname": "Luc",
  //   "grand_total": 382000,
  //   "phone": "0935265561",
  //   "id": 10,
  //   "lastname": "Nguyen",
  //   "order_number": "000000050",
  //   "payment_method": "Thanh toán tiền mặt",
  //   "status": "complete",
  //   "items": [
  //     {
  //       "name": "1 miếng gà sốt cay + Khoai Tây + Nước",
  //       "qty": 2,
  //       "price": 73000,
  //       "options": [
  //         {
  //           "name": "Large Fries",
  //           "qty": 1,
  //           "price": 9000,
  //         }
  //       ]
  //     },
  //     {
  //       "name": "1 miếng gà sốt cay + Khoai Tây + Nước",
  //       "qty": 2,
  //       "price": 73000,
  //       "options": [
  //         {
  //           "name": "Large Fries",
  //           "qty": 1,
  //           "price": 9000,
  //         }
  //       ]
  //     }
  //   ]
  // }

  const back = () => {
    NavigationService.goBack()
  }

  useEffect(() => {
    const id = props.route.params.id
    dispatch(orderDetail({ id: id }))
  }, []);

  return (
    <View style={AppStyles.styles.container}>
      <Header.BackOrder title={orderInfo?.order_number} time={orderInfo?.created_at} status={orderInfo?.status} goback={back} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            padding: 20,
          }}
          ListHeaderComponent={() => <View >
            <Text style={styles.title}>Giao đến</Text>
            <Item.Info firstname={orderInfo?.firstname} lastname={orderInfo?.lastname} address={orderInfo?.address} />
            <Text style={styles.title}>Tổng thanh toán</Text>
            <Item.Payment grand_total={orderInfo?.grand_total} payment_method={orderInfo?.payment_method} />
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
          </View>
          }

          data={orderInfo?.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) => <Item.OrderInfo item={item} />}

          ListFooterComponent={() => <View style={{ marginTop: 30 }}>
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
    // flex: 1,
    backgroundColor: AppStyles.colors.background,
    // alignItems: 'center'
    justifyContent: 'center'
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: AppStyles.colors.text,
  },
  space: {
    height: 100
  }
});

export default OldOrder;
