import api from './client';

export function getUsers() {
  return api.get('/users');
}
export function getUser(id) {
  return api.get(`/users/${id}`);
}

