import { React, useEffect, useState, useCallback } from 'react';
import { View, Image,Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';

import { signOut } from 'firebase/auth';
import { auth, realtimeDB } from '../../config/firebase';
import { get, ref } from "firebase/database";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Palette } from '../colors/palette';
import { buttonText } from '../styles/style';

export default function Profile({navigation, route}){
  const [user, setUser] = useState({});
  const [images, setImgs] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(()=>{
    const userRef = ref(realtimeDB, "users/"+auth.currentUser.uid);
    (async()=>await get(userRef).then(snapshot=>{
      if(snapshot.exists()){
        const snapVal = snapshot.val();
        setUser(snapVal);
        setUserLoaded(true);
      }else console.log("no data in the snap");
    })
    .catch(error=>{
      Alert.alert("Error", error.message);
    }))();
  }, [route.params.isUserEdited]);

  const imagePressHandle = useCallback(() => {
    if(images != undefined)
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  }, [images!=undefined?images.length: ""]);

  useEffect(()=>{
    const imagesRef = ref(realtimeDB, "images/"+auth.currentUser.uid);
    (async()=>await get(imagesRef).then(snapshot=>{
      if(snapshot.exists()) {
        const snapVal = snapshot.val();
        setImgs(Object.values(snapVal));
        setImgsLoaded(true);
      } else console.log("no data in the snap");
    })
    .catch(error=>{
      Alert.alert("Error", error.message);
    }))();
  },[userLoaded]);

  const onLogOut = () => {
    // move logout to the bottom of the sidebar
    signOut(auth).catch(err => console.log(err));
  };

  const onEdit = ()=>{
    
    navigation.replace("Edit", {...route.params, user});
  }

  if(!userLoaded){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf: "flex-end", marginBottom: 10, marginHorizontal: "2%"}}>
        <MaterialCommunityIcons name="square-edit-outline"
          size={32} color={Palette.primary.button.textColor}
          onPress={onEdit}
        />
      </View>
      <TouchableOpacity onPress={imagePressHandle} style={styles.gallery}>
          {(!imgsLoaded)?
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large"/>
          </View>:
          <Image source={{uri: images[currentImage]}} style={styles.photo}/>}
      </TouchableOpacity>
      <Text style={[buttonText, {fontSize: 35}]}>{user.name||"unknown"}</Text>
      <Text style={[buttonText, {fontSize: 35}]}>{user.sex||"unknown"}</Text>
      <Text style={[buttonText, {color: Palette.primary.textColor}]}>{user.autobio||""}</Text>
      <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end", marginBottom: 10}}>
        <Button title="Logout" // move to the bottom of the sidebar
          onPress={onLogOut}
          width={"90%"} height={50}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "#dfdfdfff",
    // borderColor: "red", borderWidth: 1
  },
  gallery:{
    width: "100%",
    height: "55%",
  },
  photo:{
    width: "100%",
    height: "100%",
  },
  description: {
    fontFamily: "helvetica-regular",
    color: Palette.primary.textColor,
    fontSize: 16,
    // marginTop: "5%",
  },
});