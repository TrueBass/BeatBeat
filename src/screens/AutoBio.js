import { React } from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

export default function AutoBio({navigation}) {

  const onCreate = async()=>{
    // TODO: copy old singUp func
    console.log("Acc created");
    navigation.navigate("Profile");
  };

  return (
    //TouchableWithoutFeedback - for hiding keyboard on whitespace press
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.introduceYourself}>Tell a bit about yourself</Text>
        <Text style={styles.text1}>Let's say 300 chars for starters</Text>
          <TextInput
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
        <TouchableOpacity style={styles.button} onPress={()=>onCreate()}>
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
  }
});