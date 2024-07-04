import { toast } from 'react-toastify';

export const toastOptions = {
  position: 'top-right',
  autoClose: 1000,
};

export const notification = ({
  message = 'Success Notification !',
  type = 'success',
}) => {
  switch (type) {
    case 'success':
      return toast.success(message, toastOptions);
    case 'info':
      return toast.success(message, toastOptions);
    case 'warning':
      return toast.warning(message, toastOptions);
    case 'error':
      return toast.error(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};
