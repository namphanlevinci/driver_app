import React from 'react';
import { View, StyleSheet, Text, Modal, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import * as Button from "./Button";
import * as Item from "./Item";
import { hideModal, hideBom, hideRatingOrder, hideNewOrder, hideLoading } from '../redux/slices/app';
import { images, AppStyles } from '@theme';
import Spinner from 'react-native-spinkit';

export const Loading = () => {
    const dispatch = useDispatch();

    // Timeout hide loading
    setTimeout(() => {
        dispatch(hideLoading());
    }, 5000)

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
    const isVisible = useSelector((state) => state.app.isVisible);

    const hide = () => {
        dispatch(hideModal());
    }
    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.success}>
                    <Image
                        style={styles.image}
                        source={images.icons.success}
                    />
                    <Text style={styles.title}>ĐĂNG KÝ THÀNH CÔNG</Text>
                    <Text style={styles.content}>Cám ơn đã đăng kí, chúng tôi sẽ gửi thông tin đăng nhập qua email cho bạn sau khi kiểm tra thông tin của bạn là xác thực</Text>
                    <Button.Medium
                        title={'ĐỒNG Ý'}
                        onPress={hide}
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
    }

    const isComplete = () => {
        props.onPress();
        dispatch(hideModal());
    }

    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.confirm}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={hide}>
                            <Image
                                source={images.icons.nav_close}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: AppStyles.colors.text, marginBottom: 0 }]}>Xác nhận</Text>
                        <View style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]} />
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

    const hide = () => {
        dispatch(hideNewOrder());
    }
    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={[styles.confirm, { height: scaleHeight(35) }]}>
                    <View style={[styles.header, { height: '20%', }]}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={hide}>
                            <Image
                                source={images.icons.nav_close}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: AppStyles.colors.text, marginBottom: 0 }]}>ĐƠN HÀNG MỚI</Text>
                        <View style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]} />
                    </View>
                    <View style={[styles.footer, { height: '80%' }]}>
                        <View style={styles.new_order}>
                            <Text style={[styles.content, { marginLeft: 0, marginBottom: 5 }]}>Đơn hàng #0000001</Text>
                            <Text style={styles.time}>2020-09-23 09:37:25</Text>
                        </View>
                        <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'stretch', marginVertical: 15}]}>
                            <View style={[styles.col]}>
                                <Text style={styles.name}>Giao đến:</Text>
                                <Text style={styles.money}>lan</Text>
                                <Text style={styles.address}>18 huynh lan khanh phuong 2 tan binh</Text>
                            </View>
                            <View style={styles.line} />
                            <View style={styles.col}>
                                <Text style={styles.name}>Tổng thanh toán:</Text>
                                <Text style={styles.money}>500.000đ</Text>
                                <View style={[styles.status_pay]}>
                                    <Text style={styles.status_color}>Thanh toán tiền mặt</Text>
                                </View>
                            </View>
                        </View>


                        <Button.LargeRadius
                            title={'CHI TIẾT ĐƠN HÀNG'}
                            backgroundColor={AppStyles.colors.red}
                            textColor={AppStyles.colors.white}
                            onPress={hide}
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

    const hide = () => {
        dispatch(hideRatingOrder());
    }
    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.confirm}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={hide}>
                            <Image
                                source={images.icons.nav_close}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: AppStyles.colors.text, marginBottom: 0 }]}>ĐÁNH GIÁ MỚI</Text>
                        <View style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]} />
                    </View>
                    <View style={styles.footer}>
                        <Text style={[styles.content, { marginBottom: 0 }]}>Đơn hàng #00000001</Text>
                        <Item.Rating styles={styles.rating} />
                        <Text style={[styles.text]}>Rất hài lòng, giao hàng nhanh, nhân viên giao hàng nhiệt tình</Text>
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
    }

    const isBom = () => {
        props.onPress();
        dispatch(hideBom());
    }

    return (
        <Modal visible={bom} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.confirm}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={hide}>
                            <Image
                                source={images.icons.nav_close}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: AppStyles.colors.text, marginBottom: 0 }]}>Xác nhận</Text>
                        <View style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]} />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.content}>Không có người nhận đơn hàng này?</Text>
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
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    body: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    success: {
        width: scaleWidth(85),
        height: scaleHeight(50),
        borderRadius: 10,
        backgroundColor: AppStyles.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: scaleWidth(16),
        height: scaleWidth(15.4),
        marginBottom: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: AppStyles.colors.red,
        marginBottom: 15,
        textAlign: 'center'
    },
    content: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppStyles.colors.text,
        textAlign: 'center',
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    confirm: {
        width: scaleWidth(85),
        height: scaleHeight(25),
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
        alignItems: 'center'
    },
    footer: {
        width: '100%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: AppStyles.colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    header_message: {
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: AppStyles.colors.yellow,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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
        shadowColor: "#000",
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
        height: 100
    },
    rating: {
        shadowColor: "#FFF",
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
    text: {
        fontSize: 11,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: -10
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
        marginHorizontal: '2.5%'
    },
    col: {
        width: '42.5%'
    },
    name: {
        color: AppStyles.colors.silver,
        marginBottom: 5
    },
    money: {
        color: AppStyles.colors.text,
        fontWeight: 'bold',
        marginBottom: 5
    },
    address: {
        color: AppStyles.colors.text,
        fontSize: 13,
    },
    status_color: {
        color: AppStyles.colors.white,
        padding: 2
    },
    status_pay: {
        // width: 110,
        backgroundColor: AppStyles.colors.orange,
        alignItems: 'center',
        borderRadius: 3,
        marginTop: 5
    },

})
