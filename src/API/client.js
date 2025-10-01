import axios from 'axios';

const api = axios.create({ 
  baseURL: import.meta.env.API_URL || 'http://localhost:4000/api', 
  withCredentials: false
});

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('authToken', token); 
    api.defaults.headers.common.Authorization = `Bearer ${token}`; 
  } else {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common.Authorization; 
  }
}
const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`; 
}
api.interceptors.request.use((config)=> {
  const tk=localStorage.getItem('authToken');
  if (tk){
    config.headers.Authorization = `Bearer ${tk}`;
  }
  return config;
})
export default api;