'use client';

import { UseApp } from '@/hooks/useApp';
import classNames from 'classnames';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export const NavigationMenuComponent = () => {
  const router = useRouter();
  const path = usePathname();

  const menus = [
    {
      id: 1,
      name: 'Home',
      icons: '/assets/images/icon_home.svg',
      url: '/',
      handler: () => {
        router.refresh();
        router.replace('/');
      },
    },
    {
      id: 2,
      name: 'Riwayat',
      icons: '/assets/images/icon_donasi.svg',
      url: '/histori',
      handler: () => {
        router.refresh();
        router.replace('/histori');
      },
    },
    {
      id: 3,
      name: 'Kalkulator',
      icons: '/assets/images/icon_calculator.svg',
      url: '/kalkulator',
      handler: () => {
        router.refresh();
        router.replace('/kalkulator');
      },
    },
    {
      id: 4,
      name: 'Literasi',
      icons: '/assets/images/icon_literasi.svg',
      url: '/literasi',
      handler: () => {
        router.refresh();
        router.replace('/literasi');
      },
    },
    {
      id: 5,
      name: 'Account',
      icons: '/assets/images/icon_profile.svg',
      url: '/account',
      handler: () => {
        router.refresh();
        router.replace('/account');
      },
    },
  ];

  return (
    <ul className='flex justify-around items-center'>
      {menus.map((menu, i) => (
        <li
          key={i}
          onClick={menu.handler}
          href={menu.url}
          className={classNames(
            'flex flex-col items-center justify-center p-1 cursor-pointer',
            path == menu.url ? 'text-baseColor-500 font-semibold' : ''
          )}
        >
          <div
            className={classNames(
              'rounded-full p-2',
              path == menu.url ? 'bg-baseColor-500' : ''
            )}
          >
            <Image
              src={menu.icons}
              alt={'Logo'}
              width={25}
              height={25}
              className={classNames(
                'w-5 h-5 aspect-square',
                path == menu.url ? 'icon_white' : ''
              )}
              priority
            />
          </div>
          <span>{menu.name}</span>
        </li>
      ))}
    </ul>
  );
};

export const NavigationComponent = () => {
  const { pages } = UseApp();

  return (
    !pages && (
      <aside className='sticky bottom-0 z-30'>
        <nav className='w-full md:max-w-md mx-auto border-t border-x shadow-lg bg-white'>
          <NavigationMenuComponent />
        </nav>
      </aside>
    )
  );
};
