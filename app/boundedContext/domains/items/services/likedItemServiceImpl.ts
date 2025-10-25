import LikedItemService from './linkedItemService';
import {ItemAssignmentRepository} from '@domains/items/domain/itemRepository';
import {ItemRepository} from '@domains/items/domain/itemRepository';
import {Item} from '@domains/items/domain/item';

export default class LikedItemServiceImpl implements LikedItemService {
  itemId: number;

  constructor(
    private readonly repositoryAssignment: ItemAssignmentRepository,
    private readonly repositoryItem: ItemRepository,
  ) {
    this.itemId = 0;
  }

  selectItem(itemId: number) {
    this.itemId = itemId;
  }

  linkedItem(productId: number) {
    this.repositoryAssignment.assignItemToProduct(this.itemId, productId);
  }

  getItems(): Promise<Item[]> {
    return this.repositoryItem.getItems();
  }
}
