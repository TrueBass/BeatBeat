import React, {useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function YourSex({navigation, route}) {

  const onPress = (userSex)=>{
    route.params.user["sex"] = userSex;
    navigation.navigate("AreYouGay", {...route.params});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What is your sex?</Text>
      <TouchableOpacity style={styles.button} onPress={()=>onPress("Male")}>
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>onPress("Female")}>
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dfdfdfff"
  },
  question: {
    fontSize: 16,
    fontFamily: "helvetica-regular",
    color: "#919191ff",
    marginBottom: "5%"
  },
  button: {
    fontSize: 15,
    fontFamily: "helvetica-regular",
    color: "#121212",
    width: "65%",
    height: "8%",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#ffffffff",
    backgroundColor: "#ecececff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%"

  },
  buttonText: {
    fontFamily: "helvetica-regular",
    color: "rgba(100,100,100,1)",
    fontSize: 17,
  }
});

export default YourSex;
