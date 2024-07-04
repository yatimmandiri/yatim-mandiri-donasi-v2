import Axios from 'axios';

export const laravel = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
