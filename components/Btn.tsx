import { Pressable, StyleProp, ViewStyle, TextStyle, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme } from 'react-native-paper'

const { width, height } = Dimensions.get("window")

interface ButtonCalParams {
	label: string | number,
	onPress: (value: string | number) => void,
	style?: StyleProp<ViewStyle>,
	textStyle?: StyleProp<TextStyle>
	onLongPress: (value: string | number) => void
}

export function ButtonCal({label, onPress, style, textStyle, onLongPress}: ButtonCalParams){
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
			onPress={() => onPress(label)}
			onLongPress={() => onLongPress(label)}
		>
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
