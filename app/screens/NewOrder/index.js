import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList, Dimensions, Linking } from 'react-native';
import { Header, Item, Button, Modal, ModalMessage } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showBom, showMessage } from '@slices/app';
import { orderDetail, orderList } from '@slices/order';
import { Shipping, Arrived, Bom, Complete } from '@slices/statusOrder';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const NewOrder = (props) => {
  const dispatch = useDispatch();
  const id = props.route.params.id
  const orderInfo = useSelector((state) => state.order.orderDetail);

  // const orderInfo = {
  //   "address": "18 Huynh Lan Khanh Ho Chi Minh",
  //   "created_at": "2020-09-23 09:37:25",
  //   "firstname": "Lan",
  //   "grand_total": 382000,
  //   "phone": "0935265561",
  //   "id": 10,
  //   "lastname": "Pham",
  //   "order_number": "000000025",
  //   "payment_method": "Thanh toán tiền mặt",
  //   "status": "ready_to_ship",
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
  
  const callNow = () => {
    const phoneNumber = orderInfo?.phone
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const show = () => {
    dispatch(showModal());
  }
  const showBomModal = () => {
    dispatch(showBom());
  }
  const showMessageModal = () => {
    dispatch(showMessage());
  }

  useEffect(() => {
    dispatch(orderDetail({ id: id }))
  }, []);

  const setBom = () => {
    dispatch(Bom({ id: id }));
    wait(1000).then(() => dispatch(orderDetail({ id: id })));
    wait(2000).then(() => dispatch(orderList()));
    wait(1000).then(() => back());
  }

  const setComplete = () => {
    dispatch(Complete({ id: id }));
    wait(1000).then(() => dispatch(orderDetail({ id: id })));
    wait(2000).then(() => dispatch(orderList()));
    wait(1000).then(() => back());
  }

  const setStatus = () => {
    switch (orderInfo?.status) {
      case 'ready_to_ship':
        dispatch(Shipping({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(2000).then(() => dispatch(orderList()));
        break;
      case 'shipping':
        dispatch(Arrived({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(2000).then(() => dispatch(orderList()));
        break;
      case 'arrived':
        show()
        break;
      default:
        break;
    }
  }

  const checkStatus = (status) => {
    switch (status) {
      case 'ready_to_ship':
        return { title: 'SHIPPING', color: AppStyles.colors.yellow }
      case 'shipping':
        return { title: 'ARRIVED', color: AppStyles.colors.orange }
      case 'arrived':
        return { title: 'COMPLETED', color: AppStyles.colors.silver }
      default:
        return { title: 'SHIPPING', color: AppStyles.colors.yellow }
    }
  }

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
            <Item.Reviews />
            <Text style={styles.title}>Tổng thanh toán</Text>
            <Item.Payment grand_total={orderInfo?.grand_total} payment_method={orderInfo?.payment_method} />
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
          </View>
          }
          data={orderInfo?.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Item.OrderInfo item={item} />}
          ListFooterComponent={() => <View style={styles.space} />}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Button.SmallRadius
            title={'Gọi điện'}
            backgroundColor={AppStyles.colors.blue}
            textColor={AppStyles.colors.white}
            icon={images.icons.phone}
            onPress={callNow}
          />
          <Button.SmallRadius
            title={'Nhắn tin'}
            backgroundColor={AppStyles.colors.blue}
            textColor={AppStyles.colors.white}
            icon={images.icons.message}
            onPress={showMessageModal}
          />
          <Button.SmallRadius
            title={'Bom'}
            backgroundColor={(orderInfo?.status === 'ready_to_ship' || orderInfo?.status === 'shipping') ? AppStyles.colors.silver : AppStyles.colors.red}
            textColor={AppStyles.colors.white}
            icon={images.icons.closed}
            onPress={(orderInfo?.status === 'ready_to_ship' || orderInfo?.status === 'shipping') ? null : showBomModal}
          />
        </View>

        <Button.LargeRadius
          title={checkStatus(orderInfo?.status).title}
          backgroundColor={checkStatus(orderInfo?.status).color}
          textColor={AppStyles.colors.text}
          onPress={setStatus}
        />
      </View>

      <Modal.Completed onPress={setComplete} />
      <Modal.Bom onPress={setBom} />
      <ModalMessage />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,

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
    height: 135,
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
