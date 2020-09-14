import React from 'react';
import { View, StyleSheet, Text, Modal, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';
import * as Button from "./Button";
import { hideModal } from '../redux/slices/app';
import { images, AppStyles } from '@theme';

export const Success = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.app.isVisible);

    const hide = () => {
        dispatch(hideModal());
    }
    return (
        <Modal visible={isVisible} transparent>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.6)",
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
        marginBottom: 15
    },
    content: {
        fontSize: 16,
        color: AppStyles.colors.text,
        textAlign: 'center',
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15
    },

})
