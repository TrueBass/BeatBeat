import { React, useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { AuthUserContext } from '../../App';
import { addUserToRtdb } from '../user';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Palette } from '../colors/palette';
import {buttonText} from "../styles/style";
import { setUserProp, user, userImages } from './userObjForSignUp';

export default function AutoBio({route}) {
  
  const [autobio, setAutobio] = useState("");
  const {setIsCreated} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(false);
  
  const onCreate = async()=>{
    setUserProp("autobio", autobio);
    await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(()=>{console.log("user added suc!")})
    .catch((e)=>console.log(e.message));
    try{
      if(await addUserToRtdb(user, userImages)===200){
        console.log("done");
        setLoading(false); setIsCreated(true);
      }
    }catch(e){
      console.error(e.message);
    }
  };

  if(loading){
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#212121"/>
        <Text style={[buttonText, {textAlign: "center", marginTop: 10}]}>
          {"Your account is creating\nIt will take a while"}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    //TouchableWithoutFeedback - for hiding keyboard on whitespace press
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.introduceYourself}>Tell a bit about yourself</Text>
        <Text style={styles.text1}>Let's say 300 chars for starters</Text>
          <TextInput
            value={autobio}
            onChangeText={setAutobio}
            placeholder="Whether it’s your hobbies, career, values,or anything unique
            about your journey,we want to know what drives you and
            makes you stand out!"
            maxLength={300}
            multiline={true}
            autoCapitalize="sentences"
            keyboardAppearance="light"
            clearButtonMode="while-editing"
            style={styles.textInput}
          />
        <TouchableOpacity style={styles.button} onPress={()=>{setLoading(true);onCreate();}}>
          <Text style={styles.buttonText}>✨Create account✨</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfdfdfff",
  },
  introduceYourself: {
    fontFamily: "helvetica-regular",
    color: "#919191ff",
    fontSize: 20,
    marginBottom: "3%",
  },
  text1: {
    fontFamily: "helvetica-regular",
    color: "#919191ff",
    fontSize: 13,
    marginBottom: "5%",
  },
  textInput: {
    fontSize: 15,
    fontFamily: "helvetica-regular",
    color: "#121212",
    width: "70%",
    height: "20%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: "top",
    borderColor: "#ffffffff",
    backgroundColor: "#dfdfdf",
  },
  button: {
    fontSize: 15,
    fontFamily: "helvetica-regular",
    width: "65%",
    height: "8%",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    backgroundColor: "#ecececff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%"
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "helvetica-regular",
    color: "#646464ff",
  },
  loadingContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7e7e7"
  }
});