import { FormForgotPasswordComponent } from '@/components/forms/FormForgotPasswordComponent';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-1'>
          <span className='text-lg font-bold text-baseColor-500'>
            Selamat Datang
          </span>
          <span className='text-sm'>
            Selamat menikmati layanan Yatim Mandiri
          </span>
        </div>
        <FormForgotPasswordComponent />
        <div className='flex flex-col space-y-2'>
          <span className='text-xs text-center'>
            Sudah punya akun ?{' '}
            <Link href='/auth/login' className='font-medium text-blue-500'>
              Masuk
            </Link>
          </span>
          <span className='text-xs text-center'>
            Belum punya akun ?{' '}
            <Link href='/auth/register' className='font-medium text-blue-500'>
              Daftar
            </Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
