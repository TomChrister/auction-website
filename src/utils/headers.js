import { API_KEY } from './contants.js';

// no auth required
export const defaultHeaders = {
    'Content-Type': 'application/json',
};

// auth required
export function authHeaders() {
    const token = sessionStorage.getItem('accessToken');
    return {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-KEY': API_KEY,
        'Content-Type': 'application/json'
    };
}
