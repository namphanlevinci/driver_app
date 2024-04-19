import { Header, Item } from '../../components';
import * as NavigationService from '../../navigation/NavigationService';
import { orderDetail, resetOrderDetail } from '../../redux/slices/order';
import { AppStyles } from '../../theme';
import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const OldOrder = ({ route, ...props }) => {
  const { params } = route;
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.order.orderDetail);

  const back = () => {
    NavigationService.goBack();
    dispatch(resetOrderDetail());
  };

  useEffect(() => {
    const { id } = params;
    dispatch(orderDetail({ id: id }));
  }, [dispatch, params]);

  const backAction = () => {
    back();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
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
                firstname={orderInfo?.firstname}
                lastname={orderInfo?.lastname}
                address={orderInfo?.address}
                phone={orderInfo?.phone}
                customer_phone={orderInfo?.customer_phone}
              />
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
          ListFooterComponent={() => (
            <View style={{ marginTop: 30 }}>
              <Text style={styles.title}>Đánh giá của khách hàng</Text>
              <Item.Rating rating={orderInfo?.customer_rating} />
              <Item.Reviews review={orderInfo?.customer_comment} />
              <View style={styles.space} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: AppStyles.colors.background,
    // alignItems: 'center'
    justifyContent: 'center',
  },
  title: {
    fontSize: 21,
    // fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    color: AppStyles.colors.text,
  },
  space: {
    height: 100,
  },
});

export default OldOrder;
