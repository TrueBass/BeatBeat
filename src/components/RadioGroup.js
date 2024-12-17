import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { Palette } from "../colors/palette";

export default function RadioGroup({value, radioValues = [], setValue, checkedColor = "#ff5a5f", uncheckedColor = Palette.primary.textColor}){
  /////////////////////////////////////////////////////
  // if we use Array.map(()=>{}) with JSX elements   //
  // (JSX elems: View, Text etc.)                    //
  // we need to give each child it's unique key prop //
  // for react to differenciate them                 //
  // ! if we use such component as this only once    //
  // we don't need the key prop !                    //
  /////////////////////////////////////////////////////
  return (
    <>
      {radioValues.map((val, i)=>
        <View key={(i+1)*Math.random()} style={styles.container}>
          <Text key={(i+2)*Math.random()} style={styles.fieldLabel}>{val}</Text>
          <RadioButton.Android
            key={(i+3)*Math.random()}
            color={checkedColor}
            uncheckedColor={uncheckedColor}
            status={ (value == val ? 'checked' : 'unchecked') }
            onPress={()=>setValue(val)}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  fieldLabel:{
    fontFamily: "helvetica-regular",
    color: "rgba(100,100,100,1)",
    fontSize: 16,
  }
});
