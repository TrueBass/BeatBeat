import {React} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { button, buttonText } from '../styles/style';

export default function BeatButton({onPress, title, width, height, marginHorizontal = 0, marginVertical = 0,  marginBottom = 0, marginTop = 0, margin = 0}){
	return(
		<TouchableOpacity
      style={[
          button, {width, height,
          marginVertical, marginHorizontal, margin, marginBottom, marginTop, }
        ]}
      onPress={onPress}>
			<Text style={buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}