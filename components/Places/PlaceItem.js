import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
function PlaceItem({ place, onSelect }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.item, pressed && styles.pressed]}
			onPress={() => onSelect(place)}
		>
			<Image style={styles.image} source={{ uri: place.imageUri }} />
			<View style={styles.info}>
				<Text style={styles.title}>{place.title}</Text>
				<Text style={styles.description}>{place.description} </Text>
				<Text style={styles.rating}>
					{place.rating}{" "}
					<Ionicons name="star" size={15} color="#fcc419" />
				</Text>
			</View>
		</Pressable>
	);
}
export default PlaceItem;
const styles = StyleSheet.create({
	item: {
		marginHorizontal: 30,
		// flexDirection: "row",
		alignItems: "flex-start",
		borderRadius: 12,
		marginVertical: 20,
		backgroundColor: "white",
		elevation: 2,
		shadowColor: "black",
		shadowOpacity: 0.65,
		shadowOffset: { width: 1, height: 2 },
		shadowRadius: 2,
	},
	pressed: {
		opacity: 0.5,
	},
	image: {
		flex: 1,
		borderBottomLeftRadius: 4,
		borderTopLeftRadius: 4,
		width: "100%",
		height: 170,
		opacity: 0.8,
	},
	info: {
		flex: 2,
		padding: 12,
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		color: Colors.gray700,
	},
	rating: {
		fontSize: 12,
		color: Colors.gray700,
	},
});
