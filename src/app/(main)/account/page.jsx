import {
  BadgeAccountComponent,
  BoxAccountComponent,
  MenuAccountComponent,
} from '@/components/sections/BoxAccountComponent';
import { AppLayout } from '@/layouts/AppLayout';

export default function AccountPage() {
  const contextValue = {
    headers: {
      logo: true,
      fixed: true,
    },
  };

  return (
    <AppLayout context={contextValue}>
      <div className='flex flex-col space-y-4'>
        <BoxAccountComponent />
        <BadgeAccountComponent />
        <MenuAccountComponent />
      </div>
    </AppLayout>
  );
}
