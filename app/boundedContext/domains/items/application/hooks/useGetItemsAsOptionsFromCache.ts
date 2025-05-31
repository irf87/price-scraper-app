import {useQueryClient} from 'react-query';
import {Option} from '@design-system/molecules/AddActionSectionWithChips/AddActionSectionsWithChips';
import {Item} from '@domains/items/domain/item';
import {
  ITEMS_QUERY_KEYS,
  ItemType,
} from '@domains/items/infrastructure/config/itemsConfig';

export const useGetItemsAsOptionsFromCache = () => {
  const queryClient = useQueryClient();

  const getItemsAsOptions = (type: ItemType): Option[] => {
    const items = queryClient.getQueryData<Item[]>(type);
    if (!items) {
      return [];
    }

    return items.map(item => ({
      label: item.name,
      value: item.id,
    }));
  };

  return {
    getListOptions: () => getItemsAsOptions(ITEMS_QUERY_KEYS.LIST),
    getCategoryOptions: () => getItemsAsOptions(ITEMS_QUERY_KEYS.CATEGORY),
  };
};
