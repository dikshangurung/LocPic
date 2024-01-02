import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const database = SQLite.openDatabase("placesData.db");

export function init() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS placesData (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          rating INTEGER NOT NULL,
          description TEXT NOT NULL
        )`,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}

export function insertPlace(place) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO placesData (title, imageUri, rating,description) VALUES (?, ?, ?, ?)`,
				[place.title, place.imageUri, place.rating, place.description],
				(_, result) => {
					// console.log(result);
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}

export function fetchPlaces() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM placesData",
				[],
				(_, result) => {
					console.log(result);
					const placesData = [];

					for (const dp of result.rows._array) {
						placesData.push(
							new Place(
								dp.title,
								dp.imageUri,
								dp.rating,
								dp.description,
								dp.id
							)
						);
					}
					resolve(placesData);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}

export function fetchPlaceDetails(id) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM placesData WHERE id = ?",
				[id],
				(_, result) => {
					console.log(result.rows._array[0]);
					const dbPlace = result.rows._array[0];
					const place = new Place(
						dbPlace.title,
						dbPlace.imageUri,
						dbPlace.rating,
						dbPlace.description,
						dbPlace.id
					);
					resolve(place);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}
