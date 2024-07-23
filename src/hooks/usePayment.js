'use client';

import moment from 'moment-timezone';
import { createContext, useContext } from 'react';

export const PaymentContext = createContext({ empty: true });

export const UsePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ donations = [], children }) => {
  const contextValue = {
    donations,
    rekenings: donations?.relationship.rekenings,
    tanggalexpired: donations?.expired
      ? donations.expired
      : moment().format('YYYY-MM-DD hh:mm:ss'),
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};
