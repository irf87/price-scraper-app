import {useMemo} from 'react';
import {api} from '@infrastructure/repositories/axiosBase';
import {
  ItemType,
  ITEMS_QUERY_KEYS,
} from '@domains/items/infrastructure/config/itemsConfig';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';
import {CategoryAssignmentRepositoryImpl} from '@domains/categories/infrastructure/categoryAssignmentRepositoryImpl';
import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {ListAssignmentRepositoryImpl} from '@domains/lists/infrastructure/listAssignmentRepositoryImpl';
import {
  ItemAssignmentRepository,
  ItemRepository,
} from '@domains/items/domain/itemRepository';

const useLinkingItemFactory = (itemType: ItemType) => {
  const repositoryAssignment = useMemo<ItemAssignmentRepository>(() => {
    if (itemType === ITEMS_QUERY_KEYS.CATEGORY) {
      return new CategoryAssignmentRepositoryImpl(api);
    }
    return new ListAssignmentRepositoryImpl(api);
  }, [itemType]);

  const repositoryItem = useMemo<ItemRepository>(() => {
    if (itemType === ITEMS_QUERY_KEYS.CATEGORY) {
      return new CategoryRepositoryImpl(api);
    }
    return new ListRepositoryImpl(api);
  }, [itemType]);

  return {
    repositoryAssignment,
    repositoryItem,
  };
};

export default useLinkingItemFactory;
