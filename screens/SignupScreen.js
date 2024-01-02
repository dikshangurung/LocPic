import AuthForm from "../components/Auth/AuthForm";
import { useState, useContext } from "react";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";
function SignupScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const authCtx = useContext(AuthContext);
	async function signupHandler({ email, password }) {
		setIsLoading(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed!",
				"Email or password is incorrect"
			);
		}
		setIsLoading(false);
		// console.log(email, password);
	}
	if (isLoading) {
		return <LoadingOverlay message="Loading" />;
	}
	return <AuthForm onAuthenticate={signupHandler} />;
}
export default SignupScreen;
