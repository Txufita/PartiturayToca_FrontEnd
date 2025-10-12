import api from './client';

export function getInstruments() {
  return api.get('/instruments');
}
export function getInstrument(id) {
  return api.get(`/instruments/${id}`);
}
export function postInstrument(instrument) {
  return api.post('/instruments', instrument);
}
export function deleteInstrument(id) {
    return api.delete(`/instruments/${id}`);
}
export function updateInstruments(id, instrument) {
  return api.put(`/instruments/${id}`, instrument);
}
