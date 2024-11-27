import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vrv-security-json-server.vercel.app/',
});

export default api;
