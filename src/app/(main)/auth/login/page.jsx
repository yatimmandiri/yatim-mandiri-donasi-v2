import { FormLoginComponent } from '@/components/forms/FormLoginComponent';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';

export default function LoginPage() {
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
        <FormLoginComponent />
        <span className='text-xs text-center'>
          Belum punya akun ?{' '}
          <Link href='/auth/register' className='font-medium text-blue-500'>
            Daftar
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
}
