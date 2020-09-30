import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { Header, Item, Button, Modal, ModalMessage } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showBom, showMessage } from '@slices/app';
import { orderDetail } from '@slices/order';
import { Shipping, Arrived, Bom, Complete } from '@slices/statusOrder';

const NewOrder = (props) => {
  const dispatch = useDispatch();
  const id = props.route.params.id
  const orderInfo = useSelector((state) => state.order.orderDetail);
  const status = useSelector((state) => state.statusOrder.status);
  
  const back = () => {
    NavigationService.goBack()
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

  const setShipping = () => {
    dispatch(Shipping({ id: id }));
  }

  const setArrived = () => {
    dispatch(Arrived({ id: id }));
  }

  const setBom = () => {
    dispatch(Bom({ id: id }));
  }

  const setComplete = () => {
    dispatch(Complete({ id: id }));
  }


  return (
    <View style={AppStyles.styles.container}>
      <Header.BackOrder title={orderInfo?.order_number} time={orderInfo?.created_at} status={orderInfo?.status} goback={back} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            width: '95%',
            margin: 5,
            marginTop: 15,
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
            backgroundColor={AppStyles.colors.red}
            textColor={AppStyles.colors.white}
            onPress={showBomModal}
          />
        </View>

        <Button.LargeRadius
          title={'SHIPPING'}
          backgroundColor={AppStyles.colors.yellow}
          textColor={AppStyles.colors.text}
          onPress={show}
        />
      </View>

      <Modal.Completed />
      <Modal.Bom />
      <ModalMessage />
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
