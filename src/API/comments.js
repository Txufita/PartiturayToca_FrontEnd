import api from './client';

export function getScoreComments(scoreId) {
  return api.get(`/scores/${scoreId}/comments`);
}
export function postComment(scoreId, datos) {
    return api.post(`/scores/${scoreId}/comments`, datos);
}
export function updateComment(id, comment) {
    return api.put(`/comments/${id}`, comment);
}
export function deleteComment(id) {
    return api.delete(`/comments/${id}`);
}
