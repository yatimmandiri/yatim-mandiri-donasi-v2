'use client';

import { GetDataTestimonials } from '@/services/AppService';
import { createContext, useContext, useEffect, useState } from 'react';

export const TestimonialContext = createContext({ empty: true });

export const UseTestimonial = () => useContext(TestimonialContext);

export const TestimonialProvider = ({
  data = [],
  dataTotal = 1,
  campaigns = [],
  perPage = 10, 
  children,
}) => {
  const [result, setResult] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [totalPage, setTotalPage] = useState(dataTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const loadMore = async () => {
    const res = await GetDataTestimonials({
      campaign_id: campaigns.id,
      per_page: perPage,
      page: currentPage + 1,
    });

    setCurrentPage(currentPage + 1);
    setResult(result.concat(res.data.data));
  };

  const contextValue = {
    result,
    currentPage,
    currentFilteredPage,
    totalPage,
    isLoading,
    hasMore,
    setResult,
    setCurrentPage,
    setCurrentFilteredPage,
    setTotalPage,
    setIsLoading,
    setHasMore,
    loadMore,
  };

  useEffect(() => {
    setHasMore(currentPage < totalPage ? true : false);
  }, [currentPage, totalPage]);

  return (
    <TestimonialContext.Provider value={contextValue}>
      {children}
    </TestimonialContext.Provider>
  );
};
