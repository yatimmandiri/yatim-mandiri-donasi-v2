'use client';

import { createContext, useContext } from 'react';

export const AppContext = createContext({ empty: true });

export const UseApp = () => useContext(AppContext);

export const AppProvider = ({ context = {}, children }) => {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
