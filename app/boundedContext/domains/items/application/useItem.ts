import {useState, useMemo, useEffect} from 'react';
import {AxiosInstance} from 'axios';
import {useQuery} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';

import {Item} from '@domains/items/domain/item';
import {ItemUseCase} from '@domains/items/application/itemUseCase';
import {ItemRepository} from '@domains/items/domain/itemRepository';

import {searchByNameOrDescription} from '@utils/strings/searchByNameOrDescription';

const CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day in milliseconds

export function useItemList<T extends ItemRepository>(
  RepositoryImpl: new (apiProp: AxiosInstance) => T,
  queryName?: string,
) {
  const [searchTerm, setSearchTerm] = useState('');
  const itemUseCase = new ItemUseCase(new RepositoryImpl(api));

  const {
    data: items,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery(queryName || 'items', () => itemUseCase.getItems(), {
    staleTime: CACHE_TIME,
    cacheTime: CACHE_TIME,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetching) {
      setSearchTerm('');
    }
  }, [isFetching]);

  const searchResults = useMemo(() => {
    if (items && items?.length > 0 && searchTerm) {
      return searchByNameOrDescription<Item>(items, searchTerm);
    }
    return items || [];
  }, [items, searchTerm]);

  return {
    items: searchResults,
    itemsState: {
      isFetching,
      isLoading,
      error,
    },
    refetchItems: refetch,
    setSearchTerm,
  };
}
