import http from './httpService';
import { apiServer } from '../config';

const apiEndpoint = `${apiServer}/api/categories`;

function categoryUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getCategories() {
	const { data: categories } = await http.get(`${apiEndpoint}`);
	return categories;
}

export async function getCategoryById(id) {
	const { data: category } = await http.get(categoryUrl(id));
	return category;
}
