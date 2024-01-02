import axios from "axios";

const BACKEND_URL = "https://locpic-e4d2a-default-rtdb.firebaseio.com";

export async function storeData(data) {
	const response = await axios.post(BACKEND_URL + "/dataObj.json", data);
	const id = response.data.name;
	return id;
}

export async function fetchExpenses() {
	const response = await axios.get(BACKEND_URL + "/dataObj.json");

	const photoData = [];

	for (const key in response.data) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		photoData.push(expenseObj);
	}

	return photoData;
}

export function updateExpense(id, expenseData) {
	return axios.put(BACKEND_URL + `/dataObj/${id}.json`, expenseData);
}

export function deleteExpense(id) {
	return axios.delete(BACKEND_URL + `/dataObj/${id}.json`);
}
