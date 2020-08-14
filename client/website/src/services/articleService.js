import http from './httpService';
import { apiServer } from '../config';

const apiEndpoint = `${apiServer}/api/articles`;

function articleUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getArticles(pageNumber, pageSize, category) {
	let query = '';
	if (category) query = `category=${category}`;

	const { data } = await http.get(
		`${apiEndpoint}?page=${pageNumber}&size=${pageSize}&${query}`,
	);

	const {
		data: { count },
	} = await http.get(`${apiEndpoint}/count?${query}`);

	return { data, count };
}

export async function getArticleById(id) {
	return await http.get(articleUrl(id));
}
