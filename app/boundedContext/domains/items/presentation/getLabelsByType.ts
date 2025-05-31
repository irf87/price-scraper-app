import {
  ItemType,
  ITEMS_QUERY_KEYS,
} from '@domains/items/infrastructure/config/itemsConfig';

export const getTitleByType = (type: ItemType, isCreation: boolean) => {
  switch (type) {
    case ITEMS_QUERY_KEYS.LIST:
      if (isCreation) {
        return 'lists.form.create';
      }
      return 'lists.form.update';
    case ITEMS_QUERY_KEYS.CATEGORY:
      if (isCreation) {
        return 'categories.form.create';
      }
      return 'categories.form.update';
  }
};

export const getTranslatePreFix = (type: ItemType) => {
  switch (type) {
    case ITEMS_QUERY_KEYS.LIST:
      return 'lists';
    case ITEMS_QUERY_KEYS.CATEGORY:
      return 'categories';
  }
};
