import api from './client';

export function getComposers() {
  return api.get('/composers');
}
export function getComposer(id) {
  return api.get(`/composers/${id}`);
}
export function postComposer(composer) {
  return api.post('/composers', composer);
}
export function updateComposer(id, composer) {
    return api.put(`/composers/${id}`, composer);
}
export function deleteComposer(id) {
    return api.delete(`/composers/${id}`);
}
