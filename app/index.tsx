import {Links} from "@/components/Links";
import {Overlay} from "@/components/Overlay";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {TabBar} from "@/components/ui/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {CameraView, useCameraPermissions} from "expo-camera";
import {router, useNavigation} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import {
	Linking,
	Platform,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";

export default function App() {
	const [permission, requestPermission] = useCameraPermissions();
	const [url, setUrl] = useState<string>("");
	const navigation = useNavigation();
	useEffect(() => {
		navigation.setOptions({headerShown: false});
	}, [navigation]);

	async function openLink() {
		await Linking.openURL(url);
	}

	async function saveLink() {
		if (!url) return;
		const hasSavedLinks = await AsyncStorage.getItem("savedLinks");
		if (hasSavedLinks) {
			const links = JSON.parse(hasSavedLinks);
			if (links.includes(url)) return;
			links.push(url);
			await AsyncStorage.setItem("savedLinks", JSON.stringify(links));
		} else {
			await AsyncStorage.setItem("savedLinks", JSON.stringify([url]));
		}
	}

	async function navigateSettings() {
		router.push("/savedLinks");
	}
	if (!permission) {
		// Camera permissions are still loading.
		return <ThemedView />;
	}
	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<ThemedView style={styles.container}>
				<ThemedText>We need your permission to show the camera</ThemedText>
				<TouchableOpacity onPress={requestPermission}>
					<ThemedText>Grant Permission</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		);
	}

	return (
		<View style={styles.container}>
			{Platform.OS === "android" ? <StatusBar hidden /> : null}
			<CameraView
				style={styles.camera}
				facing="back"
				onBarcodeScanned={({data}) => {
					if (data && data !== url) {
						console.log("setUrl(data);", data);
						setUrl(data);
					}
				}}
			>
				<Overlay />
			</CameraView>

			{Boolean(url) ? (
				<Links
					url={url}
					openLink={openLink}
					clearLink={() => {
						setUrl("");
					}}
				/>
			) : null}
			<TabBar saveLink={saveLink} moreOptions={navigateSettings} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
});
