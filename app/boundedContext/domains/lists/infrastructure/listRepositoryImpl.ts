import {AxiosInstance} from 'axios';

import {Item, ItemWithOptionalId} from '@domains/items/domain/item';
import {ItemRepository} from '@domains/items/domain/itemRepository';

export class ListRepositoryImpl implements ItemRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getItems(): Promise<Item[]> {
    const response = await this.api.get<Item[]>('lists');
    return response.data;
  }

  async createItem(list: ItemWithOptionalId): Promise<Item> {
    const response = await this.api.post<Item>('lists', list);
    return response.data;
  }

  async updateItem(list: Item): Promise<Item> {
    const response = await this.api.put<Item>('lists', list);
    return response.data;
  }
}
