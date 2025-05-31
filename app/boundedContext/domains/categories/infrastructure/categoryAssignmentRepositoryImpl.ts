import {AxiosInstance} from 'axios';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';
import {Item} from '@domains/items/domain/item';
import {CategoryToItemAdapter} from '@domains/items/domain/itemAdapter';
import {CategoryAssignedToProduct} from '@domains/categories/domain/category';

export class CategoryAssignmentRepositoryImpl
  implements ItemAssignmentRepository
{
  private readonly adapter: CategoryToItemAdapter;

  constructor(private readonly api: AxiosInstance) {
    this.adapter = new CategoryToItemAdapter();
  }

  async assignItemToProduct(itemId: number, productId: number): Promise<void> {
    await this.api.post('/product-category/assign', {
      productId,
      categoryId: itemId,
    });
  }

  async getItemsAssignedToProduct(productId: number): Promise<Item[]> {
    const response = await this.api.get<CategoryAssignedToProduct[]>(
      `/product-category/product/${productId}`,
    );
    return response.data.map(category => this.adapter.toItem(category));
  }
}
