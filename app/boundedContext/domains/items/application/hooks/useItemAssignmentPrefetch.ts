import {useQueryClient} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';
import {AssignmentItemUseCase} from '@domains/items/application/assignmentItemUseCase';
import {ListAssignmentRepositoryImpl} from '@domains/lists/infrastructure/listAssignmentRepositoryImpl';
import {CategoryAssignmentRepositoryImpl} from '@domains/categories/infrastructure/categoryAssignmentRepositoryImpl';
import {
  ITEMS_QUERY_KEYS,
  ITEMS_CACHE_TIME,
} from '@domains/items/infrastructure/config/itemsConfig';

export const useItemAssignmentPrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchAssignedItems = async (productId: number) => {
    // Prefetch assigned lists
    const listAssignmentUseCase = new AssignmentItemUseCase(
      new ListAssignmentRepositoryImpl(api),
    );
    await queryClient.prefetchQuery(
      [ITEMS_QUERY_KEYS.LIST, 'assigned', productId],
      () => listAssignmentUseCase.getItemsAssignedToProduct(productId),
      {
        staleTime: ITEMS_CACHE_TIME,
        cacheTime: ITEMS_CACHE_TIME,
      },
    );

    // Prefetch assigned categories
    const categoryAssignmentUseCase = new AssignmentItemUseCase(
      new CategoryAssignmentRepositoryImpl(api),
    );
    await queryClient.prefetchQuery(
      [ITEMS_QUERY_KEYS.CATEGORY, 'assigned', productId],
      () => categoryAssignmentUseCase.getItemsAssignedToProduct(productId),
      {
        staleTime: ITEMS_CACHE_TIME,
        cacheTime: ITEMS_CACHE_TIME,
      },
    );
  };

  return {
    prefetchAssignedItems,
  };
};
