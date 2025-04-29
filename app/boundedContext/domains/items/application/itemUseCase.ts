import {ItemRepository} from '@domains/items/domain/itemRepository';
import {Item, ItemWithOptionalId} from '@domains/items/domain/item';

export class ItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getItems() {
    return await this.itemRepository.getItems();
  }

  async createItem(item: ItemWithOptionalId) {
    return await this.itemRepository.createItem(item);
  }

  async updateItem(item: Item) {
    return await this.itemRepository.updateItem(item);
  }
}
