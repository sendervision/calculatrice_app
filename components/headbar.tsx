
import { StatusBar } from "expo-status-bar"
import { Appbar, useTheme } from "react-native-paper"
import { useTheme as useGetTheme } from "@/hooks/theme"

export function HeadBar(){
	const theme = useTheme()
	const getTheme = useGetTheme()

	return(
		<>
			<Appbar.Header
				style={{
					backgroundColor: theme.colors.primaryContainer
				}}
			>
				<Appbar.Content title="" />
				<Appbar.Action 
					icon={
						getTheme.theme == "dark"
						? "white-balance-sunny" 
						: "moon-waning-crescent"
					}
					iconColor={theme.colors.primary} 
					onPress={() => { getTheme.toggleTheme()}}
				/>
			</Appbar.Header>
			<StatusBar 
				backgroundColor={theme.colors.primaryContainer}
				style={getTheme.theme === "light"? "dark" : "light"}
			/>
		</>
	)
}

