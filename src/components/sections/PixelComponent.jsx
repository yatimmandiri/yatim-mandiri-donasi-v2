'use client';

import { UseApp } from '@/hooks/useApp';
import { usePathname, useSearchParams } from 'next/navigation';
import { event, GoogleAnalytics } from 'nextjs-google-analytics';
import { Suspense, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import useHotjar from 'react-use-hotjar';
import TiktokPixel from 'tiktok-pixel';

export const PixelComponent = () => {
  const { initHotjar } = useHotjar();
  const { gtm } = UseApp();

  useEffect(() => {
    TiktokPixel.init(process.env.TIKTOK_PIXEL_ID);
    TiktokPixel.pageView();

    TagManager.initialize({ gtmId: process.env.GOOGLE_TAG_MANAGER_ID });

    initHotjar(process.env.hotjar, 6);

    gtm?.selectItem && event('view_item', gtm?.selectItem);
    gtm?.selectItems && event('view_items', gtm?.selectItems);
    gtm?.viewItemList && event('view_items_list', gtm?.viewItemList);
    gtm?.purchase && event('purchase', gtm?.purchase);
    gtm?.addPaymentInfo && event('add_payment_info', gtm?.addPaymentInfo);
  }, [
    initHotjar,
    gtm?.addPaymentInfo,
    gtm?.purchase,
    gtm?.selectItem,
    gtm?.selectItems,
    gtm?.viewItemList,
  ]);

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
