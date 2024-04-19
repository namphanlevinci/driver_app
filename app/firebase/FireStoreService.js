import firestore from '@react-native-firebase/firestore';
import React from 'react';

export const COLLECTIONS = {
  public_message: 'public-message',
  message: 'messages',
};

export const DOCUMENTS = {
  order: 'order',
};

class FireStoreService {
  onResult(QuerySnapshot) {
    console.log('Got Users collection result.');
  }

  onError(error) {
    console.error(error);
  }

  // func query message for doc id (order id)
  async getMessageList(conversationId) {
    if (!conversationId) return null;
    const conId = conversationId + '';

    const messages = await firestore()
      .collection(COLLECTIONS.public_message)
      .doc(conId)
      .collection(COLLECTIONS.message)
      .get();

    return messages;
  }

  // tao room (nhieu nguoi join dc) or conversation (2 nguoi)
  async createConversation(conversationId) {
    if (!conversationId) return;
    const conId = conversationId + '';

    await firestore().collection(COLLECTIONS.public_message).doc(conId).set({
      name: conId,
      id: conId,
    });
  }
  // tao room (nhieu nguoi join dc) or conversation (2 nguoi)
  async getConversation(conversationId) {
    if (!conversationId) return;
    const conId = conversationId + '';
    // Logger.debug(conId + '', 'get conversationId');
    return await firestore()
      .collection(COLLECTIONS.public_message)
      .doc(conId)
      .get();
  }

  // func send message for doc id (order id)
  sendMessage(conversationId, content) {
    if (!conversationId) return;

    const conId = conversationId + '';

    firestore()
      .collection(COLLECTIONS.public_message)
      .doc(conId)
      .collection(COLLECTIONS.message)
      .add(content);
  }
}

const fireStoreService = new FireStoreService();

export { fireStoreService };
