import React from "react";
import {ThemedView} from "./ThemedView";
import {Ionicons} from "@expo/vector-icons";
import {ThemedText} from "./ThemedText";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
interface LinksProps {
	url: string;
	openLink: () => void;
	clearLink: () => void;
}
export const Links = ({url, openLink, clearLink}: LinksProps) => {
	const textColor = useThemeColor({}, "text");

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.innerView}>
				<TouchableOpacity style={styles.pressable} onPress={openLink}>
					<Ionicons name="link-outline" size={24} color={textColor} />
					<ThemedText>{url}</ThemedText>
				</TouchableOpacity>

				<TouchableOpacity style={styles.pressable} onPress={clearLink}>
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
		gap: 5,
	},
});
