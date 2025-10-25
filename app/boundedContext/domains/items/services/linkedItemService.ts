import {Item} from '@domains/items/domain/item';
interface LinkedItemService {
  itemId: number;
  getItems: () => Promise<Item[]>;
  selectItem: (itemId: number) => void;
  linkedItem: (productId: number) => void;
}

export default LinkedItemService;
