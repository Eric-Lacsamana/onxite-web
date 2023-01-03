import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.paramsSerializer = (params) => qs.stringify(params);

export function attachToken(token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function detachToken() {
    delete instance.defaults.headers.common.Authorization;
}

export default instance;
