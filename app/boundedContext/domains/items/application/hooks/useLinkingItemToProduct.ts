import {useQuery, useMutation} from 'react-query';
import {useMemo, useCallback, useRef, useState} from 'react';
import LikedItemServiceImpl from '@domains/items/services/likedItemServiceImpl';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';
import {ItemRepository} from '@domains/items/domain/itemRepository';
import {
  ITEMS_CACHE_TIME,
  ItemType,
} from '@domains/items/infrastructure/config/itemsConfig';

export function useLinkingItemToProduct(
  repositoryAssignment: ItemAssignmentRepository,
  repositoryItem: ItemRepository,
  itemType: ItemType,
) {
  const productId = useRef<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const service = useMemo(
    () => new LikedItemServiceImpl(repositoryAssignment, repositoryItem),
    [repositoryAssignment, repositoryItem],
  );

  const {
    data: items,
    isLoading,
    isFetching,
    error,
  } = useQuery([itemType, productId.current], () => service.getItems(), {
    enabled: true,
    staleTime: ITEMS_CACHE_TIME,
    cacheTime: ITEMS_CACHE_TIME,
    refetchOnWindowFocus: false,
  });

  const assignItemMutation = useMutation(
    `assignItem-${itemType}`,
    async ({targetProductId}: {targetProductId: number}) => {
      service.linkedItem(targetProductId);
      return Promise.resolve();
    },
  );

  const selectItem = useCallback(
    (itemId: number) => {
      service.selectItem(itemId);
      setSelectedItemId(itemId);
    },
    [service],
  );

  const setProductId = useCallback((newProductId: number) => {
    productId.current = newProductId;
  }, []);

  return {
    items: items || [],
    itemsState: {
      isFetching,
      isLoading,
      error,
    },
    assignItemState: {
      isLoading: assignItemMutation.isLoading,
      isError: assignItemMutation.isError,
      isSuccess: assignItemMutation.isSuccess,
    },
    assignItemMutation,
    selectItem,
    setProductId,
    selectedItemId,
  };
}
