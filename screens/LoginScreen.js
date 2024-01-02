import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const authCtx = useContext(AuthContext);
	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await login(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				"Authentication failed!",
				"Email or password is incorrect"
			);
			setIsAuthenticating(false); // it means that the user is not authenticated and it will not go to the welcome screen and it will stay on the login screen so it will not cause any warning
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Loading" />;
	}

	return <AuthContent onAuthenticate={loginHandler} />;
}

export default LoginScreen;
