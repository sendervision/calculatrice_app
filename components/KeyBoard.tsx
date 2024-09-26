
import { Dimensions, StyleSheet, View, StyleProp, ViewStyle } from 'react-native'

import { useTheme } from 'react-native-paper'
import { ButtonCal } from "./Btn"

interface KeyBoardParam {
	style?: StyleProp<ViewStyle>,
	onPressedButton: (value: string | number) => void

}

const { height } = Dimensions.get("window")

export function KeyBoard({ style, onPressedButton }: KeyBoardParam){
	const theme = useTheme()

	const input_number = [
		["C", "÷", "×"],
		[7, 8, 9],
		[4, 5, 6],
		[1, 2, 3],
		["%", 0, "."],
	]


	return(
		<View style={[styles.container, style]} >
			<View style={{gap: 5}}>
				{
					input_number.map((array_number, index) => (
						<View key={index} style={{...styles.row}}>
							{
								array_number.map(value => (
									<ButtonCal 
										key={value}
										label={value}
										style={{backgroundColor: index == 0? theme.colors.primaryContainer : theme.colors.background}}
										textStyle={{color: theme.colors.primary}}
										onPress={onPressedButton}
									/>
								))
							}
						</View>
					))
				}
			</View>
			<View style={{gap: 5, justifyContent: "center", marginTop: 8}} >
				{
					["⊗", "-", "+", "="].map((value, index) => (
						<ButtonCal 
							key={value}
							label={value}
							style={{
								backgroundColor: index == 3? theme.colors.primary : theme.colors.primaryContainer,
								height: index == 3? height / 5 : height / 10
							}}
							textStyle={{color: index == 3? theme.colors.background : theme.colors.primary}}
							onPress={onPressedButton}
						/>
					))
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
		width: "100%"
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5
	},
	column: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}
})
