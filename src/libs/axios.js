import Axios from 'axios';

export const laravel = Axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  },
  withCredentials: true,
});
