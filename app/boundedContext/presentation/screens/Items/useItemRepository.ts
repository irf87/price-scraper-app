import {AxiosInstance} from 'axios';
import {ItemRepository} from '@domains/items/domain/itemRepository';
import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';

/**
 * Custom hook that returns the appropriate repository implementation based on screen type
 * @param screenType The type of screen ('list' or 'category')
 * @returns A factory function that creates the appropriate repository implementation
 */
export const useItemRepository = (
  screenType: string,
): new (api: AxiosInstance) => ItemRepository => {
  switch (screenType) {
    case 'list':
      return ListRepositoryImpl;
    default:
      return CategoryRepositoryImpl;
  }
};
