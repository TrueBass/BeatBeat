import { React, useState } from 'react';
import { View,Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';

import Logo from '../../assets/Logo_1.png';
import InputField from '../components/InputField';
import BeatButton from '../components/BeatButton';
import { Palette } from '../colors/palette';

import { auth } from '../../config/firebase';
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
        let title;
        let description;
        switch (error.code) {
          case 'auth/invalid-email':
            title = "Invalid email";
            description = "The email address is invalid. Try the right one.";
          break;
          case 'auth/user-disabled':
            title = "Disabled account";
            description = "This user account has been disabled.";
          break;
          case 'auth/user-not-found':
            title = "User not found";
            description = "No user found with this email address.";
          break;
          case 'auth/invalid-credential':
            title = "Wrong password or email";
            description = "The password or email is incorrect. Try the right one!";
          break;
          case 'auth/too-many-requests':
            title = "Stop it!";
            description = "Too many requests. Please try again later.";
          break;
          case 'auth/network-request-failed':
            title = "Network error";
            description = "Network error occurred. Please check your internet connection.";
          break;
          case 'auth/internal-error':
            title = "What is that?";
            description = "An internal error occurred. Please try again.";
          break;
        };
        Alert.alert(title, description);
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
      backgroundColor: Palette.primary.background,
    },
    logo:{
        width: '70%',
    },
  });