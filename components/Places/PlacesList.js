import { FlatList, Text, View, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";
function PlacesList({ places }) {
	const navigation = useNavigation();
	function selectPlaceHandler(item) {
		navigation.navigate("PlaceDetails", {
			placeId: item.id,
		});
	}
	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>No photos added yet</Text>
			</View>
		);
	}
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
		/>
	);
}
export default PlacesList;
const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fallbackText: {
		fontSize: 18,
	},
});
