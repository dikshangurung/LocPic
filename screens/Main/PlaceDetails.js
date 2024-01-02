import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";
import { fetchPlaceDetails } from "../../store/database";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/ui/Button";

function PlaceDetails({ route, navigation }) {
	const [fetchedPlace, setFetchedPlace] = useState();

	const selectedPlaceId = route.params.placeId;
	function handleBack() {
		navigation.goBack();
	}
	useEffect(() => {
		async function loadPlaceData() {
			const place = await fetchPlaceDetails(selectedPlaceId);
			setFetchedPlace(place);
			navigation.setOptions({
				title: place.title,
			});
		}

		loadPlaceData();
	}, [selectedPlaceId]);

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place data...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Image
				style={styles.image}
				source={{ uri: fetchedPlace.imageUri }}
			/>
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{fetchedPlace.title}</Text>
					<Text style={styles.address}>
						{fetchedPlace.description}
					</Text>
				</View>
				<Button onPress={handleBack}>Back</Button>
			</View>
		</ScrollView>
	);
}

export default PlaceDetails;

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary500,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
});
