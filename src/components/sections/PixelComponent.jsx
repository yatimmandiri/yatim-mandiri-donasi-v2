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
        const pixel1 = ReactPixel.init(process.env.FACEBOOK_PIXEL_ID);
        const pixel2 = ReactPixel.init(process.env.FACEBOOK_PIXEL_ID2);
        pixel1.pageView();
        pixel2.pageView();

        pixel?.viewContent && pixel1.track('ViewContent', pixel?.viewContent);
        pixel?.summary &&
          pixel1.trackCustom('Summary', 'Summary', pixel?.summary);
        pixel?.purchase && pixel1.track('Purchase', pixel?.purchase);
        pixel?.donate && pixel1.track('Donate', pixel?.donate);

        pixel?.viewContent && pixel2.track('ViewContent', pixel?.viewContent);
        pixel?.summary &&
          pixel2.trackCustom('Summary', 'Summary', pixel?.summary);
        pixel?.purchase && pixel2.track('Purchase', pixel?.purchase);
        pixel?.donate && pixel2.track('Donate', pixel?.donate);
      });
  }, [
    pathname,
    useSearch,
    pixel?.viewContent,
    pixel?.summary,
    pixel?.purchase,
    pixel?.donate,
  ]);

  return null;
};
