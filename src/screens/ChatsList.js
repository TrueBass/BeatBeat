import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity, Platform, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette } from "../colors/palette";
import { button, toast, buttonText } from "../styles/style";
import { auth, realtimeDB } from "../../config/firebase";
import { ref, get } from "firebase/database";
import { getUserChatrooms } from "../user";
import { createChatroom } from "../chatHelpers";
import Toast from 'react-native-toast-message';

export default function ChatsList({navigation, route}){

  // messages in giftedChat
  // [
  //   {
  //     "_id": "e0b99ff8-9a56-4349-adb4-54a0ebf7876e",
  //     "createdAt": "2024-12-16T00:45:40.381Z",
  //     "text": "Hello",
  //     "user": {}
  //   }
  // ]

  const [chats, setChats] = useState([]);

  function onOpenChat(roomId){
    // console.log("item",item);
    // Toast.show({
    //   type: 'info',
    //   text1: "Chat is openning",
    //   text1Style: toast.text1Style,
    //   visibilityTime: 3000,
    //   topOffset: toast.topOffset
    // });
    navigation.navigate("ChatRoom", {roomId});
  }

  async function setUserChatRooms(){
    // const userChatroomIds = await getUserChatrooms(auth.currentUser.uid);
    // const userChats = []
    // // console.log(userChatrooms);
    
    const friendsRef = ref(realtimeDB, `users/${auth.currentUser.uid}/friends`);
    const friends = await get(friendsRef);
    const chatroomIds = Object.values(friends.val());
    const chatroomObjs = [];
    for(let i = 0; i < chatroomIds.length; i++){
      chatroomObjs.push({title: i, id: chatroomIds[i]});
    }
    
    setChats(chatroomObjs);
  }
  
  useEffect(()=>{
    // useEffect for fetching chats from rtdb
    if(chats.length != 0) return;
    console.log("In use effect. Setting chats");
    (async()=>await setUserChatRooms())();
    // dummy chats
    // setChats([
    //   {title: "test2", id: "uniquetest2chatid"},
    //   {title: "test3", id: "uniquetest3chatid"},
    //   {title: "test4", id: "uniquetest4chatid"},
    //   {title: "test5", id: "uniquetest5chatid"},
    //   {title: "test6", id: "uniquetest6chatid"},
    //   {title: "test7", id: "uniquetest7chatid"},
    //   {title: "test8", id: "uniquetest8chatid"},
    //   {title: "test9", id: "uniquetest9chatid"},
    //   {title: "test10", id: "uniquetest10chatid"},
    //   {title: "test11", id: "uniquetest11chatid"},
    //   {title: "test12", id: "uniquetest12chatid"},
    //   {title: "test13", id: "uniquetest13chatid"},
    //   {title: "test14", id: "uniquetest14chatid"},
    // ]);
    // setChats([{id: 0, title: "tests10", id: "G64G6GM0ZycuI1ljmhHbY7pUswJ3HmpjuvbBpGMWDfNQGwvd9YE66Xy1"}]);
  }, []);

  async function createChat(){
    const friendId = "HmpjuvbBpGMWDfNQGwvd9YE66Xy1"
    await createChatroom(auth.currentUser.uid, friendId);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="create" onPress={setUserChatRooms}/>
      {chats.length==0?
      <View style={{flex: 1, justifyContent: "center", alignSelf: "center"}}>
        <Text style={buttonText}>You have no chats yet</Text>
      </View>:
      <FlatList
        data={chats}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>
          <TouchableOpacity style={[styles.chatCard,
              item.id == chats[0].id? {marginTop: 20}: {}
            ]} onPress={()=>onOpenChat(item.id)}>
            <Text style={styles.chatTitle}>{item.title}</Text>
          </TouchableOpacity>
        }
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatCard: {
    marginBottom: 20,
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderWidth:1,
    borderRadius: 10,
    // borderColor: Palette.primary.button.borderColor,
    borderColor: "red",
    backgroundColor: Palette.primary.button.background
  },
  chatTitle: {
    fontSize: 16,
    fontFamily: "Helvetica" // is working
  }
});