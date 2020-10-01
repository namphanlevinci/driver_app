import React from 'react';
import { View, StyleSheet, Text, Modal, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import * as Button from "./Button";
import { hideModal, hideBom, hideRatingOrder, hideNewOrder } from '../redux/slices/app';
import { images, AppStyles } from '@theme';
import Spinner from 'react-native-spinkit';

export const Loading = () => {
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

export const NewOrder = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.app.newOrder);

    const hide = () => {
        dispatch(hideNewOrder());
    }
    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.success}>
                    <Image
                        style={styles.image}
                        source={images.icons.success}
                    />
                    <Text style={styles.title}>BẠN NHẬN ĐƯỢC ĐƠN HÀNG MỚI</Text>
                    {/* <Text style={styles.content}>Cám ơn đã đăng kí, chúng tôi sẽ gửi thông tin đăng nhập qua email cho bạn sau khi kiểm tra thông tin của bạn là xác thực</Text> */}
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

export const RatingOrder = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.app.ratingOrder);

    const hide = () => {
        dispatch(hideRatingOrder());
    }
    return (
        <Modal visible={isVisible} transparent animationType={'fade'}>
            <View style={styles.container}>
                <View style={styles.success}>
                    <Image
                        style={styles.image}
                        source={images.icons.success}
                    />
                    <Text style={styles.title}>BẠN NHẬN ĐƯỢC ĐÁNH GIÁ 5 SAO</Text>
                    {/* <Text style={styles.content}>Cám ơn đã đăng kí, chúng tôi sẽ gửi thông tin đăng nhập qua email cho bạn sau khi kiểm tra thông tin của bạn là xác thực</Text> */}
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
        // paddingTop: 10,
        flex: 1,
        // backgroundColor: "red"
        // justifyContent: 'center',
        // alignItems: 'center',
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
        fontSize: 24,
        fontWeight: 'bold',
        color: AppStyles.colors.red,
        marginBottom: 15,
        textAlign: 'center'
    },
    content: {
        fontSize: 16,
        color: AppStyles.colors.text,
        textAlign: 'center',
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },
    confirm: {
        width: scaleWidth(80),
        height: scaleHeight(22),
        borderRadius: 10,
        backgroundColor: AppStyles.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '25%',
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
    }

})
