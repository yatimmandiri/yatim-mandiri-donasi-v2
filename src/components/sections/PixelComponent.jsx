'use client';

import { UseApp } from '@/hooks/useApp';
import { usePathname, useSearchParams } from 'next/navigation';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Suspense, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import useHotjar from 'react-use-hotjar';
import TiktokPixel from 'tiktok-pixel';

export const PixelComponent = () => {
  const { initHotjar } = useHotjar();

  useEffect(() => {
    TiktokPixel.init(process.env.TIKTOK_PIXEL_ID);
    TiktokPixel.pageView();

    TagManager.initialize({ gtmId: process.env.GOOGLE_TAG_MANAGER_ID });

    initHotjar(process.env.hotjar, 6);
  }, [initHotjar]);

  return (
    <Suspense fallback={null}>
      <FacebookPixel />
      <GoogleAnalytics gaMeasurementId={process.env.GOOGLE_ANALYTICS_ID} />
    </Suspense>
  );
};

export const FacebookPixel = () => {
  const pathname = usePathname();
  const useSearch = useSearchParams();
  const { pixel } = UseApp();

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(process.env.FACEBOOK_PIXEL_ID);
        ReactPixel.init(process.env.FACEBOOK_PIXEL_ID2);
        ReactPixel.pageView();
      });
  }, [pathname, useSearch]);

  return null;
};
