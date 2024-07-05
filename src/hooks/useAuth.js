'use client';

import { laravel } from '@/libs/axios';
import { notification } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const AuthContext = createContext({ empty: true });

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const csrf = () => laravel.get(`/csrf-cookie`);

  const { data: session, mutate } = useSWR('/api/user', () =>
    laravel
      .get('/api/backend/user')
      .then((res) => res.data.data)
      .catch((err) => console.log(err.response.data.message))
  );

  const login = async (credentials) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/login', credentials)
      .then((response) => {
        notification({ message: response.data.message, type: 'success' });

        setTimeout(() => {
          mutate();
          router.replace('/account');
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.message);

        notification({
          message: err.response.data.message,
          type: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const register = async ({ ...props }) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/register', props)
      .then((response) => {
        notification({ message: response.data.message, type: 'success' });

        setTimeout(() => {
          mutate();
          router.replace('/account');
        }, 2000);
      })
      .catch((err) =>
        notification({
          message: err.response.data.message,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const forgotPassword = async ({ ...props }) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/forgot-password', props)
      .then((response) => {
        notification({
          message: response.data.message,
          type: 'success',
        });

        setTimeout(() => {
          mutate();
          router.replace('/auth');
        }, 2000);
      })
      .catch((err) =>
        notification({
          message: err.response.data.message,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const resetPassword = async ({ ...props }) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/reset-password', props)
      .then(() => {
        notification({
          message: 'Reset Password Successfully',
          type: 'success',
        });

        setTimeout(() => {
          mutate();
          router.replace('/auth');
        }, 2000);
      })
      .catch((err) =>
        notification({
          message: err.response.data.message,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const updateProfile = async ({ ...props }) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/profile', props)
      .then(() => mutate())
      .catch((err) =>
        notification({
          message: err.response.data.message,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);

    await laravel
      .post('/api/backend/logout')
      .then(() => {
        notification({ message: 'Logout Successfully', type: 'success' });

        setTimeout(() => {
          mutate();
          router.refresh();
        }, 2000);
      })
      .catch((err) =>
        notification({
          message: err.response.data.message,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {}, [session]);

  const contextValue = {
    session,
    csrf,
    isLoading,
    login,
    logout,
    updateProfile,
    resetPassword,
    forgotPassword,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
