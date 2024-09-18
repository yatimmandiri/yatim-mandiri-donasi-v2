'use client';

import { UseApp } from '@/hooks/useApp';
import { usePathname, useSearchParams } from 'next/navigation';
// import { event, GoogleAnalytics } from 'nextjs-google-analytics';
import { GoogleAnalytics, sendGTMEvent } from '@next/third-parties/google';
import { Suspense, useEffect } from 'react';
import useHotjar from 'react-use-hotjar';
import TiktokPixel from 'tiktok-pixel';

export const PixelComponent = () => {
  const { initHotjar } = useHotjar();
  const { gtm } = UseApp();

  useEffect(() => {
    TiktokPixel.init(process.env.TIKTOK_PIXEL_ID);
    TiktokPixel.pageView();

    // TagManager.initialize({ gtmId: process.env.GOOGLE_TAG_MANAGER_ID });

    initHotjar(process.env.hotjar, 6);

    gtm?.selectItem && sendGTMEvent('view_item', gtm?.selectItem);
    gtm?.selectItems && sendGTMEvent('view_items', gtm?.selectItems);
    gtm?.viewItemList && sendGTMEvent('view_items_list', gtm?.viewItemList);
    gtm?.purchase && sendGTMEvent('purchase', gtm?.purchase);
    gtm?.addPaymentInfo &&
      sendGTMEvent('add_payment_info', gtm?.addPaymentInfo);
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
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
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
        ReactPixel.pageView();

        pixel?.viewContent &&
          ReactPixel.track('ViewContent', pixel?.viewContent);
        pixel?.summary &&
          ReactPixel.trackCustom('Summary', 'Summary', pixel?.summary);
        pixel?.purchase && ReactPixel.track('Purchase', pixel?.purchase);
        pixel?.donate && ReactPixel.track('Donate', pixel?.donate);
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
