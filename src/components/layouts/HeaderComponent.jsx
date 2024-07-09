'use client';

import { LogoComponent } from '@/components/sections/LogoComponent';
import { UseApp } from '@/hooks/useApp';
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createElement } from 'react';

export const HeaderComponent = () => {
  const router = useRouter();
  const { headers } = UseApp();

  return (
    <header
      className={classNames(
        'w-full md:max-w-md mx-auto',
        headers?.fixed ? 'sticky top-0 z-30' : 'absolute inset-x-0 top-0 z-30'
      )}
    >
      <nav
        className={classNames(
          'px-4 py-1 shadow',
          headers?.title ? 'bg-white' : '',
          headers?.logo ? 'bg-white' : ''
        )}
      >
        <ul>
          <li className='flex space-x-2 items-center'>
            {headers?.backButton &&
              createElement(
                headers?.fixed ? ArrowLeftIcon : ArrowLeftCircleIcon,
                {
                  className: classNames(
                    headers?.fixed ? 'w-5 h-5' : 'w-7 h-7',
                    headers?.fixed ? '' : 'text-white bg-gray-400 rounded-full'
                  ),
                  onClick: () => router.back(),
                }
              )}
            {headers?.logo && <LogoComponent width={60} height={60} />}
            {headers?.title && (
              <span className='text-sm'>{headers?.title}</span>
            )}
          </li>
          {headers?.searching && <li>Searching</li>}
          {headers?.login && (
            <Link href={'/auth/login'} className='text-sm'>
              Masuk
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};
