import {AxiosInstance} from 'axios';
import {useQuery} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';

import {ItemUseCase} from '@domains/items/application/itemUseCase';
import {ItemRepository} from '@domains/items/domain/itemRepository';

export function useItemList<T extends ItemRepository>(
  RepositoryImpl: new (apiProp: AxiosInstance) => T,
  queryName?: string,
) {
  const itemUseCase = new ItemUseCase(new RepositoryImpl(api));

  const {
    data: items,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery(queryName || 'items', () => itemUseCase.getItems());

  return {
    items,
    itemsState: {
      isFetching,
      isLoading,
      error,
    },
    refetchItems: refetch,
  };
}
