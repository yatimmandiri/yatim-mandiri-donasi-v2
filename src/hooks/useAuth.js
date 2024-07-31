'use client';

import { laravel } from '@/libs/axios';
import { notification } from '@/utils/toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const AuthContext = createContext({ empty: true });

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callbackUrl');
  const formDonasi = searchParams.get('formDonasi');
  const nominal = searchParams.get('nominal');
  const quantity = searchParams.get('quantity');

  const [isLoading, setIsLoading] = useState(false);

  const csrf = () => laravel.get(`/csrf-cookie`);

  const {
    data: session,
    mutate,
    isLoading: isLoadingUser,
  } = useSWR('/api/user', () =>
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
        mutate();
        notification({ message: 'Login Successfully', type: 'success' });

        let paramsUrl = new URLSearchParams({ masuk: true });

        if (formDonasi) {
          paramsUrl.append('formDonasi', formDonasi);
        }

        if (nominal) {
          paramsUrl.append('nominal', nominal);
        }

        if (quantity) {
          paramsUrl.append('quantity', quantity);
        }

        let urlCallback = callBackUrl
          ? `${callBackUrl}?${paramsUrl}`
          : `/?masuk=true`;

        setTimeout(() => {
          router.push(urlCallback);
          router.refresh();
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

  const register = async (credentials) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/register', credentials)
      .then((response) => {
        mutate();
        notification({ message: response.data.message, type: 'success' });

        setTimeout(() => {
          router.refresh();
          router.replace('/?register=true');
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

  const forgotPassword = async (credentials) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/forgot-password', credentials)
      .then((response) => {
        mutate();
        notification({
          message: response.data.message,
          type: 'success',
        });

        setTimeout(() => {
          router.push('/auth');
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

  const resetPassword = async (credentials) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/reset-password', credentials)
      .then(() => {
        mutate();
        notification({
          message: 'Reset Password Successfully',
          type: 'success',
        });

        setTimeout(() => {
          router.push('/auth');
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

  const updateProfile = async (credentials) => {
    setIsLoading(true);
    await csrf();

    await laravel
      .post('/api/backend/profile', credentials)
      .then((response) => {
        mutate();
        notification({
          message: response.data.message,
          type: 'success',
        });
      })
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
      .then((response) => {
        mutate(null);
        notification({ message: 'Logout Successfully', type: 'success' });
        setTimeout(() => {
          router.refresh();
          router.push(`/?logout=true`);
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
    isLoadingUser,
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
