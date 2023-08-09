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
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Platform,
} from 'react-native';
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
    console.log('76546789879665890',{ id })
    switch (orderInfo?.status) {
      case 'ready_to_ship':
        console.log('--------------- 1 ----------------')
        dispatch(Shipping({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(1000).then(() => dispatch(deliveryOrderList()));
        // wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
        break;
      case 'shipping':
        console.log('--------------- 2 ----------------')
        dispatch(Arrived({ id: id }));
        wait(1000).then(() => dispatch(orderDetail({ id: id })));
        wait(1000).then(() => dispatch(deliveryOrderList()));
        // wait(1000).then(() => dispatch(recentlyOrderList({ page: 1 })));
        break;
      case 'arrived':
        console.log('--------------- 3 ----------------')
        show();
        break;
      default:
        console.log('--------------- 4 ----------------')
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

  const backAction = () => {
    back();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                firstname={orderInfo?.firstname || ''}
                lastname={orderInfo?.lastname || ''}
                address={orderInfo?.address || ''}
                phone={orderInfo?.phone || ''}
                customer_phone={orderInfo?.customer_phone}
              />
              <Item.Notes review={orderInfo?.note || ''} />
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
                ? AppStyles.colors.redblur
                : AppStyles.colors.red
            }
            active={orderInfo?.status === 'ready_to_ship' ? 1 : 0.2}
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
      <ModalMessage orderNumber={orderInfo?.order_number} />
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
    // fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
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
