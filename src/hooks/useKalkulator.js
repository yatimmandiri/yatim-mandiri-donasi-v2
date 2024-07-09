'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

export const KalkulatorContext = createContext({ empty: true });

export const UseKalkulator = () => useContext(KalkulatorContext);

export const KalkulatorProvider = ({ data = [], children }) => {
  const router = useRouter();

  const [currentHargaEmas, setCurrentHargaEmas] = useState(data);

  const [wajibZakat, setWajibZakat] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [calculateResult, setCalculateResult] = useState(0);
  const [modalTitle, setModalTitle] = useState('');
  // const [periodeZakat, setPeriodeZakat] = useState('Bulan');
  const [nishabPertahun, setNishabPertahun] = useState(0);
  const [nishabPerbulan, setNishabPerbulan] = useState(0);
  const [emasPerGram, setEmasPerGram] = useState(0);

  const bayarZakat = () => {
    setShowResult(!showResult);

    const params = new URLSearchParams({
      nominal: calculateResult,
      formDonasi: true,
    });

    if (wajibZakat) {
      if (modalTitle == 'Zakat Profesi') {
        router.push(`/zakat/zakat-profesi?${params}`);
      } else if (modalTitle == 'Zakat Emas') {
        router.push(`/zakat/zakat-emas?${params}`);
      } else if (modalTitle == 'Zakat Perdagangan') {
        router.push(`/zakat/zakat-perdagangan?${params}`);
      } else {
        router.push(`/zakat/zakat-maal?${params}`);
      }
    } else {
      router.push(`/infak/infak-umum?${params}`);
    }
  };

  useEffect(() => {
    setEmasPerGram(parseInt(currentHargaEmas?.current_price_gold));
    setNishabPertahun(parseInt(currentHargaEmas?.current_price_gold * 85));
    setNishabPerbulan(
      parseInt((currentHargaEmas?.current_price_gold * 85) / 12)
    );
  }, [setEmasPerGram, setNishabPertahun, setNishabPerbulan, currentHargaEmas]);

  const contextValue = {
    currentHargaEmas,
    emasPerGram,
    nishabPerbulan,
    nishabPertahun,
    showResult,
    setShowResult,
    wajibZakat,
    setWajibZakat,
    calculateResult,
    setCalculateResult,
    modalTitle,
    setModalTitle,
    bayarZakat,
    // periodeZakat,
    // setPeriodeZakat,
  };

  return (
    <KalkulatorContext.Provider value={contextValue}>
      {children}
    </KalkulatorContext.Provider>
  );
};
