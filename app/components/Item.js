import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { images, AppStyles } from '@theme';
import ScreenName from '@screen/ScreenName';
import * as NavigationService from '@navigate/NavigationService';

export const Order = (props) => {
    
    const { order_name, status, time, name, address, total_money, payment } = props.item;

    const check_status = (status) => {
        switch (status) {
            case 'ready':
                return { color: AppStyles.colors.blue }
                break;
            case 'bom':
                return { color: AppStyles.colors.red }
                break;
            case 'shipping':
                return { color: AppStyles.colors.yellow }
                break;
            case 'completed':
                return { color: AppStyles.colors.silver }
                break;
            default:
                return { color: AppStyles.colors.blue }
                break;
        }
    }

    const check_payment = (payment) => {
        switch (payment) {
            case 'cash':
                return { color: AppStyles.colors.orange }
                break;
            case 'card':
                return { color: AppStyles.colors.green }
                break;
            default:
                return { color: AppStyles.colors.silver }
                break;
        }
    }

    return (
        <TouchableOpacity style={styles.body} onPress={props.status ? props.newOrder : props.oldOrder}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.order_name}>{order_name}</Text>
                    <View style={[styles.status_order, { backgroundColor: check_status(status).color }]}>
                        <Text style={styles.status_color}>{status}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{time}</Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.name}>Giao đến:</Text>
                        <Text style={styles.money}>{name}</Text>
                        <Text style={styles.address}>{address}</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.col}>
                        <Text style={styles.name}>Tổng thanh toán:</Text>
                        <Text style={styles.money}>{total_money} đ</Text>
                        <View style={[styles.status_pay, { backgroundColor: check_payment(payment).color }]}>
                            <Text style={styles.status_color}>Thu tiền mặt</Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    );
};

export const Notify = ({ item, index, lastIndex }) => {
    const { title, content, isNew } = item;
    return (
        <TouchableOpacity style={[styles.noti_boby, index === 0 ? styles.border_top : (index === lastIndex ? styles.border_bottom : styles.none_border)]}>
            <View style={[styles.row, styles.padding]}>
                <Image
                    source={isNew ? images.icons.ring_new : images.icons.ring}
                />
                <View style={styles.text}>
                    <Text style={styles.money}>{title}</Text>
                    <Text style={styles.address}>{content}</Text>
                </View>
                <Image
                    source={images.icons.arrow_left}
                />
            </View>
        </TouchableOpacity>
    );
};

export const Info = () => {
    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={styles.padding}>
                <Text style={styles.money}>Nguyen Van A</Text>
                <Text >20 Lý Thường Kiệt, P.15, Q.Tân Bình, Tp.HCM</Text>
            </View>
        </View>
    );
};

export const Payment = () => {
    const payment = 'card'
    const check_payment = (payment) => {
        switch (payment) {
            case 'cash':
                return { color: AppStyles.colors.orange }
                break;
            case 'card':
                return { color: AppStyles.colors.green }
                break;
            default:
                return { color: AppStyles.colors.silver }
                break;
        }
    }
    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={[styles.row, styles.padding]}>
                <Text style={styles.money}>150.000 đ</Text>
                <View style={[styles.status_pay, { backgroundColor: check_payment(payment).color }]}>
                    <Text style={styles.status_color}>Thẻ / Ví điện tử</Text>
                </View>
            </View>
        </View>
    );
};

export const OrderInfo = () => {

    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={[styles.row, styles.padding]}>
                <View style={styles.left}>
                    <Text style={styles.money}>01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM</Text>
                    <Text>Súp bí đỏ (+25.000đ)</Text>
                    <Text>Súp bí đỏ (+25.000đ)</Text>
                </View>
                <View style={[styles.right, styles.row]}>
                    <View style={styles.border}>
                        <Text style={styles.count}>x2</Text>
                    </View>
                    <Text style={styles.money}>150.000 đ</Text>
                </View>


            </View>
        </View>
    );
};

export const Rating = () => {

    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={[styles.row_center, styles.padding]}>
                <Image
                    style={styles.size}
                    source={true ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={true ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={true ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={false ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={false ? images.icons.start_active : images.icons.start}
                />
            </View>
        </View>
    );
};

export const Reviews = () => {

    return (
        <View style={[styles.body]}>
            <View style={[styles.row, styles.padding]}>
                <Text>Ghi chú của khách hàng</Text>
            </View>
        </View>
    );
};






const styles = StyleSheet.create({
    body: {
        width: '100%',
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
        marginBottom: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row_center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        padding: 15
    },
    status_order: {
        width: '35%',
        backgroundColor: AppStyles.colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    status_color: {
        color: AppStyles.colors.white,
        padding: 2
    },
    status_pay: {
        width: 110,
        backgroundColor: AppStyles.colors.green,
        alignItems: 'center',
        borderRadius: 3,
        marginTop: 5
    },
    order_name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colors.text
    },
    time: {
        fontSize: 12,
        color: '#484848',
        marginBottom: 5
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
    noti_boby: {
        width: '100%',
        backgroundColor: AppStyles.colors.white,
        borderBottomColor: AppStyles.colors.background,
        borderBottomWidth: 2
    },
    padding: {
        padding: 15
    },
    text: {
        width: '80%'
    },
    border_top: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    border_bottom: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    left: {
        width: '60%'
    },
    right: {
        width: '30%',
        // justifyContent: 'space-between'
    },

    none_border: {

    },

    border: {
        borderColor: AppStyles.colors.red,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5
    },
    count: {
        padding: 3,
        color: AppStyles.colors.red,
        fontWeight: 'bold'
    },
    size: {
        width: 50,
        height: 50

    }

})
