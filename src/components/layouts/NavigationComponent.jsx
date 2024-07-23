'use client';

import {
  ButtonComponent,
  ButtonIconComponent,
} from '@/components/partials/ButtonComponent';
import { UseApp } from '@/hooks/useApp';
import { ShareIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { AlertComponent } from '../partials/DialogComponent';

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
        router.replace('/');
        router.refresh();
      },
    },
    {
      id: 2,
      name: 'Riwayat',
      icons: '/assets/images/icon_donasi.svg',
      url: '/histori',
      handler: () => {
        router.replace('/histori');
        router.refresh();
      },
    },
    {
      id: 3,
      name: 'Kalkulator',
      icons: '/assets/images/icon_calculator.svg',
      url: '/kalkulator',
      handler: () => {
        router.replace('/kalkulator');
        router.refresh();
      },
    },
    {
      id: 4,
      name: 'Literasi',
      icons: '/assets/images/icon_literasi.svg',
      url: '/literasi',
      handler: () => {
        router.replace('/literasi');
        router.refresh();
      },
    },
    {
      id: 5,
      name: 'Account',
      icons: '/assets/images/icon_profile.svg',
      url: '/account',
      handler: () => {
        router.replace('/account');
        router.refresh();
      },
    },
  ];

  return (
    <ul className='flex justify-around items-center'>
      {menus.map((menu, i) => (
        <Link
          key={i}
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
        </Link>
      ))}
    </ul>
  );
};

export const NavigationPaymentComponent = () => {
  const [showShare, setShowShare] = useState(false);
  const pathName = usePathname();

  const handleShare = (platform) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathName}`;

    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}`;
        break;
      default:
        shareLink = `https://api.whatsapp.com/send?text=${shareUrl}`;
        break;
    }
    window.open(shareLink, '_blank');
  };

  return (
    <ul className='flex items-center space-x-3 p-4'>
      <ButtonIconComponent
        onClick={() => setShowShare(true)}
        icons={ShareIcon}
        variant='outline'
      />
      <ButtonComponent
        text='Donasi Sekarang'
        form='formDonasi'
        type='submit'
        fullWidth={true}
        pill={true}
      />

      <AlertComponent
        modalTitle={'Bagikan Ke'}
        withHeader={true}
        isOpen={showShare}
        handleOnChange={() => setShowShare(false)}
      >
        <div className='flex items-center justify-center space-x-3 h-32'>
          <ButtonIconComponent
            onClick={() => handleShare('whatsapp')}
            icons={FaWhatsapp}
            color='success'
            iconsClass='w-10 h-10'
          />
          <ButtonIconComponent
            onClick={() => handleShare('facebook')}
            icons={FaFacebook}
            color='primary'
            iconsClass='w-10 h-10'
          />
          <ButtonIconComponent
            onClick={() => handleShare('twitter')}
            icons={FaTwitter}
            color='info'
            iconsClass='w-10 h-10'
          />
        </div>
      </AlertComponent>
    </ul>
  );
};

export const NavigationComponent = () => {
  const { pages, navigation, navigationCampaign } = UseApp();

  return (
    !pages && (
      <aside className='sticky bottom-0 z-30'>
        <nav className='w-full md:max-w-md mx-auto border-t border-x shadow-lg bg-white'>
          {navigation && navigationCampaign ? (
            <NavigationPaymentComponent />
          ) : (
            <NavigationMenuComponent />
          )}
        </nav>
      </aside>
    )
  );
};
