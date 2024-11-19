import React, { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {auth} from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SingUpScreen';
//============
import {getUserData, getUserFriends} from './src/user';
const userId = "1"; // Example user ID
const userData = await getUserData(userId);
console.log(userData);

const friends = await getUserFriends(userId);
console.log("friends list:\t", friends);
const profile = await getUserProfile(userId);
console.log("full user profile\t", profile);

//============
const Stack = createStackNavigator();
const AuthUserContext = createContext({});


const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthUserContext.Provider>
  )
};

function AuthStack(){
  return (
    <Stack.Navigator defaultScreenOptions={LoginScreen} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
    </Stack.Navigator>
  );
}
const MainScreen = ()=>{
  return(
    <View>
      <Text>MAIN SCREEN</Text>
    </View>
  );
}

function ChatStack(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor:  "#212121"},
        headerTintColor: '#ffffff'
      }}
    >
      {/* <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Chat" component={Chat}/> */}
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator(){
  const {user, setUser} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser? setUser(authenticatedUser): setUser(null);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);
  if(loading){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      { user?
        <ChatStack />:
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
});
