import http from './httpService';
import { apiServer } from '../config';

const apiEndpoint = `${apiServer}/api/articles`;

function articleUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getArticles() {
	const { data: articles } = await http.get(`${apiEndpoint}`);
	return articles;
}

export async function getArticleById(id) {
	return await http.get(articleUrl(id));
}

export async function updateArticleById(id, data) {
	return await http.put(articleUrl(id), data);
}
