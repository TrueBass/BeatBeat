import { useState , React } from "react";
import { View,Text,StyleSheet,Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated ,{ interpolate, useAnimatedStyle, useSharedValue, withSpring,useDerivedValue } from "react-native-reanimated";
import { Gesture, GestureDetector , GestureHandlerRootView , PanGestureHandler} from "react-native-gesture-handler";

const screenWidth = Dimensions.get('screen').width;
export const beatCardWidth = screenWidth*0.8;

export default function BeatCard({user,numbersOfCards,currentIndex,activeIndex}){
const translationX = useSharedValue(0);

    const animCard = useAnimatedStyle(() => ({
        opacity: interpolate(
            activeIndex.value,
            [currentIndex - 1,currentIndex,currentIndex+1],
            [1 - 1/5,1,1]
        ),
        transform: [
        {
            scale: interpolate(
                activeIndex.value,
                [currentIndex - 1 ,currentIndex, currentIndex + 1],
                [0.95,1,1]
            ),
        },
        { 
            translateY: interpolate(
            activeIndex.value,
            [currentIndex - 1 ,currentIndex, currentIndex + 1],
            [-30,0,0]
        ),
        },
        {
            translateX: translationX.value
        },
        {
            rotateZ:`${interpolate(
                translationX.value, 
                [-screenWidth/2,0,screenWidth/2],
                [-15,0,15]
            )}deg`
        },
    ],
    }));

    
const gesture = Gesture.Pan()
        
        .onChange((event) =>{
            translationX.value = event.translationX;
            activeIndex.value = interpolate(
                Math.abs(translationX.value),
                [0,500],
                [currentIndex,currentIndex + 0.8]
            );
        })
        .onEnd((event) => {
            if(Math.abs(event.velocityX)>400) {
                translationX.value = withSpring(Math.sign(event.velocityX)*500,
                {
                    velocity: event.velocityX,
                });
                // onResponse(event.velocityX >0);
                activeIndex.value = withSpring(currentIndex + 1);
            }else{
                translationX.value = withSpring(0);
            } 
    });

 return(
 <GestureDetector gesture={gesture}>
        <Animated.View 
     style={[
        styles.card,
        animCard,
        {
            zIndex: numbersOfCards - currentIndex, 
        }
        ]}>
        <Image 
        style={[StyleSheet.absoluteFillObject,styles.image]} 
        source={user.image}
        />

        <LinearGradient
        colors={['transparent','rgba(0,0,0,0.8)']}
        style={[StyleSheet.absoluteFill,styles.overlay]}
        />

        <View style={styles.footer}>
            <Text style={styles.username}>{user.name}</Text>
        </View>
     </Animated.View>
</GestureDetector>
);
}

const styles = StyleSheet.create({
    card:{
        width:beatCardWidth,
        //  height: beatCardWidth*1.67,
        aspectRatio: 1/1.67,
        overflow: "hidden",
        borderRadius:15,
        justifyContent: 'flex-end',
        position: 'absolute',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:1
        },
        shadowOpacity:0.22,
        shadowRadius:2.22,
        elevation:3,
    },

    image:{
        borderRadius:15,
        width: '100%',
        height: '100%',
    },

    footer:{
        padding:10,
    },

    username:{
        fontSize: 24,
        color: 'white',
        fontFamily:'InterBold',
    },

    overlay:{
        top: '50%'
    },
});