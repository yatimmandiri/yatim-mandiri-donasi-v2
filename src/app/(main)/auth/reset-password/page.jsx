import { FormResetPasswordComponent } from '@/components/forms/FormResetPasswordComponent';
import { AuthLayout } from '@/layouts/AuthLayout';

export default function ResetPasswordPage() {
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
        <FormResetPasswordComponent />
      </div>
    </AuthLayout>
  );
}
