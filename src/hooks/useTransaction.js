'use client';

import { laravel } from '@/libs/axios';
import { formatRupiah } from '@/utils/formatNumber';
import { notification } from '@/utils/toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export const TransactionContext = createContext({ empty: true });

export const UseTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({
  rekeningPopuler = [],
  campaigns = [],
  rekenings = [],
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formDonasi = searchParams.get('formDonasi');
  const nominal = searchParams.get('nominal');
  const quantity = searchParams.get('quantity');
  const referal = searchParams.get('referal');

  const [currentNominal, setCurrentNominal] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [currentRekening, setCurrentRekening] = useState([]);
  const [shohibul, setShohibul] = useState([]);
  const [hambaAllah, setHambaAllah] = useState(false);
  const [referals, setReferals] = useState('');
  const [showFormDonasi, setShowFormDonasi] = useState(false);
  const [showFormRekening, setShowFormRekening] = useState(false);
  const [totalNominal, setTotalNominal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shohibulName, setShohibulName] = useState('');

  const nominalButtonSelected = (value) => {
    setCurrentNominal(formatRupiah(value));
  };

  const changeMetode = (event) => {
    setCurrentRekening(event);
    localStorage.setItem('currentRekening', JSON.stringify(event));
    setShowFormRekening(false);
  };

  const removeShohibul = (params) => {
    const result = shohibul.filter((items) => {
      return params != items;
    });

    setShohibul(result);
  };

  const addShohibul = () => {
    if (shohibulName != '') {
      setShohibul(shohibul.concat(shohibulName));
      setShohibulName('');
    }
  };

  const postDonation = async (data) => {
    setIsLoading(true);

    await laravel
      .post('/api/backend/v1/donations', data)
      .then((response) => {
        notification({ message: response.data.message, type: 'success' });
        router.push(`/payments/${response.data.data.no_transaksi}`);
      })
      .catch((err) => {
        console.log(err);
        notification({ message: err.response.data.message, type: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const rekeningStore = localStorage.getItem('currentRekening');

    if (!rekeningStore) {
      localStorage.setItem('currentRekening', JSON.stringify(rekeningPopuler));
      setCurrentRekening(rekeningPopuler);
    } else {
      setCurrentRekening(JSON.parse(rekeningStore));
    }

    if (campaigns) {
      setCurrentNominal(
        campaigns.template == 'T2'
          ? formatRupiah(campaigns.nominal.toString())
          : nominal
          ? formatRupiah(nominal)
          : ''
      );
    }

    if (nominal) {
      setCurrentNominal(formatRupiah(nominal));
    }

    if (quantity) {
      setCurrentQuantity(quantity);
    }

    setShowFormDonasi(formDonasi && formDonasi);
    setReferals(referal ? referal : '');
  }, [
    campaigns,
    nominal,
    currentQuantity,
    formDonasi,
    referal,
    quantity,
    rekeningPopuler,
  ]);

  const contextValue = {
    campaigns,
    rekenings,
    changeMetode,
    removeShohibul,
    addShohibul,
    shohibulName,
    setShohibulName,
    currentNominal,
    setCurrentNominal,
    currentQuantity,
    setCurrentQuantity,
    currentRekening,
    setCurrentRekening,
    totalNominal,
    setTotalNominal,
    shohibul,
    setShohibul,
    hambaAllah,
    setHambaAllah,
    referals,
    setReferals,
    showFormDonasi,
    setShowFormDonasi,
    showFormRekening,
    setShowFormRekening,
    nominalButtonSelected,
    isLoading,
    setIsLoading,
    postDonation,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};
