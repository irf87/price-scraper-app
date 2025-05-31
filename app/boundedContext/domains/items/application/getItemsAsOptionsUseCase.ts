import {ItemUseCase} from './itemUseCase';
import {ItemRepository} from '@domains/items/domain/itemRepository';
import {Option} from '@design-system/molecules/AddActionSectionWithChips/AddActionSectionsWithChips';

export class GetItemsAsOptionsUseCase extends ItemUseCase {
  constructor(itemRepository: ItemRepository) {
    super(itemRepository);
  }

  async getItemsAsOptions(): Promise<Option[]> {
    const items = await super.getItems();
    return items.map(item => ({
      label: item.name,
      value: item.id,
    }));
  }
}
