import { React, useState, useEffect } from 'react';
import { View, Text ,Alert, StyleSheet} from 'react-native';
import InputField from '../components/InputField';
import BeatButton from '../components/BeatButton';
import {Palette} from "../colors/palette";
import Button from "../components/Button";
import { setUserProp } from './userObjForSignUp';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat,setPasswordRepeat] = useState('');
  const [emailEmptyString, setEmailEmptyString] = useState(false);
  const [passwdEmptyString, setPasswdEmptyString] = useState(false);

  const onNext = async()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(name==""){
      Alert.alert("Enter a nickname", "No nickname has been provided");
      return;
    }

    else if(!email.match(emailRegex)){
      console.log("reg");
      Alert.alert("Wrong email format",
        "Provide an email with the right format. For example: \"example@exampledomain.com\""
      );
      return;
    }

    else if(password=="" || password.length < 6){
      Alert.alert(
        "Too short password",
        "Enter a password. Minimum length is 6 characters"
      );
      return;
    }

    else if(password != passwordRepeat){
      Alert.alert(
        "Provided different passwords",
        "Provide same password in the confirm password field"
      );
      return;
    }

    try{
      setUserProp("name", name);
      setUserProp("email",email);
      setUserProp("password", password);
      navigation.navigate("AddPhoto");
    }catch(error){
      
      const errorCode = error.code;
      let errorMsg;
      let errorTitle;
      switch(errorCode){
        case 'auth/invalid-email':
          errorTitle = "Invalid email";
          errorMsg = "The email address is invalid. Write without mistakes!";
        break;
        case 'auth/email-already-in-use':
          errorTitle = "Email is already in use";
          errorMsg = "The email address is already in use. Try another one!";
        break;
        case 'auth/weak-password':
          errorTitle = "Weak password";
          errorMsg = "The password is too weak. It should contain at least 6 characters";
        break;
        case 'auth/network-request-failed':
          errorTitle = "Network error";
          errorMsg = "Network error occurred.";
        break;
        case 'auth/too-many-requests':
          errorTitle = "Stop it!";
          errorMsg = "Too many requests. Please try again later.";
        break;
        case 'auth/internal-error':
          errorTitle = "What is that?";
          errorMsg = "An internal error occurred. We don't know why. Try again?";
        break;
      }
      Alert.alert(errorTitle, errorMsg);
    }
  }

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
      placeholder="Enter password"
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      textContentType='oneTimeCode'
      />

      <InputField 
      placeholder="Confirm your password" 
      value={passwordRepeat} 
      setValue={setPasswordRepeat}
      secureTextEntry={true}
      autoCorrect={false}
      textContentType='oneTimeCode'
      />

      <Button title="Next"
        onPress={onNext}
        width="50%"
        height="5%"
        marginTop="5%"
        marginBottom="5%"
      />

      <Text style={styles.text}>
        {"By registering, you confirm that you accept our\n"}
        <Text style={styles.link} onPress={onTermOfUSeHandler}>Terms of Use</Text> and 
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
    padding: 20,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: Palette.primary.background,
  },

  text:{
    fontFamily: "helvetica-regular",
    color: 'gray',
    marginTop: 10,
    fontSize: 14,
    // width: "80%",
    textAlign: "center"
  },

  link:{
    color:'#e39152'
  }
});