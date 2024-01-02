import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";

import AppLoading from "expo-app-loading";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import IconButton from "./components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import Home from "./screens/Main/Home";
import Add from "./screens/Main/Add";
import Profile from "./screens/Main/Profile";
import Logo from "./components/ui/Logo";
import { init } from "./store/database";
import PlaceDetails from "./screens/Main/PlaceDetails";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
function AllPlaces() {
	return (
		<BottomTabs.Navigator>
			<BottomTabs.Screen
				tabBarOptions={{
					style: {
						elevation: 0, // Remove shadow on Android
						shadowOpacity: 0, // Remove shadow on iOS
						borderTopWidth: 0, // Remove top border
						position: "absolute", // Position the tab bar absolutely
						bottom: 0, // Place it at the bottom
						backgroundColor: "red",
						marginBottom: 20,
					},
				}}
				name="Home"
				component={Home}
				options={{
					title: <Logo />,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="Add"
				component={Add}
				options={{
					title: <Logo />,
					tabBarLabel: "",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="add-circle"
							size={size + 45}
							color={color}
							style={{
								// marginBottom: 25,
								color: Colors.primary500,
								// backgroundColor: Colors.primary500,
								// overflow: "visible",
								position: "absolute", // Here is the trick
								// position: "relative", // Adjust position to give the lifted effect
								top: -38, // Lift the tab up by 10 units (adjust as needed)
								// paddingBottom: 30,
							}}
						/>
					),
				}}
			/>
			<BottomTabs.Screen
				name="Profile"
				component={Profile}
				options={{
					title: <Logo />,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
}

function AuthenticatedStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary300 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: "#fff" },
			}}
		>
			<Stack.Screen
				name="AllPlaces"
				component={AllPlaces}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Add"
				component={Add}
				options={{ title: "Add" }}
				presentation="modal"
			/>
			<Stack.Screen
				name="PlaceDetails"
				component={PlaceDetails}
				options={{ headerShown: true, title: "Place Details" }}
				presentation="modal"
			/>
		</Stack.Navigator>
	);
}
function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false, title: "Login" }}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{/* <AuthenticatedStack /> */}
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);
	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (!dbInitialized) {
		return <AppLoading />;
	}
	return (
		<>
			<StatusBar style="dark" />
			<AuthContextProvider>
				<Navigation />
			</AuthContextProvider>
		</>
	);
}
