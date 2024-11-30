import React from "react";
import {ThemedView} from "./ThemedView";
import {Ionicons} from "@expo/vector-icons";
import {ThemedText} from "./ThemedText";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
interface LinksProps {
	visible: boolean;
	text: string;
	clear: () => void;
}
export const Toast = ({visible, text, clear}: LinksProps) => {
	const textColor = useThemeColor({}, "text");
	if (!visible) return null;
	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.innerView}>
				<ThemedText>{text}</ThemedText>
				<TouchableOpacity style={styles.pressable} onPress={clear}>
					<Ionicons name="close-outline" size={24} color={textColor} />
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
};
const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "transparent",
		marginBottom: 20,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 80,
	},
	innerView: {
		flexDirection: "row",
		borderRadius: 5,
		gap: 10,
		padding: 10,
	},
	pressable: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
	},
});
