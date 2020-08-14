import http from './httpService';
import { apiServer } from '../config';

const apiEndpoint = `${apiServer}/api/image`;

export async function uploadImage(data) {
	return await http.post(apiEndpoint, data);
}
