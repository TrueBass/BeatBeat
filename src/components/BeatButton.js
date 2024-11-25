import {React} from 'react'
import {Text,StyleSheet,TouchableOpacity} from 'react-native'

export default function BeatButton({onPress,text,type = "primary"}){
    return(
        <TouchableOpacity onPress={onPress} style={[styles.container,styles[`container_${type}`]]}>
           <Text style={[styles.text,styles[`text_${type}`]]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	container:{
		width:'100%',
		padding:15,
		marginVertical:25,
		alignItems:'center',
		borderRadius:5,
	},

	container_primary:{
		backgroundColor: '#48484b',
	},

	container_tertiary:{
			
	},

	text:{
		frontWeight:'bold',
		color:'white',
	},

	text_tertiary:{
		color:'#616a6a',
	}
});