import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

/////////////////////////////////////////////////////////////////////////
//                          REWRITE THE SCREEN                         //
/////////////////////////////////////////////////////////////////////////

function AddPhoto(props) {
  return (
    <View style={styles.container}>
      <View style={styles.background1}>
        <Text style={styles.showYourself}>Show yourself</Text>
        <View style={styles.group1Row}>
          <View style={styles.group1}>
            <View style={styles.boxStack}>
              <Text style={styles.box}></Text>
              <Image
                source={require("../assets/images/add_17138144.png")}
                resizeMode="contain"
                style={styles.plus}
              ></Image>
            </View>
          </View>
          <View style={styles.group2}>
            <View style={styles.textStack}>
              <Text style={styles.text}></Text>
              <Image
                source={require("../assets/images/add_17138144.png")}
                resizeMode="contain"
                style={styles.image}
              ></Image>
            </View>
          </View>
        </View>
        <View style={styles.group4Row}>
          <View style={styles.group4}>
            <View style={styles.text3Stack}>
              <Text style={styles.text3}></Text>
              <Image
                source={require("../assets/images/add_17138144.png")}
                resizeMode="contain"
                style={styles.image3}
              ></Image>
            </View>
          </View>
          <View style={styles.group3}>
            <View style={styles.text2Stack}>
              <Text style={styles.text2}></Text>
              <Image
                source={require("../assets/images/add_17138144.png")}
                resizeMode="contain"
                style={styles.image2}
              ></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  background1: {
    width: 375,
    height: 812,
    backgroundColor: "rgba(223,223,223,1)"
  },
  showYourself: {
    fontFamily: "helvetica-regular",
    color: "rgba(145,145,145,1)",
    height: 31,
    width: 220,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 251,
    marginLeft: 78
  },
  group1: {
    width: 139,
    height: 156
  },
  box: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "helvetica-regular",
    color: "#121212",
    height: 156,
    width: 139,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 60,
    textAlign: "center",
    backgroundColor: "rgba(236,236,236,1)",
    lineHeight: 50
  },
  plus: {
    top: 45,
    left: 36,
    width: 67,
    height: 67,
    position: "absolute",
    opacity: 0.43
  },
  boxStack: {
    width: 139,
    height: 156
  },
  group2: {
    width: 139,
    height: 156,
    marginLeft: 13
  },
  text: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "helvetica-regular",
    color: "#121212",
    height: 156,
    width: 139,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 60,
    textAlign: "center",
    backgroundColor: "rgba(236,236,236,1)",
    lineHeight: 50
  },
  image: {
    top: 45,
    left: 36,
    width: 67,
    height: 67,
    position: "absolute",
    opacity: 0.43
  },
  textStack: {
    width: 139,
    height: 156
  },
  group1Row: {
    height: 156,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 42,
    marginRight: 42
  },
  group4: {
    width: 139,
    height: 156
  },
  text3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "helvetica-regular",
    color: "#121212",
    height: 156,
    width: 139,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 60,
    textAlign: "center",
    backgroundColor: "rgba(236,236,236,1)",
    lineHeight: 50
  },
  image3: {
    top: 45,
    left: 36,
    width: 67,
    height: 67,
    position: "absolute",
    opacity: 0.43
  },
  text3Stack: {
    width: 139,
    height: 156
  },
  group3: {
    width: 139,
    height: 156,
    marginLeft: 13
  },
  text2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "helvetica-regular",
    color: "#121212",
    height: 156,
    width: 139,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 60,
    textAlign: "center",
    backgroundColor: "rgba(236,236,236,1)",
    lineHeight: 50
  },
  image2: {
    top: 45,
    left: 36,
    width: 67,
    height: 67,
    position: "absolute",
    opacity: 0.43
  },
  text2Stack: {
    width: 139,
    height: 156
  },
  group4Row: {
    height: 156,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 42,
    marginRight: 42
  }
});

export default AddPhoto;
