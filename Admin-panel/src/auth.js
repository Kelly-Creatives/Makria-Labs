import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
export const TOKEN_STORAGE_KEY = 'makria_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function authHeaders(headers = {}) {
  const token = getToken();

  return {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiFetch(url, options = {}) {
  const headers = authHeaders({ ...(options.headers || {}) });
  const requestUrl = url.startsWith('http') ? url : `${API_BASE}${url.startsWith('/') ? url : `/${url}`}`;

  try {
    const response = await axios({
      url: requestUrl,
      ...options,
      headers,
      withCredentials: true,
    });

    const payload = response.data;

    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: payload,
      json: async () => payload,
      text: async () => (typeof payload === 'string' ? payload : JSON.stringify(payload)),
    };
  } catch (error) {
    const errResponse = error.response || {
      status: 500,
      data: { message: error.message || 'Request failed' },
    };

    const payload = errResponse.data || {};

    return {
      ok: false,
      status: errResponse.status,
      statusText: errResponse.statusText || 'Error',
      headers: errResponse.headers || {},
      data: payload,
      json: async () => payload,
      text: async () => (typeof payload === 'string' ? payload : JSON.stringify(payload)),
    };
  }
}

export { API_BASE };
