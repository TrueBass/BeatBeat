import { React, useState } from 'react';
import { View,Image,Text,Alert,TextInput,StyleSheet} from 'react-native';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import InputField from './components/InputField';
import BeatButton from './components/BeatButton';

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat,setPasswordRepeat] = useState('');
    const [emailEmptyString, setEmailEmptyString] = useState(false);
    const [passwdEmptyString, setPasswdEmptyString] = useState(false);
    
    const onSignUpHandler = async () =>{
      try{
        await createUserWithEmailAndPassword(auth, email, password);
      }catch(e){
        console.log(e.code);// we'll use it for switch(e.code)->clear error explanation
        Alert.alert("SingUp error", e.message);
      }
    };

    const onTermOfUSeHandler = () =>{
      console.log("Term of Use");
    }

    const onPrivacyPolicyHandler = () =>{
      console.log("Privacy Police");
    }

    const onLoginHandler = () =>{
      navigation.pop();
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
            onPress={onSignUpHandler}
            />

            <Text style={styles.text}>
              By registering, you confirm that you accept our
              <Text style={styles.link} onPress={onTermOfUSeHandler}> Terms of Use</Text> and 
              <Text style={styles.link} onPress={onPrivacyPolicyHandler}> Privacy Policy</Text>
            </Text>

            <BeatButton
            text="Have an acount? Sign in"
            onPress={onLoginHandler}
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