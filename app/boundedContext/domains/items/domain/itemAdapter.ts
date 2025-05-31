import {Item} from './item';
import {CategoryAssignedToProduct} from '@domains/categories/domain/category';
import {ListAssignedToProduct} from '@domains/lists/domain/list';

export interface ItemAdapter<T> {
  toItem(source: T): Item;
}

export class CategoryToItemAdapter
  implements ItemAdapter<CategoryAssignedToProduct>
{
  toItem(category: CategoryAssignedToProduct): Item {
    return {
      id: category.categoryId,
      name: category.categoryName,
      description: category.categoryDescription,
    };
  }
}

export class ListToItemAdapter implements ItemAdapter<ListAssignedToProduct> {
  toItem(list: ListAssignedToProduct): Item {
    return {
      id: list.listId,
      name: list.listName,
    };
  }
}
