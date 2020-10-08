import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, TextInput, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Button from "./Button";
import { hideModal, hideBom, hideMessage } from '../redux/slices/app';
import { images, AppStyles } from '@theme';
import Modal from 'react-native-modal';
import { GiftedChat, Send, Bubble, MessageText, Time } from 'react-native-gifted-chat'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const ModalMessage = () => {

    const dispatch = useDispatch();
    const message = useSelector((state) => state.app.message);

    const hide = () => {
        dispatch(hideMessage());
    }

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const sendSuggest = (key) => {
        const id_item = messages.length < 1 ? 1 : messages.length + 1
        switch (key) {
            case 1:
                const obj_1 = {
                    _id: id_item,
                    text: 'Tôi đã đến nơi',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: '',
                    },
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, obj_1))
                break;
            case 2:
                const obj_2 = {
                    _id: id_item,
                    text: 'Tôi đồng ý',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: '',
                    },
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, obj_2))
                break;
            case 3:
                const obj_3 = {
                    _id: id_item,
                    text: 'Đơn hàng sắp đến nơi',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: '',
                    },
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, obj_3))
                break;
            default:
                break;
        }
    }

    const renderFooter = () => {
        return (
            <View style={styles.suggest}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => sendSuggest(1)}>
                        <Text style={styles.text}>Tôi đã đến nơi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sendSuggest(2)}>
                        <Text style={styles.text}>Tôi đồng ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sendSuggest(3)}>
                        <Text style={styles.text}>Đơn hàng sắp đến nơi</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    const renderSendButton = (props) => {
        return (
            <Send {...props} containerStyle={[styles.close, styles.send_btn]}>
                <Image
                    source={images.icons.send}
                />
            </Send>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble {...props}
                wrapperStyle={{
                    right: { backgroundColor: '#FFF', borderRadius: 5 },
                    left: { backgroundColor: '#FFF', borderRadius: 5 },
                }}
                bottomContainerStyle={{
                    left: { backgroundColor: '#FFF' },
                    right: { backgroundColor: '#FFF' },
                }}

            />
        )
    }

    const renderMessageText = (props) => {
        return (
            <MessageText {...props}
                containerStyle={{
                    left: { backgroundColor: '#E6E6E6', borderRadius: 15 },
                    right: { backgroundColor: '#A9F5F2', borderRadius: 15 },
                }}
                textStyle={{
                    left: { color: '#1B1B1B', fontSize: 12 },
                    right: { color: '#1B1B1B', fontSize: 12 },
                }}

            />
        )
    }

    const renderTime = (props) => {
        return (
            <Time {...props}
                timeTextStyle={{
                    left: { color: AppStyles.colors.silver, fontSize: 10, fontWeight: 'bold', paddingTop: 2 },
                    right: { color: AppStyles.colors.silver, fontSize: 10, fontWeight: 'bold', paddingTop: 2 },
                }}
            />
        )
    }


    return (
        <Modal
            isVisible={message}
            style={{ margin: 0 }}
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
                    <GiftedChat
                        messages={messages}
                        placeholder='Nhập tin nhắn...'
                        isKeyboardInternallyHandled={true}
                        alwaysShowSend={true}
                        renderAvatar={null}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        renderChatFooter={renderFooter}
                        renderSend={renderSendButton}
                        renderBubble={renderBubble}
                        renderMessageText={renderMessageText}
                        renderTime={renderTime}
                    />

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
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    text: {
        color: AppStyles.colors.blue,

        marginLeft: 10,
        marginRight: 10,

        borderWidth: 1,
        borderColor: AppStyles.colors.blue,
        borderRadius: 5,
        padding: 5
    },
    send_btn: {
        backgroundColor: AppStyles.colors.yellow,
        marginRight: 10,
        marginBottom: 5
    }

})

export default ModalMessage;

