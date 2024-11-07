import { React, useState } from 'react';
import { View,Image,StyleSheet,useWindowDimensions } from 'react-native';
import Logo from '../assets/Logo_1.png';
import InputField from './components/InputField';
import BeatButton from './components/BeatButton';

export default function LoginScreen({onPressLogin, onSignUp}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailEmptyString, setEmailEmptyString] = useState(false);
    const [passwdEmptyString,setPasswdEmptyString] = useState(false);
    const {height} = useWindowDimensions();
    
    const onLoginPressed = async () => {
        try {
          //For Taras to do logic for login
        } catch (error) {
          const message = 'Login error';
          let description;
    
          switch (error.code) {
            //describing errors
          }
        }
        
    };

    const onSingUpPressed = () => {
        onSingUp();
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
            onPress={onLoginPressed}
            />
            
            <BeatButton 
            text="Don't have an acount? Create one" 
            onPress={onSingUpPressed} 
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