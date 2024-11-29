export const API_BASE = 'https://v2.api.noroff.dev';

export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_BASE_AUCTION = 'https://v2.api.noroff.dev/auction';

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`

export const API_LOGIN = `${API_AUTH}/login`;

export const API_REGISTER = `${API_AUTH}/register`;

export const API_BASE_LISTINGS = `${API_BASE_AUCTION}/listings`;

export const API_BASE_PROFILE = `${API_BASE_AUCTION}/profiles`;
