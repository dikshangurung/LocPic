import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/styles";
import ImagePicker from "./ImagePicker";
import StarPicker from "./StarPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";

//Notification settings
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
		};
	},
});
const allowsNotificationsAsync = async () => {
	const settings = await Notifications.getPermissionsAsync();
	return (
		settings.granted ||
		settings.ios?.status ===
			Notifications.IosAuthorizationStatus.PROVISIONAL
	);
};

const requestPermissionsAsync = async () => {
	return await Notifications.requestPermissionsAsync({
		ios: {
			allowAlert: true,
			allowBadge: true,
			allowSound: true,
			allowAnnouncements: true,
		},
	});
};
function PlaceForm({ onCreatePlace }) {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredDescripton, setEnteredDescription] = useState("");
	const [selectedImage, setSelectedImage] = useState(null);
	const [userRating, onSetRating] = useState(0);

	function initial() {
		setEnteredTitle("");
		setEnteredDescription("");
		setSelectedImage(null);
		onSetRating(0);
	}
	const scheduleNotificationHandler = async () => {
		const hasPushNotificationPermissionGranted =
			await allowsNotificationsAsync();

		if (!hasPushNotificationPermissionGranted) {
			await requestPermissionsAsync();
		}

		Notifications.scheduleNotificationAsync({
			content: {
				title: "New post",
				body: "New post is added to your storage",
				data: { userName: "Karki" },
			},
			trigger: {
				seconds: 2,
			},
		});
	};
	function changeTitleHandler(enteredText) {
		setEnteredTitle(enteredText);
	}
	function changeDescriptionHandler(enteredText) {
		setEnteredDescription(enteredText);
	}
	function takeImageHandler(imageUri) {
		setSelectedImage(imageUri);
	}
	function save() {
		const placeData = new Place(
			enteredTitle,
			selectedImage,
			userRating,
			enteredDescripton
		);
		onCreatePlace(placeData);
		scheduleNotificationHandler();
		initial();
	}
	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title:</Text>
				<TextInput
					style={styles.input}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker onTakeImage={takeImageHandler} />
			<StarPicker maxRating={5} onSetRating={onSetRating} />
			<View>
				<Text style={styles.label}>Say something about the photo:</Text>
				<TextInput
					style={styles.descriptionInput}
					onChangeText={changeDescriptionHandler}
					value={enteredDescripton}
				/>
			</View>
			<Button onPress={save}>Submit</Button>
		</ScrollView>
	);
}

export default PlaceForm;

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 4,
		color: Colors.primary500,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		// backgroundColor: "#333",
	},
	descriptionInput: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		// backgroundColor: "#333",
	},
});
