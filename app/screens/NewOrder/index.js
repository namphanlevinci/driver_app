import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { Header, Item, Button, Modal, ModalMessage } from '@components';
import { images, AppStyles } from '@theme';
import * as NavigationService from '@navigate/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showBom, showMessage } from '@slices/app';
import { orderDetail } from '@slices/order';

const NewOrder = (props) => {
  
  const dispatch = useDispatch();
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
    const id = props.route.params.id
    // console.log(id)
    dispatch(orderDetail({id:id}))
  }, []);


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
          ListFooterComponent={()=><View style={styles.space} />}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Button.SmallRadius
            title={'Gọi điện'}
            backgroundColor={AppStyles.colors.blue}
            textColor={AppStyles.colors.white}
            icon={images.icons.phone}
          //  onPress={isLogin}
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
