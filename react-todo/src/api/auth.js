import { apiRequest } from '../apiClient';

export async function registerApi(payload) {
  // payload: { name, email, password, password_confirmation }
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginApi(payload) {
  // payload: { email, password }
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}