import { useState } from "react";
import {
	Alert,
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";

function AuthContent({ onAuthenticate }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	function switchAuthModeHandler() {
		navigation.navigate("Signup");
	}
	function submitHandler() {
		//check if email or password is empty
		if (email.length === 0 || password.length === 0) {
			Alert.alert(
				"Invalid input",
				"Please enter a valid email and password."
			);
			return;
		}
		onAuthenticate({ email, password });
	}

	return (
		<View style={styles.container}>
			<Image
				source={require("../../assets/images/Logo.png")}
				style={styles.logo}
			/>

			<Text style={styles.welcomeText}>Welcome Back!</Text>
			<Text style={styles.subText}>Sign in to Continue</Text>

			<View style={styles.inputContainer}>
				<Icon
					name="envelope"
					size={20}
					color="#808080"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					keyboardType="email-address"
					autoCapitalize="none"
					value={email}
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Icon
					name="lock"
					size={20}
					color="#808080"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<TouchableOpacity style={styles.signInButton}>
				<Button style={styles.signInButtonText} onPress={submitHandler}>
					Sign In
				</Button>
			</TouchableOpacity>

			<View style={styles.signUpTextContainer}>
				<Text style={styles.signUpText}>Don't have an account? </Text>
				<TouchableOpacity onPress={switchAuthModeHandler}>
					<Text style={styles.signUpLink}>Signup</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default AuthContent;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		// marginTop: 50,
		paddingTop: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	logo: {
		width: 150,
		height: 100,
		resizeMode: "contain",
		position: "absolute",
		top: 80,
		left: 20,
	},
	welcomeText: {
		width: "100%",
		marginTop: -100,
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "left",
	},
	subText: {
		width: "100%",
		fontSize: 18,
		fontWeight: "bold",
		color: "#808080",
		marginBottom: 50,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 40,
		borderBottomWidth: 1,
		borderColor: "#808080",
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	signInButton: {
		width: "100%",
		// backgroundColor: "#808080",
		// paddingVertical: 15,
		// paddingHorizontal: 30,
		borderRadius: 5,
		marginBottom: 20,
	},
	signInButtonText: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
	},
	signUpTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	signUpText: {
		fontSize: 16,
	},
	signUpLink: {
		fontSize: 16,
		color: "#3498db",
	},
});
