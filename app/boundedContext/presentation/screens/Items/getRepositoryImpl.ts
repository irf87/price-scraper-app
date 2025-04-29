import {AxiosInstance} from 'axios';
import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';
import {ItemRepository} from '@domains/items/domain/itemRepository';

export const getRepositoryImp = (
  itemType: string,
): new (api: AxiosInstance) => ItemRepository => {
  switch (itemType) {
    case 'list':
      return ListRepositoryImpl;
    default:
      return CategoryRepositoryImpl;
  }
};
