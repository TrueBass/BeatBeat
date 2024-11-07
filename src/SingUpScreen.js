import { React, useState } from 'react';
import { View,Image,Text,Alert,TextInput,StyleSheet} from 'react-native';
import InputField from './components/InputField';
import BeatButton from './components/BeatButton';

export default function SignUpScreen({onPressLogin, onSignUp}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat,setPasswordRepeat] = useState('');
    const [emailEmptyString, setEmailEmptyString] = useState(false);
    const [passwdEmptyString,setPasswdEmptyString] = useState(false);
    
    const test = async () =>{
      console.log('B');
    };

    const onTermOfUSe = () =>{
      console.log("Term of Use");
    }

    const onPrivacyPolicy = () =>{
      console.log("Privacy Police");
    }

    const onLogin = () =>{
      console.log("Login");
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>

            <InputField 
            placeholder="Name" 
            value={name} 
            setValue={setName}
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

            <InputField 
            placeholder="Confirm your password" 
            value={passwordRepeat} 
            setValue={setPasswordRepeat}
            secureTextEntry={true}
            />

            <BeatButton 
            text="Register" 
            onPress={test}
            />

            <Text style={styles.text}>
              By registering, you confirm that you accept our
              <Text style={styles.link} onPress={onTermOfUSe}> Terms of Use</Text> and 
              <Text style={styles.link} onPress={onPrivacyPolicy}> Privacy Policy</Text>
            </Text>

            <BeatButton
            text="Have an acount? Sign in"
            onPress={onLogin}
            type = "tertiary"
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

    title:{

    },

    text:{
      color: 'gray',
      marginVertical: 10,
    },

    link:{
      color:'#FDB075',
    },
  });