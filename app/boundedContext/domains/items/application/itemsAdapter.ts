import {Item} from '@domains/items/domain/item';

export const itemsAdapter = (items: Item[]) => {
  return items.map(item => ({
    id: item.id,
    imageUrl: item.urlImgCover,
    title: item.name,
    description: item.description,
  }));
};
