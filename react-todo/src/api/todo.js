import { apiAuthRequest } from '../apiClient';

// Ambil semua todo milik user yang login
export async function getTodos(token) {
  return apiAuthRequest('/todos', token, {
    method: 'GET',
  });
}

// Buat todo baru
export async function createTodo(token, payload) {
  // payload contoh: { title: 'Belajar React' }
  return apiAuthRequest('/todos', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// Update todo (misalnya ubah completed)
export async function updateTodo(token, id, payload) {
  // payload contoh: { completed: true }
  return apiAuthRequest(`/todos/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// Hapus todo
export async function deleteTodo(token, id) {
  await apiAuthRequest(`/todos/${id}`, token, {
    method: 'DELETE',
  });
}