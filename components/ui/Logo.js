import { View, Text, StyleSheet, Image } from "react-native";
function Logo() {
	return (
		<View>
			<Image
				source={require("../../assets/images/Logo.png")}
				style={styles.logo}
			/>
		</View>
	);
}
export default Logo;
const styles = StyleSheet.create({
	logo: {
		width: 350,
		height: 45,
		resizeMode: "contain",
	},
});
