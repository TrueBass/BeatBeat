import { React, useState } from 'react';
import { View,Image,Text, StyleSheet,TouchableOpacity} from 'react-native';

import BeatButton from './components/BeatButton';

export default function ProfileScreen({navigation}){
    const [currentImage,setCurrentImage] = useState(0);

    const images = [
        require('../assets/sexy_men.jpg'),
        require('../assets/sexy_men2.jpg'),
        require('../assets/sexy_men3.jpg'),
    ];

    const imagePressHandle = () =>{
        setCurrentImage((prevIndex) => (prevIndex+1) % images.length);
    };

  return(
     <View style={styles.container}>
        <View style={styles.background1}>
          <View style={styles.gallery}>
            <TouchableOpacity onPress={imagePressHandle}>
                <Image source={images[currentImage]} style={styles.photo}/>
            </TouchableOpacity>
          </View>
            <Text style={styles.username}>Tekoshi Uguku</Text>
            <Text style={styles.description}>
                Whether it’s your hobbies, career, values, or anything{"\n"}unique
                about your journey, we want to know what drives{"\n"}you and makes you
                stand out! Whether it’s your hobbies,{"\n"}career, values, or anything
                unique about your journey,{"\n"}we want to know what drives you and
                makes you stand out!
            </Text>
            <BeatButton 
            text="Edit" 
            type="profile"
            />
        </View>
     </View>   
  )
}

const styles = StyleSheet.create({
 container:{
    flex: 1,
    justifyContent: "center"
 },

 background1:{
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(21, 19, 19, 1)",
    alignSelf: "center"
 },

 gallery:{
    width: "100%",
    height: "55%",
  },

  photo:{
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(240, 180, 50, 1)",
    borderRadius: 20,
  },

 username:{
    fontFamily: "helvetica-regular",
    color: "rgba(100,100,100,1)",
    fontSize: 35,
    textAlign: "center",
 },
 description: {
    fontFamily: "helvetica-regular",
    color: "rgba(100,100,100,0.7)",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 19,
    marginTop: 34,
    marginLeft: 16
  },
})