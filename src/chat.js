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
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, selectedUser.chatroomId]);

//renderMessages
//fetchMessages
//const fetchMessages
//onSend
//return
}