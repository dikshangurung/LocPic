import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const containerStyle = {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	gap: 16,
};

const StarContainerStyle = {
	flexDirection: "row",
};

export default function StarRating({
	maxRating = 5,
	color = "#fcc419",
	size = 48,
	className = "",
	messages = [],
	onSetRating,
}) {
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);

	const textStyle = {
		lineHeight: 1,
		margin: 0,
		color: color,
		fontSize: size / 1.5,
	};

	function changeRating(rating) {
		setRating(rating);
		if (onSetRating) onSetRating(rating);
	}

	return (
		<View style={containerStyle} className={className}>
			<View style={StarContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onRate={() => changeRating(i + 1)}
						full={
							tempRating ? tempRating >= i + 1 : rating >= i + 1
						}
						onHoverIn={() => setTempRating(i + 1)}
						onHoverOut={() => setTempRating(0)}
						color={color}
						size={size}
					/>
				))}
			</View>
			<Text style={textStyle}>
				{messages.length === maxRating
					? messages[tempRating - 1] || messages[rating - 1]
					: tempRating || rating || ""}
			</Text>
		</View>
	);
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
	const starStyle = {
		width: size,
		height: size,
		cursor: "pointer",
	};

	return (
		<TouchableOpacity
			onPress={onRate}
			onPressIn={onHoverIn}
			onPressOut={onHoverOut}
		>
			<View style={starStyle}>
				{full ? (
					<Ionicons name="star" size={30} color="#fcc419" />
				) : (
					<Ionicons name="star-outline" size={30} color="#fcc419" />
				)}
			</View>
		</TouchableOpacity>
	);
}
