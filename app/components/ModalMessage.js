import { AppStyles, images } from '@theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  MessageText,
  Send,
  Time,
} from 'react-native-gifted-chat';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from '../redux/slices/app';
import {
  FirebaseContext,
  fireStoreService,
  COLLECTIONS,
  DOCUMENTS,
} from '@firebase';
import firestore from '@react-native-firebase/firestore';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const DEFAULT_USER_ID = 2;

const ModalMessage = ({ orderNumber }) => {
  const dispatch = useDispatch();

  const { user, signInAnonymously } = React.useContext(FirebaseContext);
  const [conversation, setConversation] = React.useState(null);

  const message = useSelector((state) => state.app.message);

  const hide = () => {
    // setConversation(null);
    // setMessages(null);
    dispatch(hideMessage());
  };

  const [messages, setMessages] = useState(null);

  // useEffect(() => {
  //   setMessages([]);
  // }, []);

  React.useEffect(() => {
    if (!user) {
      signInAnonymously();
    }
  }, [user, signInAnonymously]);

  const loadConversation = async () => {
    let convers = await fireStoreService.getConversation(orderNumber);
    if (!convers?._exists) {
      convers = await fireStoreService.createConversation(orderNumber);
    }
    setConversation(convers);
  };

  React.useEffect(() => {
    if (orderNumber && user) {
      loadConversation();
    }

    // Stop listening for updates when no longer required
  }, [user, orderNumber]);

  React.useEffect(() => {
    const setupListener = () => {
      const subscriber = firestore()
        .collection(COLLECTIONS.public_message)
        .doc(orderNumber + '')
        .collection(COLLECTIONS.message)
        .onSnapshot((querySnapshot) => {
          const list = querySnapshot.docs
            ?.map((documentSnapshot) => {
              return Object.assign({}, documentSnapshot.data(), {
                _id: documentSnapshot.id,
              });
            })
            .sort((a, b) => b.createdAt - a.createdAt);

          setMessages(list);
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    };

    if (conversation) {
      setupListener();
    }
  }, [conversation]);

  const onSend = (listMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, listMessages),
    );

    listMessages?.forEach((msg) => {
      fireStoreService.sendMessage(
        orderNumber,
        Object.assign({}, msg, {
          createdAt: new Date().getTime(),
          user: {
            name: 'Shipper',
            _id: DEFAULT_USER_ID,
          },
        }),
      );
    });
  };

  const sendSuggest = (key) => {
    const id_item = messages === null ? 1 : messages.length + 1;
    switch (key) {
      case 1:
        const obj_1 = {
          _id: id_item,
          text: 'Tôi đã đến nơi',
          createdAt: new Date().getTime(),
          user: {
            _id: DEFAULT_USER_ID,
            name: 'Shipper',
          },
        };
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, obj_1),
        // );
        onSend([obj_1]);

        break;
      case 2:
        const obj_2 = {
          _id: id_item,
          text: 'Đơn hàng đang được giao',
          createdAt: new Date().getTime(),
          user: {
            _id: DEFAULT_USER_ID,
            name: 'Shipper',
          },
        };
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, obj_2),
        // );
        onSend([obj_2]);
        break;
      default:
        break;
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.suggest}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => sendSuggest(1)}>
            <Text style={styles.text}>Tôi đã đến nơi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sendSuggest(2)}>
            <Text style={styles.text}>Đơn hàng đã được giao</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderSendButton = (props) => {
    return (
      <Send {...props} containerStyle={[styles.close, styles.send_btn]}>
        <Image source={images.icons.send} />
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#FFF', borderRadius: 5 },
          left: { backgroundColor: '#FFF', borderRadius: 5 },
        }}
        bottomContainerStyle={{
          left: { backgroundColor: '#FFF' },
          right: { backgroundColor: '#FFF' },
        }}
      />
    );
  };

  const renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        containerStyle={{
          left: { backgroundColor: '#E6E6E6', borderRadius: 15 },
          right: { backgroundColor: '#A9F5F2', borderRadius: 15 },
        }}
        textStyle={{
          left: { color: '#1B1B1B', fontSize: 12 },
          right: { color: '#1B1B1B', fontSize: 12 },
        }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: AppStyles.colors.silver,
            fontSize: 8,
            fontWeight: 'bold',
            paddingTop: 2,
          },
          right: {
            color: AppStyles.colors.silver,
            fontSize: 8,
            fontWeight: 'bold',
            paddingTop: 2,
          },
        }}
      />
    );
  };

  return (
    <Modal isVisible={message} style={{ margin: 0 }}>
      <View style={styles.container}>
        <View style={styles.header_message}>
          <TouchableOpacity style={styles.close} onPress={hide}>
            <Image source={images.icons.nav_close} />
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              { color: AppStyles.colors.text, marginBottom: 0 },
            ]}>
            Tin nhắn
          </Text>
          <View
            style={[styles.close, { backgroundColor: AppStyles.colors.yellow }]}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: AppStyles.colors.white }}>
          <GiftedChat
            messages={messages}
            placeholder="Nhập tin nhắn..."
            isKeyboardInternallyHandled={true}
            alwaysShowSend={true}
            renderAvatar={null}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: DEFAULT_USER_ID,
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: AppStyles.colors.red,
    marginBottom: 15,
    fontFamily: Platform.OS === 'android' ? 'MergeBlack' : 'SVN-Merge',
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
    width: deviceWidth,
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: AppStyles.colors.yellow,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowColor: '#000',
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
    paddingVertical: 10,
  },
  text: {
    color: AppStyles.colors.blue,

    marginLeft: 10,
    marginRight: 10,

    borderWidth: 1,
    borderColor: AppStyles.colors.blue,
    borderRadius: 5,
    padding: 5,
    marginBottom: 1,
  },
  send_btn: {
    backgroundColor: AppStyles.colors.yellow,
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ModalMessage;
