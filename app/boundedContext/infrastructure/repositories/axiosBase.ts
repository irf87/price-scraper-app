import axios from 'axios';
import LocalStorage from '@infrastructure/storage/localStorage';

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

// Función para actualizar la URL base de axios
export const updateAxiosBaseUrl = () => {
  localStorage.getData();
  const newUrl = localStorage.valueStoraged;
  console.log(`Actualizando URL base a: ${newUrl}`);
  api.defaults.baseURL = `${newUrl}/api/`;
};
