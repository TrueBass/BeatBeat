import React, {useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { user, setUserProp } from "./userObjForSignUp";

function AgeCats({navigation, route}) {

  const onPress = (from, to)=>{
    setUserProp("ageCategory", {from, to});
    navigation.navigate("Relationship");
  }

  return (
    <View style={styles.container}>
        <Text style={styles.question}>Choose your age category:</Text>
        <TouchableOpacity onPress={()=>onPress(18, 28)} style={styles.button}>
          <Text style={styles.buttonText}>18 - 28</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onPress(28, 38)} style={styles.button}>
          <Text style={styles.buttonText}>28 - 38</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onPress(38, 48)} style={styles.button}>
          <Text style={styles.buttonText}>38 - 48</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfdfdfff",
  },
  question: {
    fontFamily: "helvetica-regular",
    color: "#919191ff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: "5%",
  },
  button: {
    width: "65%",
    height: "8%",
    marginBottom: "5%",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    backgroundColor: "#ecececff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "helvetica-regular",
    color: "#646464ff",
    fontSize: 17,
  }
});

export default AgeCats;
