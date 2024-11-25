import React, { useState } from "react";
import { StyleSheet, View, Text, Image , TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";
import  placeholder from "../../assets/inmyselfitrust.jpeg";

function AddPhoto(props) {
 
  const [images, setImages] = useState([null, null, null, null]); 

  const onPickPhoto = async (index) => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = [...images]; 
        newImages[index] = result.assets[0].uri; 
        setImages(newImages); 
      }
    } catch (error) {
      Alert.alert("Error uploading image: " + error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.showYourself}>Show yourself</Text>
      <View style={styles.groupRow}>
      {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardBackground}
            onPress={() => onPickPhoto(index)}>
            <Image
              source={image ? { uri: image } : null}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(223,223,223,1)",
  },

  showYourself: {
    fontFamily: "helvetica-regular",
    color: "rgba(145,145,145,1)",
    fontSize: 16,
  },

  plus: {
    height: "50%",
    width: "50%",
    opacity: 0.43,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },

  cardBackground: {
    color: "#121212",
    height: 156,
    width: 139,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderStyle: "solid",
    borderRadius: 10,
    backgroundColor: "rgba(236,236,236,1)",
  },

  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },

  groupRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});

export default AddPhoto;
