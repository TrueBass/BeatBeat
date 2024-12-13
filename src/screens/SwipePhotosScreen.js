import React, { useState } from "react";
import { View,StyleSheet, Button } from "react-native";
import BeatCard from "../components/BeatCard";
import photo1 from "../screens/fillPhotos/sexy_men.jpg";
import photo2 from "../screens/fillPhotos/sexy_men2.jpg";
import photo3 from "../screens/fillPhotos/sexy_men3.jpg";
import Animated ,{ interpolate, useAnimatedStyle, useSharedValue, withSpring,useDerivedValue, useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector , GestureHandlerRootView , PanGestureHandler} from "react-native-gesture-handler";


export default function SwipePhotosScreen(){
const users =[{
    id:1,
    image:photo1,
    name: 'Den',
},
{
    id:2,
    image:photo2,
    name: 'Kror',
},
{
    id:3,
    image:photo3,
    name: 'Lukas',
},];
 
const activeIndex = useSharedValue(0);
const [currentIndex,setCurrentIndex] = useState(0);

useAnimatedReaction(() => activeIndex.value, (value,prevValue) =>{
    if (Math.floor(value) !== currentIndex){
        runOnJS(setCurrentIndex)(Math.floor(value));
    }
}
)

const onResponse = (res) => {
    if (res !== "YES" && res !== "NO") {
        throw new Error("Invalid response. Expected 'YES' or 'NO'.");
    }
    console.log("on Response", res);
};


return(
    <GestureHandlerRootView style={styles.cards}>
        <View style={styles.cards}>
        {users.map((user,index) =>(
            <BeatCard 
            key={user.id} 
            user={user} 
            numbersOfCards={users.length} 
            currentIndex={index}
            activeIndex={activeIndex}
            // onResponse = {onResponse}
            />
        ))}
        {/* <View>
        <Button 
            title="Yes" 
            onPress={() => activeIndex.value = activeIndex.value + 1 }
        />
        </View> */}
        
        </View>
    </GestureHandlerRootView>
);
}

const styles = StyleSheet.create({
 cards:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
 }
})