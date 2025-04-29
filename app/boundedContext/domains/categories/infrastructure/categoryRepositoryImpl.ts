import {AxiosInstance} from 'axios';

import {Item, ItemWithOptionalId} from '@domains/items/domain/item';
import {ItemRepository} from '@domains/items/domain/itemRepository';

export class CategoryRepositoryImpl implements ItemRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getItems(): Promise<Item[]> {
    const response = await this.api.get<Item[]>('categories');
    return response.data;
  }

  async createItem(category: ItemWithOptionalId): Promise<Item> {
    const response = await this.api.post<Item>('categories', category);
    return response.data;
  }

  async updateItem(category: Item): Promise<Item> {
    const response = await this.api.put<Item>('categories', category);
    return response.data;
  }
}
