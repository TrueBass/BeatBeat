import { useState , React } from "react";
import { View,Text,StyleSheet,Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated ,{ interpolate, useAnimatedStyle, useSharedValue, withSpring,useDerivedValue } from "react-native-reanimated";
import { Gesture, GestureDetector , GestureHandlerRootView , PanGestureHandler} from "react-native-gesture-handler";
import { runOnJS } from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
export const beatCardWidth = screenWidth*0.8;

export default function BeatCard({key = 1, user,numbersOfCards,currentIndex,activeIndex,onResponse}){
const translationX = useSharedValue(0);

    const animCard = useAnimatedStyle(() => ({
        opacity: interpolate(
            activeIndex.value,
            [currentIndex - 1,currentIndex,currentIndex+1],
            [1 - 1/5,1,1]
        ),
        transform: [
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
            if(Math.abs(event.velocityX)>900) {
                const direction = event.velocityX > 0 ? true : false;
                translationX.value = withSpring(Math.sign(event.velocityX)*500,
                {
                    velocity: event.velocityX,
                });
                runOnJS(onResponse)(direction);
                activeIndex.value = withSpring(currentIndex + 1);
            }else{
                translationX.value = withSpring(0);
            } 
    });

 return(
 <GestureDetector gesture={gesture} key={key*Math.random()}>
        <Animated.View key={key*Math.random()+1}
     style={[
        styles.card,
        animCard,
        {
            zIndex: numbersOfCards - currentIndex, 
        }
        ]}>
        <Image key={key*Math.random()+2}
        style={[StyleSheet.absoluteFillObject,styles.image]} 
        source={{uri: user.image}}
        />

        <LinearGradient key={key*Math.random()+3}
        colors={['transparent','rgba(0,0,0,0.8)']}
        style={[StyleSheet.absoluteFill,styles.overlay]}
        />

        <View style={styles.footer} key={key*Math.random()+4}>
            <Text key={key*Math.random()+5} style={styles.username}>{user.name}</Text>
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