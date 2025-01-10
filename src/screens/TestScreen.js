import { useCallback, useEffect, useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput, Platform, Alert, Image } from "react-native";
import BeatButton from "../components/Button";

import { fetchUserAvatar, getUserProfile } from "../user";
import { auth } from "../../config/firebase";
import { socket } from "../../utils";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { sendMessage, fetchMessages } from "../messaging";


export default function TestChat({navigation, route}){
  
  const [roomId, setRoomId] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [slave, setSlave] = useState({});
  const [master, setMaster] = useState({});
  const [messages,setMessages] = useState([]);

  const renderBubble = (props) => {
    return (
      <Bubble {...props}
        wrapperStyle={{
          left: { backgroundColor: '#e6e6e6' },
          right: { backgroundColor: '#006DAA'},
      }}/>
    );
  };
  
  useEffect(()=>{ // DONT TOUCH THIS USEEFFECT
    // tests10 and 9
    (async ()=>{
      setRoomId(route.params.roomId);
      socket.emit("join_room", {roomId: route.params.roomId});
      const user = await getUserProfile(auth.currentUser.uid);
      setMaster(user);

      let chatRoomMsgs = Object.values(await fetchMessages(route.params.roomId));
      if(chatRoomMsgs.length == 0) return;
      for(let i = 0; i < chatRoomMsgs.length; ++i){
        chatRoomMsgs[i].createdAt = new Date(chatRoomMsgs[i].createdAt);
      }
      chatRoomMsgs = chatRoomMsgs.sort((a,b)=>b.createdAt-a.createdAt);
      
      setMessages(prevMessages => GiftedChat.append(
        prevMessages, chatRoomMsgs
      ));
    })();
    console.log("Socket connected:", socket.connected);
  }, []);
  
  function onRec(data) { 
    console.log(`Rec: ${data[0].text}`);
    setMessages(prevMessages => GiftedChat.append(
      prevMessages, data.message
    ));
    // setReceivedMsg(data.message);
  }

  useEffect(()=>{
    // console.log("In use effect [socket]");
    if (!socket.hasListeners("receive_message")) {
      socket.on("receive_message", (data)=>{
        setMessages(prevMessages => GiftedChat.append(
          prevMessages, data.message
        ));
      });
    }
    // console.log(userAvatar);

    return () => {
        socket.off("receive_message");
    };
  }, []);

  async function onSend(message){ // DONT TOUCH THAT NEITHER
    if(message === "") return;
    console.log("sent");
    await sendMessage(route.params.roomId, message[0]);
    setMessages(prevMessages => GiftedChat.append(prevMessages, message));
    socket.emit("send_message", {master, message: message, roomId});
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat bottomOffset={Platform.OS == "android"? 50: 30}
        messages={messages} onSend={message => onSend(message)}
        user={{
          _id: auth.currentUser.uid,
          name: master?.username,
        }}
        renderUsername={(props) => 
            <View>
              <Text>{props.currentMessage.user.name}</Text>
              {props.renderBubble(props)}
            </View>
          }
        renderBubble={renderBubble}
      />
     </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});