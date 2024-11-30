import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useThemeColor} from "@/hooks/useThemeColor";
import {ThemedView} from "../ThemedView";
interface TabBarProps {
	saveLink: () => void;
	moreOptions: () => void;
}

export const TabBar = ({saveLink, moreOptions}: TabBarProps) => {
	const tintColor = useThemeColor({}, "text");
	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={saveLink}>
					<Ionicons name="heart-outline" size={32} color={tintColor} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={moreOptions}>
					<Ionicons name="menu-outline" size={32} color={tintColor} />
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
};
const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		height: 64,
		width: "100%",
		backgroundColor: "transparent",
		marginBottom: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		width: "50%",
		flexDirection: "row",
		borderRadius: 15,
		padding: 10,
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 5,
	},
});
