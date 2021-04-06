import { scaleHeight, scaleWidth } from '@lib/isIphoneX';
import * as NavigationService from '@navigate/NavigationService';
import ScreenName from '@screen/ScreenName';
import { closeModal } from '@slices/account';
import { AppStyles, images, toCommas } from '@theme';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideBom,
  hideLoading,
  hideModal,
  hideNewOrder,
  hideRatingOrder,
} from '../redux/slices/app';
import * as Button from './Button';
import * as Item from './Item';
import moment from 'moment';

const ScrollText = ({ label, numberOfLines, containerStyle = {} }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={containerStyle}
    //contentContainerStyle={styles.txtContent}
  >
    <Text
      numberOfLines={numberOfLines}
      style={{ fontSize: 11, textAlign: 'center' }}>
      {label}
    </Text>
  </ScrollView>
);

export const Loading = () => {
  const dispatch = useDispatch();

  // Timeout hide loading
  setTimeout(() => {
    dispatch(hideLoading());
  }, 5000);

  const isLoading = useSelector((state) => state.app.isLoading);
  return (
    <Modal visible={isLoading} transparent>
      <View style={styles.container}>
        <Spinner
          isVisible={true}
          size={60}
          type={'ThreeBounce'}
          color={'white'}
        />
      </View>
    </Modal>
  );
};

export const Success = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.account.popupSuccess);

  const hide = () => {
    dispatch(closeModal());
  };

  const back = () => {
    hide();
    NavigationService.goBack();
  };

  return (
    <Modal visible={isVisible} transparent animationType={'none'}>
      <View style={styles.container}>
        <View style={styles.success}>
          <Image style={styles.image} source={images.icons.success} />
          <Text style={styles.title}>ĐĂNG KÝ THÀNH CÔNG</Text>
          <Button.Medium
            title={'ĐĂNG NHẬP'}
            onPress={back}
            backgroundColor={AppStyles.colors.yellow}
            textColor={AppStyles.colors.text}
          />
        </View>
      </View>
    </Modal>
  );
};

