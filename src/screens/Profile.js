import { React, useEffect, useState, useCallback } from 'react';
import { View, Image,Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';

import { signOut } from 'firebase/auth';
import { auth, realtimeDB } from '../../config/firebase';
import {child, get, ref} from "firebase/database";

export default function Profile({navigation}){

  const [images, setImgs] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(()=>{
    const user = ref(realtimeDB, "users/"+auth.currentUser.uid);
    get(child(user, "photos/")).then(snapshot=>{
      if(snapshot.exists()){
        const snapVal = snapshot.val();
        const uri = [];
        for(let i = 0; i < snapVal.length; ++i){
          uri.push(`data:image/jpeg;base64,${snapVal[i]}`);
        }
        setImgs(uri);
      }else console.log("no data in the snap");
    })
    .catch(error=>{
      Alert.alert("Error", error.message);
    });
  }, []);

  const imagePressHandle = useCallback(() => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const onLogOut = () => {
    signOut(auth).catch(err => console.log(err));
  };

  const onEdit = ()=>{
    // TODO:
    // make profile edit screen
  }

  return(
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={imagePressHandle} style={styles.gallery}>
          <Image source={{uri: images[currentImage]}} style={styles.photo}/>
      </TouchableOpacity>
      <Text style={styles.username}>Tekoshi Uguku</Text>
      <Text style={styles.description}>
          Whether it’s your hobbies, career, values, or anything{"\n"}unique
          about your journey, we want to know what drives{"\n"}you and makes you
          stand out! Whether it’s your hobbies,{"\n"}career, values, or anything
          unique about your journey,{"\n"}we want to know what drives you and
          makes you stand out!
      </Text>
      <TouchableOpacity onPress={onEdit} style={styles.logout}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <Button title="Logout"
        onPress={onLogOut}
        width="40%" height="5%" marginTop="10%"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfdfdfff",
  },
  logout:{
    fontSize: 15,
    fontFamily: "helvetica-regular",
    color: "#121212",
    width: "20%",
    height: "5%",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "helvetica-regular",
    color: "#646464ff",
  },

  gallery:{
    width: "90%",
    height: "55%",
  },

  photo:{
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(240, 180, 50, 1)",
    borderRadius: 20,
  },

  username:{
    fontSize: 35,
    color: "#646464ff",
    fontFamily: "helvetica-regular",
  },
  description: {
    fontFamily: "helvetica-regular",
    color: "#646464b3",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 19,
    marginTop: "5%",
    marginLeft: 16
  },
})