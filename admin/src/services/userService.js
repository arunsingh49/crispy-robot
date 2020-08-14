import http from './httpService';
import { apiServer } from '../config.json';

const apiEndpoint = `${apiServer}/api/users`;

export function registerUser(user) {
	return http.post(apiEndpoint, user);
}
