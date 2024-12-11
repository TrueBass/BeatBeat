import {
  FRONT_SOCKET_URI
} from "@env";

import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView, TextInput } from "react-native";
import io from "socket.io-client"; 
import BeatButton from "../components/Button";

import { getUserProfile } from "../user";
import { auth } from "../../config/firebase";

// const socket = io(FRONT_SOCKET_URI);
// const socket = io("http:// 192.168.56.1:3001");


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
  // let roomId = "";
  const [slave, setSlave] = useState({});
  const [master, setMaster] = useState({});
  const [messages,setMessages] = useState([]);
  const [message, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");
  // const [socket, setSocket] = useState();
  
  // useEffect(()=>{ // DONT TOUCH THIS USEEFFECT
  //   // setSocket(io(FRONT_SOCKET_URI));
  //   // socket.connect();
  //   (async ()=>{
  //     const user = await getUserProfile(auth.currentUser.uid);
  //     user["friends"] = {
  //       uid: user.username == "test2"? "BultKSwW43fvH2JVrtVwvViOTrf1": "K44844gGR6YVgam3DL5ylrQEWkg2"
  //     };
  //     user["uid"] = auth.currentUser.uid;
  //     setRoomId([user.friends.uid,auth.currentUser.uid].sort().join(""));
  //     // roomId = [user.friends.uid,auth.currentUser.uid].sort().join("");
  //     socket.emit("join_room", {roomId: [user.friends.uid,auth.currentUser.uid].sort().join("")});
  //     setMaster(user);
  //   })();
  //   console.log("Socket connected:",socket.connected);
  //   socket.on("receive_message", (data)=>{
  //     console.log("Rec:", data.message);
  //     setMessages([...messages, {text: data.message, id: messages.length}]);
  //   });
  // }, []);
  
  // useEffect(()=>{
  //   console.log("In use effect [socket]");
    
    
  // }, [socket]);

  function onSend(){ // DONT TOUCH THAT NEITHER
    // if(message === "") return;
    // console.log("sent");
    // // setMessages([...messages, {text: message, id: messages.length}]);
    // socket.emit("send_message", {master, message, roomId});
    // setMsg("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Message: "{receivedMsg}"</Text>
      <TextInput value={message} onChangeText={setMsg}/>
      <BeatButton onPress={onSend} title="Send" />
      
      <FlatList style={styles.flatList}
      data={messages}
      keyExtractor={item=>item.id}
      renderItem={
        ({item})=><Text style={{fontSize: 16, borderColor: "red", borderWidth: 1, color: "black"}}>{item.text}</Text>
      }
      /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    justifyContent: "center",
    // alignItems: "stretch"
  },
  flatList: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  }
});