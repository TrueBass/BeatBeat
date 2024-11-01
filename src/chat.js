import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';
export default function Chat({onBack, myData, selectedUser}) {
    const [messages, setMessages] = useState([]);
    //load old messages
    useEffect(() => {
    const loadData = async () => {
        const myChatroom = await fetchMessages();
        setMessages(renderMessages(myChatroom.messages));
    };

    loadData();
    // set chatroom change listener
}, []);
//renderMessages
//fetchMessages
//onSend
//return
}