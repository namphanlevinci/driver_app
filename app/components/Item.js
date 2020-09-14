import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { images, AppStyles } from '@theme';
import { scaleWidth, scaleHeight } from '@lib/isIphoneX';

export const Order = (props) => {
    const { } = props;
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.order_name}>Đơn hàng #0000067</Text>
                    <View style={styles.status_order}>
                        <Text style={styles.status_color}>Ready to ship</Text>
                    </View>
                </View>
                <Text style={styles.time}>1 Phút trước</Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.name}>Giao đến:</Text>
                        <Text style={styles.money}>Nguyen Van A</Text>
                        <Text style={styles.address}>249 Lý Thường Kiệt, P.15, Q.Tân Bình, Tp.HCM</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.col}>
                        <Text style={styles.name}>Tổng thanh toán:</Text>
                        <Text style={styles.money}>170.000 đ</Text>
                        <View style={styles.status_pay}>
                            <Text style={styles.status_color}>Thẻ / Ví điện tử</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
};

export const Notify = (props) => {
    const { } = props;
    return (
        <TouchableOpacity style={styles.body}>
           <Text>dksagdkjsagdjksagd</Text>
                {/* <View style={styles.row}>
                    <Text style={styles.order_name}>Đơn hàng #0000067</Text>
                    <View style={styles.status_order}>
                        <Text style={styles.status_color}>Ready to ship</Text>
                    </View>
                </View> */}


        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    body: {
        width: scaleWidth(90),
        borderRadius: 5,
        backgroundColor: AppStyles.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        padding: 10
    },
    status_order: {
        width: '35%',
        backgroundColor: AppStyles.colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    status_color: {
        color: AppStyles.colors.white
    },
    status_pay: {
        width: '80%',
        backgroundColor: AppStyles.colors.green,
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 5
    },
    order_name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colors.text
    },
    time: {
        fontSize: 12,
        color: '#484848'
    },
    line: {
        height: '100%',
        width: 0.5,
        backgroundColor: AppStyles.colors.silver
    },
    col: {
        width: '45%'
    },
    name: {
        color: AppStyles.colors.silver
    },
    money: {
        color: AppStyles.colors.text,
        fontWeight: 'bold'
    },
    address: {
        color: AppStyles.colors.text,
    } 

})
