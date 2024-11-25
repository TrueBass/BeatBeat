import React, { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {auth} from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SingUpScreen';
import AgeCats from "./src/screens/AgeCats";
import Relationship from "./src/screens/Relationship";
import YourSex from "./src/screens/YourSex";
import AreYouGay from "./src/screens/AreYouGay";
import AutoBio from "./src/screens/AutoBio";
import Profile from "./src/screens/Profile";

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
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="AutoBio" component={AutoBio}/>
      <Stack.Screen name="AgeCats" component={AgeCats}/>
      <Stack.Screen name="YourSex" component={YourSex}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="AreYouGay" component={AreYouGay}/>
      <Stack.Screen name="Relationship" component={Relationship}/>
    </Stack.Navigator>
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
      <Stack.Screen name="Profile" component={Profile} />
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
