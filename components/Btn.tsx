import { Pressable, StyleProp, ViewStyle, TextStyle, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from 'react-native-paper'

const { width, height } = Dimensions.get("window")

interface ButtonCalParams {
	label: string | number,
	onPress: (value: string | number) => void,
	style?: StyleProp<ViewStyle>,
	textStyle?: StyleProp<TextStyle>
}

export function ButtonCal({label, onPress, style, textStyle}: ButtonCalParams){
	const theme = useTheme()

	return(
		<Pressable 
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.primary
				},
				style,
			]} 
			onPress={() => onPress(label)}>
			<Text
				style={[
					{
						color: theme.colors.background,
						fontSize: 20,
						fontWeight: "bold"
					},
					textStyle,
				]}
			>
			{label}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		width: width / 4.5,
		height: height / 10,
		borderRadius: 5,
	}
})
