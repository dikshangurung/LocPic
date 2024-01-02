import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../../store/database";

import PlacesList from "../../components/Places/PlacesList";
function Home({ route }) {
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const isFocused = useIsFocused();
	useEffect(() => {
		async function loadedPlaces() {
			const places = await fetchPlaces();
			setLoadedPlaces(places);
		}
		if (isFocused) {
			loadedPlaces();
			// setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
		}
	}, [isFocused]);
	return <PlacesList places={loadedPlaces} />;
}
export default Home;
