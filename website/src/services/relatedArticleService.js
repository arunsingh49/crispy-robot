import http from './httpService';
import { apiServer } from '../config';

const apiEndpoint = `${apiServer}/api/articles/related`;

function articleUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getRelatedArticlesById(id) {
	return http.get(articleUrl(id));
}
