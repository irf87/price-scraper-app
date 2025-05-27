import {useQueryClient} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';
import {ItemUseCase} from '@domains/items/application/itemUseCase';
import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';
import {
  ITEMS_QUERY_KEYS,
  ITEMS_CACHE_TIME,
} from '@domains/items/infrastructure/config/itemsConfig';

export const useItemPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchItems = async () => {
    // Prefetch lists
    const listUseCase = new ItemUseCase(new ListRepositoryImpl(api));
    await queryClient.prefetchQuery(
      ITEMS_QUERY_KEYS.LIST,
      () => listUseCase.getItems(),
      {
        staleTime: ITEMS_CACHE_TIME,
        cacheTime: ITEMS_CACHE_TIME,
      },
    );

    // Prefetch categories
    const categoryUseCase = new ItemUseCase(new CategoryRepositoryImpl(api));
    await queryClient.prefetchQuery(
      ITEMS_QUERY_KEYS.CATEGORY,
      () => categoryUseCase.getItems(),
      {
        staleTime: ITEMS_CACHE_TIME,
        cacheTime: ITEMS_CACHE_TIME,
      },
    );
  };

  return {
    prefetchItems,
  };
};
