import {api} from '@infrastructure/repositories/axiosBase';

import {ListRepositoryImpl} from '@domains/lists/infrastructure/listRepositoryImpl';
import {CategoryRepositoryImpl} from '@domains/categories/infrastructure/categoryRepositoryImpl';
import {ItemUseCase} from '@domains/items/application/itemUseCase';

import {ITEMS_QUERY_KEYS} from '@domains/items/infrastructure/config/itemsConfig';
const useItemUseCase = (screenType: string) => {
  switch (screenType) {
    case ITEMS_QUERY_KEYS.LIST:
      return new ItemUseCase(new ListRepositoryImpl(api));
    default:
      return new ItemUseCase(new CategoryRepositoryImpl(api));
  }
};

export default useItemUseCase;
