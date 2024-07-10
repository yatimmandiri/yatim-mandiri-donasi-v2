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
  // page = 1,
  infinite = false,
  searching = false,
  filtering = false,
  empty = true,
  initialSearch = false,
  loadingbottom = false,
  children,
}) => {
  const [titleSection, setTitleSection] = useState(title);
  const [result, setResult] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [totalPage, setTotalPage] = useState(dataTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  // const [resultRelated, setResultRelated] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [pencarian, setPencarian] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

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

  const filterSearch = async (value) => {
    setIsLoading(true);
    setPencarian(true);
    setSearchValue(value);

    const params = new URLSearchParams({
      status: 'Y',
      per_page: perPage,
    });

    if (value != null || value != '') {
      params.append('search', value);
      params.append('page', currentFilteredPage);

      setCurrentPage(1);
      setCurrentFilteredPage(1);
    }

    const response = await GetDataCampaign(params);

    if (initialSearch && (value == '' || value == null)) {
      setResult([]);
      setTotalPage(1);
    } else {
      setResult(response.data.data);
      setTotalPage(response.data.pagination.last_page);
    }

    setPencarian(false);
    setIsLoading(false);
  };

  const selectCategories = (value) => {
    if (!categoriesSelected.some((item) => item.name == value.name)) {
      setCategoriesSelected([
        ...categoriesSelected,
        { id: value.id, name: value.name },
      ]);
    } else {
      const result = categoriesSelected.filter((item) => {
        return value != item.name;
      });
      setCategoriesSelected(result);
    }
  };

  const resetAll = () => {
    setCategoriesSelected([]);
    searchByCategories([]);
  };

  const filter = () => {
    setSearchValue('');
    setShowFilter(false);
    searchByCategories(categoriesSelected);
  };

  const searchByCategories = async (value) => {
    setIsLoading(true);

    const params = new URLSearchParams({ status: 'Y', per_page: perPage });

    const filter = value.map((item) => {
      return item.id;
    });

    if (value.length > 0) {
      params.append('filterByCategoriesId', filter.toString());
    }

    const response = await GetDataCampaign(params);

    setResult(response.data.data);
    setTotalPage(response.data.pagination.last_page);
    setIsLoading(false);
  };

  const resetSelected = () => {
    setCategoriesSelected([]);
  };

  const removeSelected = (value) => {
    const result = categoriesSelected.filter((item) => {
      return value != item.name;
    });

    setCategoriesSelected(result);
    searchByCategories(result);
  };

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

  useEffect(() => {
    setHasMore(currentPage < totalPage ? true : false);
  }, [currentPage, totalPage]);

  const contextValue = {
    result,
    totalPage,
    isLoading,
    hasMore,
    infinite,
    searching,
    filtering,
    empty,
    initialSearch,
    loadingbottom,
    pencarian,
    showFilter,
    setShowFilter,
    searchValue,
    setSearchValue,
    categoriesSelected,
    setCategoriesSelected,
    titleSection,
    setTitleSection,
    selectCategories,
    filterSearch,
    filter,
    loadMore,
    selectCategories,
    resetSelected,
    removeSelected,
    resetAll,
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};
