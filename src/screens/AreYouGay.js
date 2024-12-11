import React, { useEffect } from "react";
import { StyleSheet, View, Text, Touchable, TouchableOpacity } from "react-native";
import { user, setUserProp } from "./userObjForSignUp";

function AreYouGay({navigation, route}) {

  const onPress = (orientation)=>{
    setUserProp("orientation", orientation);
    navigation.navigate("AutoBio");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What is your orientation?</Text>
      <TouchableOpacity style={styles.button} onPress={()=>onPress("Heterosexual")}>
        <Text style={styles.buttonText}>Heterosexual</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>onPress("Homosexual")}>
        <Text style={styles.buttonText}>Homosexual</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>onPress("Bisexual")}>
        <Text style={styles.buttonText}>Bisexual</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfdfdfff",
    alignItems: "center",
    justifyContent: "center"
  },
  question: {
    fontFamily: "helvetica-regular",
    color: "#919191ff",
    fontSize: 16,
    marginBottom: "5%"
  },
  button: {
    fontSize: 15,
    fontFamily: "helvetica-regular",
    width: "65%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    backgroundColor: "#ecececff"
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "helvetica-regular",
    color: "#646464ff",
  }
});

export default AreYouGay;
