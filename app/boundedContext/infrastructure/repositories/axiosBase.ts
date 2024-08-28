import axios from 'axios';
import LocalStorage from '@storage/localStorage';

const localStorage = new LocalStorage('urlServer');
localStorage.getData();
const url = localStorage.valueStoraged;
console.log(`url ${url}`);

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': 'es-MX',
};

export const api = axios.create({
  baseURL: `${url}/api/`,
  headers,
});
