import api from './client';

export function getScores() {
    return api.get('/scores');
}
export function getScore(id) {
    return api.get(`/scores/${id}`);
}
export function postScore(score) {
    return api.post('/scores', score);
}
export function updateScore(id, score) {
    return api.put(`/scores/${id}`, score);
}
export function deleteScore(id) {
    return api.delete(`/scores/${id}`);
}

