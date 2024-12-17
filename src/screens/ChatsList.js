import React, {useState, useEffect} from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette } from "../colors/palette";
import Toast from 'react-native-toast-message';
import { toast } from "../styles/style";
import { fetchMessages } from "../messaging";

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

  function onOpenChat(){
    // same as Alert.alert("Chat is openning");
    // but automatic
    Toast.show({ // displays some info for user
      type: 'info', // 'success', 'error', 'info'
      text1: "Chat is openning",
      text1Style: toast.text1Style,
      visibilityTime: 3000,
      topOffset: toast.topOffset
    });
  }

  // useEffect(()=>{
  //   // useEffect for fetching chats from rtdb
  //   // if(chats.length != 0) return;
  //   // console.log("In use effect. Setting chats");
  //   // (async ()=>{
  //   //   const userMessages = await fetchMessages();
  //   // })();
  //   // setChats([
  //   //   {title: "test2", id: "uniquetest2chatid"},
  //   //   {title: "test3", id: "uniquetest3chatid"},
  //   //   {title: "test4", id: "uniquetest4chatid"},
  //   //   {title: "test5", id: "uniquetest5chatid"},
  //   //   {title: "test6", id: "uniquetest6chatid"},
  //   //   {title: "test7", id: "uniquetest7chatid"},
  //   //   {title: "test8", id: "uniquetest8chatid"},
  //   //   {title: "test9", id: "uniquetest9chatid"},
  //   //   {title: "test10", id: "uniquetest10chatid"},
  //   //   {title: "test11", id: "uniquetest11chatid"},
  //   //   {title: "test12", id: "uniquetest12chatid"},
  //   //   {title: "test13", id: "uniquetest13chatid"},
  //   //   {title: "test14", id: "uniquetest14chatid"},
  //   // ]);
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>
          <TouchableOpacity style={[
              styles.chatCard,
              item.id == chats[0].id? {marginTop: 20}: {}
            ]}
            onPress={onOpenChat}
          >
            <Text style={styles.chatTitle}>{item.title}</Text>
          </TouchableOpacity>
        }
      />
      <Toast/> 
    {/* we need to add a <Toast/> jsx element here to display message on this screen */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: Palette.primary.button.background
  },
  chatTitle: {
    fontSize: 16,
    fontFamily: "Helvetica" // is working
  }
});