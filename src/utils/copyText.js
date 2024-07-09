import { notification } from './toast';

export const copyText = (value) => {
  navigator.clipboard.writeText(value);
  notification({ message: 'Berhasil Copy Text', type: 'success' });
};
