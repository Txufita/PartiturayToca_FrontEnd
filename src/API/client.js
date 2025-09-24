import axos from 'axios';

const api = axos.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
});
export default api;