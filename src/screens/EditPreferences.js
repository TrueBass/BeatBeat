import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback, FlatList } from "react-native";

import { sendPasswordResetEmail, updatePassword, verifyPasswordResetCode } from "firebase/auth";
import RadioGroup from "../components/RadioGroup";
import BeatButton from "../components/Button";

import {updateProfileData} from "../user";
import { auth } from "../../config/firebase";

function EditPreferences({navigation, route}) {

  const userProps = route.params.user;
  const sexVals = ["Male", "Female"];
  const orientationVals = ["Heterosexual", "Homosexual", "Lesbian"];
  const ageCatsVals = ["18 - 28","28 - 38", "38 - 48"];
  const relationshipVlas = ["Casual and Fun", "Build a Meaningful Connection", "Open to Both, but with Honesty"];
  const [autobio, setAutobio] = useState("");
  const [sex, setSex] = useState(userProps.sex);
  const [orientation, setOrientation] = useState(userProps.orientation);
  const [relationship, setRelationship] = useState(userProps.relationship);
  const [ageCategory, setAgeCategory] = useState(`${userProps.ageCategory.from} - ${userProps.ageCategory.to}`)

  async function onConfirm(){
    ///////////////////////////////////////////////////
    //                    TODO:                      //
    //            implement editImages               //
    ///////////////////////////////////////////////////
    const changes = {
      name: userProps.name,
      autobio: autobio||userProps.autobio,
      sex,
      orientation,
      relationship,
      ageCategory: {
        from: Number(ageCategory.substring(0,2)),
        to: Number(ageCategory.substring(5,7))
      }
    };
    
    for(let k of Object.keys(changes)){
      if(JSON.stringify(changes[k]) != JSON.stringify(userProps[k])){
        await updateProfileData(auth.currentUser.uid, changes);
        route.params.isUserEdited = !route.params.isUserEdited;
        navigation.replace("Profile", {isUserEdited: route.params.isUserEdited});
        return;
      }
    }
    navigation.replace("Profile", {isUserEdited: route.params.isUserEdited});
  }

  function onEditGallery(){
    //TODO:
    //implement edit gallery
  }

  return (
    <View style={{flex: 1, backgroundColor: "#dfdfdf"}}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} >

        <Text style={styles.fieldLabel}>Bio</Text>
        <View style={{marginBottom: "10%"}}>
          <TextInput style={styles.textInput}
            value={autobio}
            onChangeText={setAutobio}
            placeholder={userProps.autobio}
            multiline={true}
            maxLength={300}
            onPointerLeave={()=>Keyboard.dismiss()}
          />
        </View>

        <Text style={styles.fieldLabel}>Sex</Text>
        <View style={styles.radioRow}>
          <RadioGroup
            value={sex}
            radioValues={sexVals}
            setValue={setSex}
          />
        </View>

        <Text style={styles.fieldLabel}>Age Category</Text>
        <View style={styles.radioRow}>
          <RadioGroup
            value={ageCategory}
            setValue={setAgeCategory}
            radioValues={ageCatsVals}
          />
        </View>

        <Text style={styles.fieldLabel}>Orientation</Text>
        <View style={styles.radioRow}>
          <RadioGroup
            value={orientation}
            setValue={setOrientation}
            radioValues={orientationVals}
          />
        </View>

        <Text style={styles.fieldLabel}>Relationship</Text>
        <View style={styles.radioRow}>
          <RadioGroup
            value={relationship}
            setValue={setRelationship}
            radioValues={relationshipVlas}
          />
        </View>

        <View style={{flexDirection:"row", justifyContent: "space-between", alignSelf: "stretch"}}>
          <BeatButton width="40%" height={50}
            title="Edit your gallery"
            onPress={onEditGallery}
          />
          <BeatButton width="40%" height={50}
            title="Confirm"
            onPress={onConfirm}
          />
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: { // verygood-veryniiiice
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    height: 200,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: { // good
    flex: 1,
  },
  scrollView: {
    flex: 1,
    // marginTop: 150,
    paddingHorizontal: "10%",
    borderWidth: 1, borderColor: "red"
  },
  usernameLabel: { // good
    fontFamily: "helvetica-regular",
    color: "#646464",
    fontSize: 16,
  },
  fieldLabel: { // good
    fontFamily: "helvetica-regular",
    color: "#646464",
    fontSize: 16,
    fontWeight: "bold",
  },
  editionRow: { // good
    marginBottom: "10%",
  },
  radioRow: {
    marginBottom: "10%",
    alignSelf: "stretch",
    // borderWidth: 1,
    // borderColor: "red"
  },
});

export default EditPreferences;
