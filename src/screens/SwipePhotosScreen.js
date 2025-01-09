import React, { useEffect, useState } from "react";
import { View,StyleSheet, Text, ActivityIndicator, ToastAndroid } from "react-native";
import BeatCard from "../components/BeatCard";
import { useSharedValue, useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from '../../config/firebase';
import { checkForMatch, getPotentialMatches, onSwipeLeft, onSwipeRight} from "../matching";
import { Palette } from "../colors/palette";
import Toast from "react-native-toast-message";


export default function SwipePhotosScreen(){
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    (async()=>{
        const currentUserId = auth.currentUser.uid;
        const matches = await getPotentialMatches(currentUserId);
        setUsers(matches);
        setLoading(false);
    })();
}, []);

const activeIndex = useSharedValue(0);
const [currentIndex,setCurrentIndex] = useState(0);

useAnimatedReaction(() => activeIndex.value, (value, prevValue) =>{
    if (Math.floor(value) !== currentIndex){
        runOnJS(setCurrentIndex)(Math.floor(value));
    }
});

const onResponse = async(res, user) => {
    if(res){
			await onSwipeRight(auth.currentUser.uid, user.userId);
			const result = await checkForMatch(auth.currentUser.uid, user.userId);
			result && Toast.show({text1: "Yaaay", text2: "You've got a match!"});
		}else{
			await onSwipeLeft(auth.currentUser.uid, user.userId);
		}
    activeIndex.set(old=>old+1);
    setCurrentIndex((prev) => prev + 1);
};

if(loading){
    return (
        <View style={{
        flex: 1,
        justifyContent: "center", alignItems: "center",
        backgroundColor: Palette.primary.background
        }}>
        <ActivityIndicator size="large"/>
        </View>
    );
}

return(
    <GestureHandlerRootView style={styles.cards}>
        <View style={styles.cards}>
				<Toast/>
        {currentIndex!=users.length?
            users.map((user,index) =>(
                <BeatCard
                key={index}
                childkey={user.id}
                user={user}
                numbersOfCards={users.length}
                currentIndex={index}
                activeIndex={activeIndex}
                onResponse = {(res) => onResponse(res,user)}
                />
            )):
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontFamily: "Helvetica"}}>
                    Still finding people for you
                </Text>
            </View>
        }
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