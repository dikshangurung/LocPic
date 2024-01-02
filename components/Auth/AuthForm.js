import { useState } from "react";
import {
	Alert,
	StyleSheet,
	View,
	Image,
	TextInput,
	Text,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ onAuthenticate }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigation = useNavigation();

	function switchAuthModeHandler() {
		navigation.navigate("Login");
	}
	//Verify if the user has entered the correct credentials
	function submitHandler() {
		//check if name is empty

		if (name.length === 0) {
			Alert.alert("Invalid input", "Please enter your name.");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert(
				"Invalid input",
				"password and confirm password do not match."
			);
			return;
		}
		//check if password is more than 6 characters
		if (password.length < 6) {
			Alert.alert(
				"Invalid input",
				"Please enter a password with more than 6 characters."
			);
			return;
		}
		//Check if email is correct
		if (!email.includes("@")) {
			Alert.alert(
				"Invalid input",
				"email is not valid. Please enter a valid email."
			);
			return;
		}
		onAuthenticate({ email, password });
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.arrowIcon}
				onPress={switchAuthModeHandler}
			>
				<Icon name="arrow-left" size={30} color="#000" />
			</TouchableOpacity>

			<Text style={styles.welcomeText}>Join us now!</Text>
			<Text style={styles.subText}>
				Save a glimpse of your precious memory
			</Text>

			<View style={styles.inputContainer}>
				<Icon
					name="user"
					size={20}
					color="#808080"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Your Name"
					value={name}
					onChangeText={(name) => setName(name)}
				/>
			</View>

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
					name="key"
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

			<View style={styles.inputContainer}>
				<Icon
					name="key"
					size={20}
					color="#808080"
					style={styles.icon}
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					secureTextEntry
					value={confirmPassword}
					onChangeText={(confirmPassword) =>
						setConfirmPassword(confirmPassword)
					}
				/>
			</View>

			<View style={styles.signUpButton}>
				<Button style={styles.signUpButtonText} onPress={submitHandler}>
					Sign Up
				</Button>
			</View>

			<View style={styles.loginTextContainer}>
				<Text style={styles.loginText}>Already have an account? </Text>
				<TouchableOpacity onPress={switchAuthModeHandler}>
					<Text style={styles.loginLink}>Login</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		// backgroundColor: "red"
	},
	arrowIcon: {
		position: "absolute",
		top: 70,
		left: 20,
	},
	welcomeText: {
		width: "100%",
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: -100,
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
	signUpButton: {
		width: "100%",
		// height: 50,
		// backgroundColor: "#808080",
		// paddingVertical: 15,
		// paddingHorizontal: 30,
		borderRadius: 5,
		marginBottom: 20,
	},
	signUpButtonText: {
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
		// paddingVertical: 5,
	},
	loginTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	loginText: {
		fontSize: 16,
	},
	loginLink: {
		fontSize: 16,
		color: "#3498db",
	},
});
