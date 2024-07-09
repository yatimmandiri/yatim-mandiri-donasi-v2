'use client';

import { laravel } from '@/libs/axios';
import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';

export const CampaignContext = createContext({ empty: true });

export const UseCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [resultRelated, setResultRelated] = useState([]);

  const { data: related, mutate: mutateRelated } = useSWR(
    '/api/v1/campaigns/related',
    () =>
      laravel
        .get('/api/backend/v1/campaigns', {
          params: { status: 'Y', per_page: 3 },
        })
        .then((res) => setResultRelated(res.data.data.data))
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        })
  );

  const contextValue = {
    resultRelated,
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};
