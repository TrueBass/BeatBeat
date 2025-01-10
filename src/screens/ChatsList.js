import React, {useState, useEffect, useLayoutEffect} from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette } from "../colors/palette";
import { buttonText } from "../styles/style";
import { auth, realtimeDB } from "../../config/firebase";
import { getUserChatrooms } from "../chatHelpers";

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
    navigation.navigate("ChatRoom", {roomId});
  }

  async function setUserChatRooms(){
    const chatroomIds = await getUserChatrooms(auth.currentUser.uid);
    setChats(chatroomIds);
  }
  
  useEffect(()=>{
    // useEffect for fetching chats from rtdb
    
    const unsubscribe = navigation.addListener('focus', () => {
      if(chats.length != 0) return;
      console.log("In use effect. Setting chats");
      (async()=>await setUserChatRooms())();
      console.log('screen is focused');
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
    borderColor: Palette.primary.button.borderColor,
    // borderColor: "red",
    backgroundColor: Palette.primary.button.background
  },
  chatTitle: {
    fontSize: 16,
    fontFamily: "Helvetica" // is working
  }
});