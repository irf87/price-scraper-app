import {AxiosInstance} from 'axios';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';
import {Item} from '@domains/items/domain/item';
import {ListToItemAdapter} from '@domains/items/domain/itemAdapter';
import {ListAssignedToProduct} from '@domains/lists/domain/list';

export class ListAssignmentRepositoryImpl implements ItemAssignmentRepository {
  private readonly adapter: ListToItemAdapter;

  constructor(private readonly api: AxiosInstance) {
    this.adapter = new ListToItemAdapter();
  }

  async assignItemToProduct(itemId: number, productId: number): Promise<void> {
    await this.api.post('/product-list/assign', {productId, listId: itemId});
  }

  async getItemsAssignedToProduct(productId: number): Promise<Item[]> {
    const response = await this.api.get<ListAssignedToProduct[]>(
      `/product-list/product/${productId}`,
    );
    return response.data.map(list => this.adapter.toItem(list));
  }

  async unassignItemFromProduct(
    itemId: number,
    productId: number,
  ): Promise<void> {
    console.log('unassignItemFromProduct', productId, itemId);
    await this.api.delete(`/product-list/${productId}/${itemId}`);
  }
}
