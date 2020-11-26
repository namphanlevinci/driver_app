import { Button, Header, Item, Modal, ModalMessage } from '@components';
import * as NavigationService from '@navigate/NavigationService';
import { showBom, showMessage, showModal } from '@slices/app';
import {
  deliveryOrderList,
  orderDetail,
  recentlyOrderList,
  resetOrderDetail,
} from '@slices/order';
import { Arrived, Bom, Complete, Shipping } from '@slices/statusOrder';
import { AppStyles, images } from '@theme';
import React, { useEffect } from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const NewOrder = (props) => {
  const dispatch = useDispatch();
  const id = props.route.params.id;
  const orderInfo = useSelector((state) => state.order.orderDetail);

  const back = () => {
    NavigationService.goBack();
    dispatch(resetOrderDetail());
  };

  const callNow = () => {
    const phoneNumber = orderInfo?.phone;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const show = () => {
    dispatch(showModal());
  };
  const showBomModal = () => {
    dispatch(showBom());
  };
  const showMessageModal = () => {
    dispatch(showMessage());
  };

  useEffect(() => {
    dispatch(orderDetail({ id: id }));
  }, [dispatch, id]);

  const setBom = () => {
    dispatch(Bom({ id: id }));
    // wait(1000).then(() => dispatch(orderDetail({ id: id })));
    wait(1000).then(() => dispatch(deliveryOrderList()));
    wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
    // wait(2000).then(() => back());
  };

  const setComplete = () => {
    dispatch(Complete({ id: id }));
    // wait(1000).then(() => dispatch(orderDetail({ id: id })));
    wait(1000).then(() => dispatch(deliveryOrderList()));
    wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
    // wait(2000).then(() => back());
  };

  const setStatus = () => {
    switch (orderInfo?.status) {
      case 'ready_to_ship':
        dispatch(Shipping({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(1000).then(() => dispatch(deliveryOrderList()));
        // wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
        break;
      case 'shipping':
        dispatch(Arrived({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(1000).then(() => dispatch(deliveryOrderList()));
        // wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
        break;
      case 'arrived':
        show();
        break;
      default:
        break;
    }
  };

  const checkStatus = (status) => {
    switch (status) {
      case 'ready_to_ship':
        return { title: 'SHIPPING', color: AppStyles.colors.yellow };
      case 'shipping':
        return { title: 'ARRIVED', color: AppStyles.colors.orange };
      case 'arrived':
        return { title: 'COMPLETED', color: AppStyles.colors.silver };
      default:
        return { title: 'SHIPPING', color: AppStyles.colors.yellow };
    }
  };

  return (
    <View style={AppStyles.styles.container}>
      <Header.BackOrder
        title={orderInfo?.order_number}
        time={orderInfo?.created_at}
        status={orderInfo?.status}
        goback={back}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            padding: 20,
          }}
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.title}>Giao đến</Text>
              <Item.Info
                firstname={orderInfo?.firstname}
                lastname={orderInfo?.lastname}
                address={orderInfo?.address}
              />
              <Item.Reviews review={orderInfo?.customer_comment} />
              <Text style={styles.title}>Tổng thanh toán</Text>
              <Item.Payment
                grand_total={orderInfo?.grand_total}
                payment_method={orderInfo?.payment_method}
              />
              <Text style={styles.title}>Chi tiết đơn hàng</Text>
            </View>
          )}
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
            backgroundColor={
              orderInfo?.status === 'ready_to_ship'
                ? AppStyles.colors.silver
                : AppStyles.colors.red
            }
            textColor={AppStyles.colors.white}
            icon={images.icons.closed}
            onPress={
              orderInfo?.status === 'ready_to_ship' ? null : showBomModal
            }
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
  );
};

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
    height: 30,
  },
  footer: {
    width: '100%',
    height: 135,
    backgroundColor: AppStyles.colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewOrder;
