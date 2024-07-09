'use client';

import { laravel } from '@/libs/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const DonationContext = createContext();

export const UseDonation = () => useContext(DonationContext);

export const DonationProvider = ({ children }) => {
  const status = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Success' },
    { id: 3, name: 'Expired' },
  ];
  const [statusSelected, setStatusSelected] = useState('All');
  const [donationSelected, setDonationSelected] = useState(null);
  const [showDonation, setShowDonation] = useState(false);

  const [result, setResult] = useState([]);
  const [waitingList, setWaitingList] = useState([]);

  const { data: dataPending } = useSWR('/api/v1/histori/pending', () =>
    laravel
      .get('/api/backend/v1/histori', {
        params: { status: 'Pending' },
      })
      .then((res) => setWaitingList(res.data.data))
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  const { data: histori, mutate: mutateHistori } = useSWR(
    '/api/v1/histori',
    () =>
      laravel
        .get('/api/backend/v1/histori', {
          params: { status: statusSelected == 'All' ? null : statusSelected },
        })
        .then((res) =>
          setResult(res.data.data.filter((item) => item.status != 'Pending'))
        )
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        })
  );

  useEffect(() => {}, [statusSelected]);

  const selectDonation = (donation) => {
    setDonationSelected(donation);
    setShowDonation(true);
  };

  const contextValue = {
    result,
    waitingList,
    status,
    statusSelected,
    setStatusSelected,
    donationSelected,
    selectDonation,
    showDonation,
    setShowDonation,
  };

  return (
    <DonationContext.Provider value={contextValue}>
      {children}
    </DonationContext.Provider>
  );
};
