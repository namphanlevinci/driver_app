import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Button from "./Button";
import { hideModal, hideBom, hideMessage } from '../redux/slices/app';
import { images, AppStyles } from '@theme';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const ModalMessage = () => {
    const data = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 1
        },
        
    ]
    const dispatch = useDispatch();
    const message = useSelector((state) => state.app.message);

    const hide = () => {
        dispatch(hideMessage());
    }
    return (
        <Modal
            isVisible={message}
            style={{  margin: 0 }}
            avoidKeyboard={true}
        >
            <View style={styles.container}>

                <View style={styles.header_message}>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={hide}>
                        <Image
                            source={images.icons.nav_close}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: AppStyles.colors.text, marginBottom: 0 }]}>Tin nhắn</Text>
                    <View style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]} />
                </View>

                <View style={{ flex: 1, backgroundColor: AppStyles.colors.white, }}>
                    <FlatList
                        contentContainerStyle={{
                            alignItems: 'center',
                            backgroundColor: AppStyles.colors.white,
                        }}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        inverted={true}

                        keyExtractor={(item, index) => index.toString()}
                        renderItem={() => <View style={{width: deviceWidth, height: 20,marginBottom: 20}}><Text>Hi</Text></View>}

                    />

                </View>
                <View style={styles.footer_message} >
                    <View style={styles.suggest}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <Text style={styles.text}>Tôi đã đến nơi</Text>
                        <Text style={styles.text}>Tôi đồng ý</Text>
                        <Text style={styles.text}>Đơn hàng sắp đến nơi</Text>
                        </ScrollView>
                        

                    </View>
                    <View style={[styles.row, styles.send]}>
                        <TextInput
                        placeholder='Nhập tin nhắn'
                            style={styles.text_input}
                        />
                        <TouchableOpacity
                            style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]}
                            onPress={hide}>
                            <Image
                                source={images.icons.send}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,

        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    body: {
        width: deviceWidth,
        height: deviceHeight / 2,
        backgroundColor: AppStyles.colors.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: AppStyles.colors.red,
        marginBottom: 15
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
        width: deviceWidth,
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: AppStyles.colors.yellow,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer_message: {
        width: deviceWidth,
        height: 100,
        backgroundColor: AppStyles.colors.white,
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

    suggest: {
        height: '50%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: AppStyles.colors.blue,
        
        marginLeft: 20,
        borderWidth: 1,
        borderColor: AppStyles.colors.blue,
        borderRadius: 5,
        padding: 5
    }

})

export default ModalMessage;

