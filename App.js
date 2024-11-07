import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SingUpScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
