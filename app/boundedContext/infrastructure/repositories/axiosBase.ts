import axios from 'axios';
import useLocalStorage from '@storage/useLocalStorage';

const { getData } = useLocalStorage();

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': 'es-MX',
};

export const api = axios.create({
  baseURL: `${getData('urlServer')}/api/`,
  headers,
});
