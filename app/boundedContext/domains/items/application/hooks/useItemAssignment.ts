import {AxiosInstance} from 'axios';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useMemo, useCallback} from 'react';
import {api} from '@infrastructure/repositories/axiosBase';

import {AssignmentItemUseCase} from '@domains/items/application/assignmentItemUseCase';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';
import {
  ITEMS_CACHE_TIME,
  ItemType,
} from '@domains/items/infrastructure/config/itemsConfig';
import {Option} from '@design-system/molecules/addActionSectionWithChips/AddActionSectionsWithChips';

export function useItemAssignment<T extends ItemAssignmentRepository>(
  RepositoryImpl: new (apiProp: AxiosInstance) => T,
  itemType: ItemType,
  productId: number,
) {
  const queryClient = useQueryClient();
  const itemAssignmentUseCase = new AssignmentItemUseCase(
    new RepositoryImpl(api),
  );

  const {data, isLoading, isFetching, error, refetch} = useQuery(
    [itemType, 'assigned', productId],
    () => itemAssignmentUseCase.getItemsAssignedToProduct(productId),
    {
      staleTime: ITEMS_CACHE_TIME,
      cacheTime: ITEMS_CACHE_TIME,
      refetchOnWindowFocus: false,
    },
  );

  const assignItemMutation = useMutation(
    ({itemId, targetProductId}: {itemId: number; targetProductId: number}) =>
      itemAssignmentUseCase.assignItemToProduct(itemId, targetProductId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([itemType, 'assigned', productId]);
      },
    },
  );

  const assignItem = useCallback(
    (itemId: number) => {
      assignItemMutation.mutate({itemId, targetProductId: productId});
    },
    [assignItemMutation, productId],
  );

  const options: Option[] = useMemo(
    () =>
      data?.map(item => ({
        label: item.name,
        value: item.id,
      })) || [],
    [data],
  );

  return {
    items: data || [],
    itemsState: {
      isFetching,
      isLoading,
      error,
    },
    refetchItems: refetch,
    assignItem,
    isAssigning: assignItemMutation.isLoading,
    options,
  };
}
