import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

export const scrapedProductToItemAdapter = (
  product: ScrapedProduct,
): ItemProps => {
  return {
    id: product.id,
    imageUrl: product.urlImg,
    title: product.name,
    description: product.description,
  };
};
