import React, { createContext, useContext, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Palette } from "./src/colors/palette";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SingUpScreen';
import AgeCats from "./src/screens/AgeCats";
import Relationship from "./src/screens/Relationship";
import YourSex from "./src/screens/YourSex";
import AreYouGay from "./src/screens/AreYouGay";
import AutoBio from "./src/screens/AutoBio";
import Profile from "./src/screens/Profile";
import AddPhoto from "./src/screens/AddPhoto";
import EditPreferences from "./src/screens/EditPreferences";
import TestChat from "./src/screens/TestScreen";
import SwipePhotosScreen from "./src/screens/SwipePhotosScreen";
import ChatsList from "./src/screens/ChatsList";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

const Stack = createStackNavigator();
export const AuthUserContext = createContext({});

const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  return (
    <AuthUserContext.Provider value={{user, setUser, isCreated, setIsCreated}}>
      {children}
    </AuthUserContext.Provider>
  )
};

function AuthStack(){
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="AutoBio" component={AutoBio}/>
      <Stack.Screen name="AddPhoto" component={AddPhoto}/>
      <Stack.Screen name="AgeCats" component={AgeCats}/>
      <Stack.Screen name="YourSex" component={YourSex}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="AreYouGay" component={AreYouGay}/>
      <Stack.Screen name="Relationship" component={Relationship}/>
    </Stack.Navigator>
  );
}

// function MainStack(){
//   return (
//     <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
//       {/* <Stack.Screen name="Home" component={Home}/>
//       <Stack.Screen name="Chat" component={Chat}/> */}
//       <Stack.Screen name="Edit" component={EditPreferences} />
//       <Stack.Screen name="Profile" component={Profile} initialParams={{isUserEdited: false}}/>
//     </Stack.Navigator>
//   );
// }

// const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function ProfileStack(){
  return (
    <Stack.Navigator initialRouteName="Profile"
    screenOptions={{headerShown: false, animation: "fade"}}>
      <Stack.Screen name="Edit" component={EditPreferences} />
      <Stack.Screen name="Profile" component={Profile} initialParams={{isUserEdited: false}}/>
    </Stack.Navigator>
  );
}

function ChatStack(){
  return (
    <Stack.Navigator initialRouteName="Chats"
    screenOptions={{headerShown: false, animation: "fade"}}>
      <Stack.Screen name="ChatRoom" component={TestChat}/>
      <Stack.Screen name="Chats" component={ChatsList}/>
    </Stack.Navigator>
  );
}

function MainStack(){
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: "black", tabBarStyle: {height: 70}}}>
      <Tab.Screen name="ProfileStack" component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {fontSize: 16, fontFamily: "Helvetica", fontWeight: "light"},
          tabBarIcon: ({color})=><MaterialCommunityIcons name="account" size={32} color={color} />
        }}
      />
      <Tab.Screen name="Swipe" component={SwipePhotosScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {fontSize: 16, fontFamily: "Helvetica", fontWeight: "light"},
          tabBarIcon: ({color})=><MaterialCommunityIcons name="home" size={32} color={color} />
        }}
      />
      <Tab.Screen name="ChatList" component={ChatStack}
        options={{
          tabBarLabel: "Chats",
          tabBarLabelStyle: {fontSize: 16, fontFamily: "Helvetica", fontWeight: "light"},
          tabBarIcon: ({color})=><MaterialCommunityIcons name="chat" size={32} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator(){
  const {user, setUser, isCreated, setIsCreated} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser? setUser(authenticatedUser): setUser(null);
        authenticatedUser? setIsCreated(true): setIsCreated(false);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user, isCreated]);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      { (user && isCreated)?
        <MainStack />:
        <AuthStack />
      }
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <AuthUserProvider>
      <StatusBar barStyle={"default"}/>
      <RootNavigator />
    </AuthUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Palette.primary.background,
  },
  drawerItem: {
    borderRadius: 10,
    fontStyle: "helvetica-regular"
  },
});
