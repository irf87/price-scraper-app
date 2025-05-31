import {AxiosInstance} from 'axios';

import {
  ItemAssignmentRepository,
  ItemRepository,
} from '@domains/items/domain/itemRepository';
import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {ListAssignmentRepositoryImpl} from '@domains/lists/infrastructure/listAssignmentRepositoryImpl';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';
import {CategoryAssignmentRepositoryImpl} from '@domains/categories/infrastructure/categoryAssignmentRepositoryImpl';

import {ITEMS_QUERY_KEYS} from '@domains/items/infrastructure/config/itemsConfig';
/**
 * Custom hook that returns the appropriate repository implementation based on screen type
 * @param screenType The type of screen ('list' or 'category')
 * @returns A factory function that creates the appropriate repository implementation
 */
export const useItemRepository = (
  screenType: string,
): new (api: AxiosInstance) => ItemRepository => {
  switch (screenType) {
    case ITEMS_QUERY_KEYS.LIST:
      return ListRepositoryImpl;
    default:
      return CategoryRepositoryImpl;
  }
};

export const useItemAssignmentRepository = (
  screenType: string,
): new (api: AxiosInstance) => ItemAssignmentRepository => {
  switch (screenType) {
    case ITEMS_QUERY_KEYS.LIST:
      return ListAssignmentRepositoryImpl;
    default:
      return CategoryAssignmentRepositoryImpl;
  }
};
