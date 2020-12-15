import firebase from "firebase";
import { useEffect, useState } from 'react';

function ChatSDK() {
    const [uid, setUid] = useState(null);
    const [messagesRef , setMessagesRef ] = useState(null);

    useEffect(() => {
        firebase.initializeApp({
            apiKey: "AIzaSyCroh4YEvOo6aoQIdcuwT_ezyoSYzOny1c",
            authDomain: "delivery-jollibee.firebaseapp.com",
            databaseURL: "https://delivery-jollibee.firebaseio.com",
            projectId: "delivery-jollibee",
            storageBucket: "delivery-jollibee.appspot.com",
            messagingSenderId: "320365913986",
            appId: "1:320365913986:web:7507a4fe5954d64262919b",
            measurementId: "G-8J831MLPHB"
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        alert(error.message);
                    });
            }
        });
    })
    // retrieve the messages from the Backend
    const loadMessages = (callback) => {
        const checkMessagesRef = firebase.database().ref("messages");
        setMessagesRef(checkMessagesRef)
        messagesRef.off(); //Detaches a callback previously attached with on()
        const onReceive = data => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                //createdAt: new Date(message.createdAt),
                createdAt: message.createdAt,
                user: {
                    _id: message.user._id,
                    name: message.user.name
                }
            });
        };

        const d = getLimit();
        console.log(d);
        //Generates a new Query object limited to the last specific number of children.
        //this.messagesRef.limitToLast(10).on("child_added", onReceive);
        messagesRef
            .orderByChild("createdAt")
            //.startAt(d)
            //.endAt("2017-11-27T06:51:47.851Z")
            .on("child_added", onReceive);
    }
    // send the message to the Backend
    const sendMessage = (message) => {
        //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
        const today = new Date();
        /* today.setDate(today.getDate() - 30);
        const timestamp = new Date(today).toISOString(); */
        const timestamp = today.toISOString();
        for (let i = 0; i < message.length; i++) {
            messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: timestamp
            });
        }
    }
    // close the connection to the Backend
    const closeChat = () => {
        if (messagesRef) {
            messagesRef.off();
        }
    }

    const getLimit = () => {
        const today = new Date();
        //const milliseconds = Date.parse(today);
        //const changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
        today.setDate(today.getDate() - 31); // last 30 Days
        //console.log(today);
        const changedISODate = new Date(today).toISOString();
        //const changedISODate = today.toISOString();
        return changedISODate;
    }
    return uid;
}

export default ChatSDK;