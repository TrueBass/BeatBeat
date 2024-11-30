import {React} from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native';

export default function InputField({value, setValue, placeholder, keyboardType="default", textContentType="none", secureTextEntry=false, autoComplete="off", autoCorrect=true}){
    return(
        <View style={styles.container}>
            <TextInput
             value={value}
             onChangeText={setValue}
             placeholder={placeholder}
             style={styles.input}
             secureTextEntry={secureTextEntry}
             autoComplete={autoComplete}
             keyboardType={keyboardType}
             textContentType={textContentType}
             importantForAutofill="no"
             autoCorrect={autoCorrect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderBlockColor :'grey',
        borderWidth: 1,
        borderRadius: 10,
        borderStyle:"solid",
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:10,
    },
    input: {
        
    },
})