export const Completed = (props) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.app.isVisible);

  const hide = () => {
    dispatch(hideModal());
  };

  const isComplete = () => {
    props.onPress();
    dispatch(hideModal());
  };

  return (
    <Modal visible={isVisible} transparent animationType={'none'}>
      <View style={styles.container}>
        <View style={styles.confirm}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.close} onPress={hide}>
              <Image source={images.icons.nav_close} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { color: AppStyles.colors.text, marginBottom: 0 },
              ]}>
              Xác nhận
            </Text>
            <View
              style={[
                styles.close,
                { backgroundColor: AppStyles.colors.yellow },
              ]}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.content}>Đơn hàng đã giao hoàn tất?</Text>
            <View style={styles.row}>
              <Button.SmallRadius
                title={'Huỷ'}
                backgroundColor={AppStyles.colors.silver}
                textColor={AppStyles.colors.white}
                onPress={hide}
              />
              <View style={{ width: 25 }} />
              <Button.SmallRadius
                title={'Đồng ý'}
                backgroundColor={AppStyles.colors.red}
                textColor={AppStyles.colors.white}
                onPress={isComplete}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const NewOrder = (props) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.app.newOrder);
  const info = useSelector((state) => state.app.info);

  const hide = () => {
    dispatch(hideNewOrder());
  };

  const goToDetail = () => {
    hide();
    NavigationService.navigate(ScreenName.Home);
  };
  return (
    <Modal visible={isVisible} transparent animationType={'none'}>
      <View style={styles.container}>
        <View style={[styles.confirm, { height: 320 }]}>
          <View style={[styles.header, { height: '20%' }]}>
            <TouchableOpacity style={styles.close} onPress={hide}>
              <Image source={images.icons.nav_close} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { color: AppStyles.colors.text, marginBottom: 0 },
              ]}>
              ĐƠN HÀNG MỚI
            </Text>
            <View
              style={[
                styles.close,
                { backgroundColor: AppStyles.colors.yellow },
              ]}
            />
          </View>
          <View style={[styles.footer, { height: '80%' }]}>
            <View style={styles.new_order}>
              <Text
                style={[styles.content, { marginLeft: 0, marginBottom: 5 }]}>
                Đơn hàng #{info?.order_number}
              </Text>
              <Text style={styles.time}>
                {moment
                  .utc(info?.created_at)
                  .local()
                  .format('hh:mm A, DD/MM/YYYY')}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                  marginVertical: 15,
                },
              ]}>
              <View style={[styles.col]}>
                <Text style={styles.name}>Giao đến:</Text>
                <Text style={styles.money}>
                  {info?.lastname} {info?.firstname}
                </Text>
                <Text style={styles.address}>{info?.address}</Text>
              </View>
              <View style={styles.line} />
              <View style={styles.col}>
                <Text style={styles.name}>Tổng thanh toán:</Text>
                <Text style={styles.money}>
                  {toCommas(Math.round(info?.grand_total))}đ
                </Text>
                <View style={[styles.status_pay]}>
                  <Text style={styles.status_color}>
                    {info?.payment_method}
                  </Text>
                </View>
              </View>
            </View>

            <Button.LargeRadius
              title={'CHI TIẾT ĐƠN HÀNG'}
              backgroundColor={AppStyles.colors.red}
              textColor={AppStyles.colors.white}
              onPress={goToDetail}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const RatingOrder = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.app.ratingOrder);
  const info = useSelector((state) => state.app.info);
  const recentlyOrder = useSelector((state) => state.order.recently);

  const id = recentlyOrder?.find((item) => item.id == info?.id)?.order_number;

  const hide = () => {
    dispatch(hideRatingOrder());
  };
  return (
    <Modal visible={isVisible} transparent animationType={'none'}>
      <View style={styles.container}>
        <View style={styles.confirm}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.close} onPress={hide}>
              <Image source={images.icons.nav_close} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { color: AppStyles.colors.text, marginBottom: 0 },
              ]}>
              ĐÁNH GIÁ MỚI
            </Text>
            <View
              style={[
                styles.close,
                { backgroundColor: AppStyles.colors.yellow },
              ]}
            />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.content, { marginBottom: 0 }]}>
              Đơn hàng #{id}
            </Text>
            <Item.Rating
              styles={styles.rating}
              rating={info?.customer_rating}
            />
            <ScrollText
              containerStyle={styles.txtScrollContainer}
              label={info?.customer_comment}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const Bom = (props) => {
  const dispatch = useDispatch();
  const bom = useSelector((state) => state.app.bom);

  const hide = () => {
    dispatch(hideBom());
  };

  const isBom = () => {
    props.onPress();
    dispatch(hideBom());
  };

  return (
    <Modal visible={bom} transparent animationType={'none'}>
      <View style={styles.container}>
        <View style={styles.confirm}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.close} onPress={hide}>
              <Image source={images.icons.nav_close} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { color: AppStyles.colors.text, marginBottom: 0 },
              ]}>
              Xác nhận
            </Text>
            <View
              style={[
                styles.close,
                { backgroundColor: AppStyles.colors.yellow },
              ]}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.content}>
              Không có người nhận đơn hàng này?
            </Text>
            <View style={styles.row}>
              <Button.SmallRadius
                title={'Huỷ'}
                backgroundColor={AppStyles.colors.silver}
                textColor={AppStyles.colors.white}
                onPress={hide}
              />
              <View style={{ width: 25 }} />
              <Button.SmallRadius
                title={'Đồng ý'}
                backgroundColor={AppStyles.colors.red}
                textColor={AppStyles.colors.white}
                onPress={isBom}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  success: {
    width: scaleWidth(85),
    height: scaleHeight(40),
    borderRadius: 10,
    backgroundColor: AppStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: scaleWidth(16),
    height: scaleWidth(15.4),
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
    color: AppStyles.colors.red,
    marginBottom: 15,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppStyles.colors.text,
    textAlign: 'center',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  confirm: {
    width: scaleWidth(90),
    height: 200,
    borderRadius: 10,
    backgroundColor: AppStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '30%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: AppStyles.colors.yellow,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: AppStyles.colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  header_message: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: AppStyles.colors.yellow,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer_message: {
    width: '100%',
    height: '100%',
    backgroundColor: AppStyles.colors.red,
  },
  text_input: {
    width: '80%',
    height: '100%',
  },
  send: {
    height: '50%',
    justifyContent: 'center',
    backgroundColor: AppStyles.colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loading: {
    width: 100,
    height: 100,
  },
  rating: {
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
    marginBottom: 0,
    marginTop: 0,
    // marginTop: -5
  },
  txtScrollContainer: { marginTop: -10, flex: 1 },
  txtContent: {
    padding: 10,
  },
  text: {
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: -10,
  },
  new_order: {
    alignItems: 'flex-start',
    width: '90%',
  },
  time: {
    fontSize: 12,
    color: '#484848',
  },
  line: {
    height: '100%',
    width: 0.5,
    backgroundColor: AppStyles.colors.silver,
    marginHorizontal: '2.5%',
  },
  col: {
    width: '42.5%',
  },
  name: {
    color: AppStyles.colors.silver,
    marginBottom: 5,
  },
  money: {
    color: AppStyles.colors.text,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    color: AppStyles.colors.text,
    fontSize: 13,
  },
  status_color: {
    color: AppStyles.colors.white,
    padding: 2,
  },
  status_pay: {
    // width: 110,
    backgroundColor: AppStyles.colors.orange,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 5,
  },
});
