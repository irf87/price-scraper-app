import axios from 'axios';
import LocalStorage from '@infrastructure/storage/localStorage';

const localStorage = new LocalStorage('urlServer');
localStorage.getData();
const url = localStorage.valueStoraged;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': 'es-MX',
};

export const api = axios.create({
  baseURL: `${url}/api/`,
  headers,
});

export const updateAxiosBaseUrl = () => {
  localStorage.getData();
  const newUrl = localStorage.valueStoraged;
  api.defaults.baseURL = `${newUrl}/api/`;
};
