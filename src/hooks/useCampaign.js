'use client';

import { laravel } from '@/libs/axios';
import { GetDataCampaign } from '@/services/AppService';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

export const CampaignContext = createContext({ empty: true });

export const UseCampaign = () => useContext(CampaignContext);

export const CampaignProvider = ({
  title = '',
  data = [],
  dataTotal = 0,
  recomendation = false,
  perPage = 3,
  children,
}) => {
  const [resultRelated, setResultRelated] = useState([]);
  const [result, setResult] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(dataTotal);
  const [searchValue, setSearchValue] = useState('');
  const [titleSection, setTitleSection] = useState(title);
  const [showFilter, setShowFilter] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

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

  const loadMore = async () => {
    setIsLoading(true);

    const params = new URLSearchParams({
      status: 'Y',
      per_page: perPage,
    });

    if (recomendation) {
      params.append('recomendation', 'Y');
    }

    if (categoriesSelected.length > 0) {
      const filter = categoriesSelected.map((item) => {
        return item.id;
      });

      params.append('filterByCategoriesId', filter.toString());
    }

    if (searchValue != '' || searchValue != '') {
      params.append('search', searchValue);
      params.append('page', currentFilteredPage + 1);

      setCurrentPage(1);
      setCurrentFilteredPage(currentFilteredPage + 1);
    } else {
      params.append('page', currentPage + 1);

      setCurrentPage(currentPage + 1);
      setCurrentFilteredPage(1);
    }

    const response = await GetDataCampaign(params);

    setResult(result.concat(response.data.data));
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    setHasMore(currentPage < totalPage ? true : false);
  }, [currentPage, totalPage]);

  const contextValue = {
    resultRelated,
    result,
    totalPage,
    isLoading,
    hasMore,
    loadMore,
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};
