import { React, useState } from 'react';
import { View,Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';

import Logo from '../assets/Logo_1.png';
import InputField from './components/InputField';
import BeatButton from './components/BeatButton';

import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailEmptyString, setEmailEmptyString] = useState(false);
    const [passwdEmptyString,setPasswdEmptyString] = useState(false);
    const {height} = useWindowDimensions();
    
    const onLoginHandler = async () => {
        try {
          if (email !== "" && password !== "") {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful")
          }
        } catch (error) {
          const title = "Login error";
          // let description;
    
          // switch (error.code) {
          //   case 
          // };
          Alert.alert(title, error.message);
        }
        
    };

    const onSingUpHandler = () => {
      navigation.navigate("SignUp");
    }
    
    return(
        <View style={styles.container}>
            <Image source={Logo} 
            style={[styles.logo,{height: height*0.3}]}
            resizeMode='contain'
            />

            <InputField 
            placeholder="Email" 
            value={email} 
            setValue={setEmail}
            />
            
            <InputField 
            placeholder="Password" 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true}
            />

            <BeatButton 
            text="Log In" 
            onPress={onLoginHandler}
            />
            
            <BeatButton 
            text="Don't have an acount? Create one" 
            onPress={onSingUpHandler} 
            type="tertiary"
            />
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      // justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'black',
    },

    logo:{
        width: '70%',
        
    },
  });