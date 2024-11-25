import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function Relationship({navigation, route}) {

  const getProp = ()=>{
    const {ageCategory} = route.params;
    console.log(ageCategory);
  }

  const onPress = (userOption)=>{
    navigation.navigate("YourSex", {userOption});
  }

  return (
    <View style={styles.container}>
        <Text style={styles.question}>
          What are you looking for in a relationship?
        </Text>
        <TouchableOpacity onPress={()=>onPress("Casual and Fun")} style={styles.button}>
          <Text style={styles.buttonText}>Casual and Fun</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onPress("Build a Meaningful Connection")} style={styles.button}>
          <Text style={styles.buttonText}>Build a Meaningful Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onPress("Open to Both, but with Honesty")} style={styles.button}>
          <Text style={styles.buttonText}>Open to Both, but with Honesty</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#dededeff",
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
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    color: "#121212",
    backgroundColor: "#ecececff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%"
  },
    buttonText: {
    fontFamily: "helvetica-regular",
    color: "#646464ff",
    fontSize: 17,
  }
});

export default Relationship;
