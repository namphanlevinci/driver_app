import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { images, AppStyles, toCommas } from '@theme';
import ScreenName from '@screen/ScreenName';
import * as NavigationService from '@navigate/NavigationService';
import ContentLoader, { Rect } from "react-content-loader/native";
import moment from 'moment';
import { set } from 'react-native-reanimated';

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
            case 'ready_to_ship':
                return { title: 'Ready To Ship', color: AppStyles.colors.blue }
            case 'arrived':
                return { title: 'Arrived', color: AppStyles.colors.orange }
            case 'bom':
                return { title: 'Bom', color: AppStyles.colors.red }
            case 'shipping':
                return { title: 'Shipping', color: AppStyles.colors.yellow }
            case 'complete':
                return { title: 'Complete', color: AppStyles.colors.silver }
            case 'canceled':
                return { title: 'Canceled', color: AppStyles.colors.silver }
            default:
                return { title: '', color: AppStyles.colors.silver }
        }
    }

    const check_payment = (payment_method) => {
        switch (payment_method, status) {
            case 'Thanh toán tiền mặt' && 'ready_to_ship':
                return { color: AppStyles.colors.orange }
            case 'Thanh toán tiền mặt' && 'shipping':
                return { color: AppStyles.colors.orange }
            case 'Thanh toán tiền mặt' && 'arrived':
                return { color: AppStyles.colors.orange }
            default:
                return { color: AppStyles.colors.silver }
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
                        <Text style={styles.status_color}>{check_status(status).title}</Text>
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
                        <Text style={styles.money}>{toCommas(grand_total)}đ</Text>
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
            <View style={[styles.row, styles.padding, { alignItems: 'center' }]}>
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
                <Text style={styles.money}>{toCommas(grand_total)}đ</Text>
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
        <View style={[styles.item]}>
            <View style={[styles.row, styles.padding]}>
                <View style={styles.left}>
                    <Text style={styles.money}>{name}</Text>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text>{item.name} x{item.qty} (+{toCommas(item.price)}đ)</Text>}
                    />
                </View>
                <View style={[styles.right, styles.row]}>
                    <View style={styles.border}>
                        <Text style={styles.count}>x{qty}</Text>
                    </View>
                    <Text style={styles.money}>{toCommas(price)}đ</Text>
                </View>
            </View>
        </View>
    );
};

export const Rating = (props) => {
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [five, setFive] = useState(false);

    useEffect(() => {
        switch (props.rating) {
            case 1:
                setOne(true)
                break;
            case 2:
                setOne(true)
                setTwo(true)
                break;
            case 3:
                setOne(true)
                setTwo(true)
                setThree(true)
                break;
            case 4:
                setOne(true)
                setTwo(true)
                setThree(true)
                setFour(true)
                break;
            case 5:
                setOne(true)
                setTwo(true)
                setThree(true)
                setFour(true)
                setFive(true)
                break;

            default:
                break;
        }
    }, []);


    return (
        <View style={[styles.body, { marginTop: 10 }, props.styles]}>
            <View style={[styles.row_center, styles.padding]}>
                <Image
                    style={styles.size}
                    source={one ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={two ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={three ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={four ? images.icons.start_active : images.icons.start}
                />
                <Image
                    style={styles.size}
                    source={five ? images.icons.start_active : images.icons.start}
                />
            </View>
        </View>
    );
};

export const Reviews = (props) => {
    return (
        <View style={[styles.body]}>
            <View style={[styles.row, styles.padding]}>
                <Text>{props?.review}</Text>
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

    item: {
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
        // marginBottom: 30,
        marginTop: 15,
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
        width: '35%',
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
