

import { useCallback, useEffect, useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput, Platform, Alert, Image } from "react-native";
import BeatButton from "../components/Button";

import { fetchUserAvatar, getUserProfile } from "../user";
import { auth } from "../../config/firebase";
import { socket } from "../../utils";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

////////////////////////////////////
// DONT REMOVE ANY COMMENTS       //
// I NEED THEM LATER              //
// JUST MAKE FAKE DATA FOR CHAT   //
// ADD SOMETHING BUT DONT REMOVE  //
// I WILL WORK ON SOCKETS         //
// AND RTDB DATA                  //
////////////////////////////////////

export default function TestChat({navigation}){
  
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
          // right: { backgroundColor: '#FF5A5F'},
      }}/>
    );
  };
  
  useEffect(()=>{ // DONT TOUCH THIS USEEFFECT
    // tests10 and 9
    (async ()=>{
      const user = await getUserProfile(auth.currentUser.uid);
      console.log(user.username, Platform.OS);
      setRoomId("G64G6GM0ZycuI1ljmhHbY7pUswJ3HmpjuvbBpGMWDfNQGwvd9YE66Xy1");
      // roomId = [user.friends.uid,auth.currentUser.uid].sort().join("");
      socket.emit("join_room", {roomId: "G64G6GM0ZycuI1ljmhHbY7pUswJ3HmpjuvbBpGMWDfNQGwvd9YE66Xy1"});
      setMaster(user);
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
      console.log("Registering listener for 'receive_message'");

      socket.on("receive_message", (data)=>{
        setMessages(prevMessages => GiftedChat.append(
          prevMessages, data.message
        ));
      });
    }
    // console.log(userAvatar);

    return () => {
        console.log("Cleaning up listener for 'receive_message'");
        socket.off("receive_message");
    };
  }, []);

  function onSend(message){ // DONT TOUCH THAT NEITHER
    console.log(message[0].text);
    if(message === "") return;
    console.log("sent");
    // setMessages(prevMessages => [...prevMessages, { text: message, id: prevMessages.length + 1 }]);
    setMessages(prevMessages => GiftedChat.append(prevMessages, message,));
    socket.emit("send_message", {master, message: message, roomId});
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat bottomOffset={Platform.OS == "android"? 50: 30}
        messages={messages} onSend={message => onSend(message)}
        user={{
          _id: auth.currentUser.uid,
          name: master?.username,
          avatar: userAvatar
        }}
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