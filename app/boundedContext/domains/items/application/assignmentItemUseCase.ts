import {Item} from '@domains/items/domain/item';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';

export class AssignmentItemUseCase {
  constructor(private readonly itemRepository: ItemAssignmentRepository) {}

  async getItemsAssignedToProduct(productId: number): Promise<Item[]> {
    return await this.itemRepository.getItemsAssignedToProduct(productId);
  }

  async assignItemToProduct(itemId: number, productId: number) {
    return await this.itemRepository.assignItemToProduct(itemId, productId);
  }
}
