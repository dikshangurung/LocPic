import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/ui/Button";
import PlaceForm from "../../components/Places/PlaceForm";
import { insertPlace } from "../../store/database";
import { storeData } from "../../util/http";
function Add({ navigation }) {
	async function createPlaceHandler(place) {
		await insertPlace(place); //SQLite
		await storeData(place); //firebase
		navigation.navigate("Home");
	}
	return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default Add;
