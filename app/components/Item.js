import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images, AppStyles } from '@theme';
import ScreenName from '@screen/ScreenName';
import * as NavigationService from '@navigate/NavigationService';
import ContentLoader, { Rect } from "react-content-loader/native";
import moment from 'moment';

const deviceWidth = Dimensions.get("window").width;

export const Loader = (props) => (
    <View style={styles.body}>
        <ContentLoader
            speed={1}
            width={deviceWidth * 0.9}
            height={140}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#e3e2e2"
            {...props}
        >
            <Rect x="15" y="8" rx="3" ry="3" width="300" height="10" />
            <Rect x="15" y="26" rx="3" ry="3" width="52" height="10" />
            <Rect x="15" y="56" rx="3" ry="3" width="60" height="10" />
            <Rect x="15" y="72" rx="3" ry="3" width="370" height="10" />
            <Rect x="15" y="100" rx="3" ry="3" width="178" height="10" />
            <Rect x="15" y="120" rx="3" ry="3" width="278" height="10" />
            <Rect x="15" y="140" rx="3" ry="3" width="78" height="10" />

        </ContentLoader>
    </View>

)

export const Order = (props) => {
    const { id, order_number, status, time, firstname, lastname, address, grand_total, created_at, payment_method } = props.item;

    const check_status = (status) => {
        switch (status) {
            case 'processing':
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
                return { color: AppStyles.colors.silver }
                break;
        }
    }

    const check_payment = (payment_method) => {
        switch (payment_method) {
            case 'Thanh toán tiền mặt':
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

    const gotoDetail = (id) => {
        if (props.status) {
            NavigationService.navigate(ScreenName.NewOrder, { id: id })
        } else {
            NavigationService.navigate(ScreenName.OldOrder, { id: id })
        }

    }

    return (
        <TouchableOpacity style={styles.body} onPress={() => gotoDetail(id)}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.order_name}>#{order_number}</Text>
                    <View style={[styles.status_order, { backgroundColor: check_status(status).color }]}>
                        <Text style={styles.status_color}>{status}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{created_at}</Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.name}>Giao đến:</Text>
                        <Text style={styles.money}>{firstname} {lastname}</Text>
                        <Text style={styles.address}>{address}</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.col}>
                        <Text style={styles.name}>Tổng thanh toán:</Text>
                        <Text style={styles.money}>{grand_total} đ</Text>
                        <View style={[styles.status_pay, { backgroundColor: check_payment(payment_method).color }]}>
                            <Text style={styles.status_color}>{payment_method}</Text>
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
            <View style={[styles.row, styles.padding, {alignItems: 'center'}]}>
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

export const Info = (props) => {
    const { firstname, lastname, address } = props;
    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={styles.padding}>
                <Text style={styles.money}>{firstname} {lastname} </Text>
                <Text >{address}</Text>
            </View>
        </View>
    );
};

export const Payment = (props) => {
    const { payment_method, grand_total } = props;
    const payment = 'card'
    const check_payment = (payment) => {
        switch (payment) {
            case 'Thanh toán tiền mặt':
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
            <View style={[styles.row, styles.padding, { alignItems: 'center' }]}>
                <Text style={styles.money}>{grand_total} đ</Text>
                <View style={[styles.status_pay, { backgroundColor: check_payment(payment_method).color }]}>
                    <Text style={styles.status_color}>{payment_method}</Text>
                </View>
            </View>
        </View>
    );
};

export const OrderInfo = (props) => {
    const { name, qty, price, options } = props.item;
    return (
        <View style={[styles.body, { marginTop: 10 }]}>
            <View style={[styles.row, styles.padding]}>
                <View style={styles.left}>
                    <Text style={styles.money}>{name}</Text>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text>{item.name} x{item.qty} (+{item.price}đ)</Text>}
                    />
                </View>
                <View style={[styles.right, styles.row]}>
                    <View style={styles.border}>
                        <Text style={styles.count}>x{qty}</Text>
                    </View>
                    <Text style={styles.money}>{price}đ</Text>
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
        marginBottom: 15,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
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
        // width: 110,
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
        width: 25,
        height: 25,
        borderColor: AppStyles.colors.red,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5
    },
    count: {
        fontSize: 13,
        padding: 3,
        color: AppStyles.colors.red,
        fontWeight: '500',
        textAlign: 'center'
    },
    size: {
        width: 50,
        height: 50

    }

})
