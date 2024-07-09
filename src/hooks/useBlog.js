'use client';

import { GetDataBlog } from '@/services/AppService';
import { createContext, useContext, useEffect, useState } from 'react';

export const BlogContext = createContext({ empty: true });

export const UseBlog = () => useContext(BlogContext);

export const BlogProvider = ({ data = [], dataTotal = 0, children }) => {
  const [result, setResult] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [totalPage, setTotalPage] = useState(dataTotal);
  const [searchValue, setSearchValue] = useState('');

  const loadMore = async () => {
    setIsLoading(true);

    const params = new URLSearchParams({});

    if (searchValue != null || searchValue != '') {
      params.append('search', searchValue);
      params.append('page', currentFilteredPage + 1);

      setCurrentPage(1);
      setCurrentFilteredPage(currentFilteredPage + 1);
    } else {
      params.append('page', currentPage);

      setCurrentPage(currentPage + 1);
      setCurrentFilteredPage(1);
    }

    const response = await GetDataBlog(params);

    setResult(result.concat(response.data));
    setTotalPage(response.total);
    setIsLoading(false);
  };

  const filterSearch = async (value) => {
    setIsLoading(true);
    setSearchValue(value);

    const params = new URLSearchParams({ page: 1 });

    if (value != null || value != '') {
      params.append('search', value);
    }

    const response = await GetDataBlog(params);

    setResult(response.data);
    setTotalPage(response.total);
    setIsLoading(false);
  };

  const contextValue = {
    result,
    totalPage,
    isLoading,
    hasMore,
    filterSearch,
    loadMore,
  };

  useEffect(() => {
    setHasMore(currentPage < totalPage ? true : false);
  }, [currentPage, totalPage]);

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
