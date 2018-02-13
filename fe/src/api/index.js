import Axios from 'axios';

const API_ROOT = 'http://localhost:3006';

const config = {
  baseURL: API_ROOT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  responseType: 'json'
};

function api(configParams = {}) {
  const axios = Axios.create({ ...config, ...configParams });

  axios.defaults.withCredentials = true;

  return axios;
}

export default api;
