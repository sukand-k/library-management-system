import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/'
});

// set default Authorization header if token present
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function setAuthToken(tokenValue) {
  if (tokenValue) {
    API.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}

export default API;
