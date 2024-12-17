import React, { createContext, useContext, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {auth} from "./config/firebase";
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

// function ChatStack(){
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

function Second(){

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Second</Text>
    </View>
  );
}


function ChatStack(){
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarActiveTintColor: "black"}}>
      {/* <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Chat" component={Chat}/> */}
      <Tab.Screen name="ProfileStack" component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {fontSize: 16},
          tabBarIcon: (color)=><MaterialCommunityIcons name="account" size={32} color={color} />
        }}
      />
      <Tab.Screen name="Second" component={Second}/>
      <Tab.Screen name="Chat" component={TestChat}/>
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
        <ChatStack />:
        <AuthStack />
      }
      {/* <ChatStack/> */}
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
