import {FlatList, TouchableOpacity, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Toast} from "@/components/Toast";

export default function SavedLinks() {
	const storage = useAsyncStorage("savedLinks");
	const [allSavedLinks, setSaveLinks] = useState<string[]>([]);
	const navigation = useNavigation();
	const textColor = useThemeColor({}, "text");
	const dividerColor = useThemeColor({}, "divider");
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		storage.getItem().then((links) => {
			if (links) {
				setSaveLinks(JSON.parse(links));
			}
		});
	}, [storage]);

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="close-outline" size={24} color={textColor} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	async function copyLink(item: string) {
		Clipboard.setUrlAsync(item);
	}
	return (
		<>
			<FlatList
				style={{flex: 1}}
				data={allSavedLinks}
				renderItem={({item}) => (
					<ThemedView style={{paddingVertical: 20, paddingHorizontal: 10}}>
						<TouchableOpacity
							style={styles.pressable}
							onPress={() => {
								copyLink(item);
								setVisible(true);
							}}
						>
							<Ionicons name="link-outline" size={24} color={textColor} />
							<ThemedText>{item}</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				)}
				keyExtractor={(item) => item}
				ItemSeparatorComponent={() => (
					<ThemedView style={{height: 1, backgroundColor: dividerColor}} />
				)}
			/>
			<Toast
				visible={visible}
				text="Link copied to clipboard"
				clear={() => {
					setVisible(false);
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	pressable: {
		flexDirection: "row",
		alignContent: "center",
		gap: 10,
	},
});
