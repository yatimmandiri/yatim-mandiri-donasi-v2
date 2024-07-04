import { FormRegisterComponent } from '@/components/forms/FormRegisterComponent';
import { AuthLayout } from '@/layouts/AuthLayout';
import Link from 'next/link';

export default function RegisterPage() {
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
        <FormRegisterComponent />
        <span className='text-xs text-center'>
          Sudah punya akun ?{' '}
          <Link href='/auth/login' className='font-medium text-blue-500'>
            Masuk
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
}
