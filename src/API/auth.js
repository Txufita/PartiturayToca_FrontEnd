import api from './client';
import { setAuthToken } from './client';

export async function login({email, password}) {
  const {data} = await api.post('/auth/login', {email, password});
  setAuthToken(data.token);
  return data;  
}
export function register({username, password, email}) {
    return api.post('/auth/register', {username, password, email});
}
export function logout() {
    setAuthToken(null);
}   
