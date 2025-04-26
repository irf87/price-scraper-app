import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

export interface ItemDetailScreenProps {
  queryFunction: QueryProductScrapedFunction;
  item: {
    id: string | number;
    imageUrl?: string;
    title: string;
    description?: string;
  };
  screenTitle: string;
}
