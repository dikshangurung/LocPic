import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/ui/Button";
import { AuthContext } from "../../store/auth-context";
// const handleLogout = () => {
// 	const authCtx = useContext(AuthContext);
// 	// Show the confirmation alert
// 	Alert.alert(
// 		"Logout",
// 		"Are you sure you want to logout?",
// 		[
// 			{
// 				text: "Cancel",
// 				style: "cancel",
// 			},
// 			{
// 				text: "Yes",
// 				onPress: () => {
// 					authCtx.logout();
// 				},
// 			},
// 		],
// 		{ cancelable: false }
// 	);
// };
function Add() {
	const authCtx = useContext(AuthContext);
	const navigation = useNavigation();
	return (
		<View>
			{/* Your Logout component content goes here */}

			{/* Button to trigger the confirmation alert */}
			<Button onPress={() => authCtx.logout()}>Logout</Button>
		</View>
	);
}
export default Add;
