import {React} from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native';

export default function InputField({value, setValue,placeholder,secureTextEntry}){
    return(
        <View style={styles.container}>
            <TextInput
             value={value}
             onChangeText={setValue}
             placeholder={placeholder}
             style={styles.input}
             secureTextEntry={secureTextEntry}
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