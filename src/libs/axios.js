import Axios from 'axios';

export const laravel = Axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
