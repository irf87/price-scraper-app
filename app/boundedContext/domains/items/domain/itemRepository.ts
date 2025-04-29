import {Item, ItemWithOptionalId} from '@domains/items/domain/item';

export interface ItemRepository {
  getItems(): Promise<Item[]>;
  createItem(item: ItemWithOptionalId): Promise<Item>;
  updateItem(item: Item): Promise<Item>;
}
