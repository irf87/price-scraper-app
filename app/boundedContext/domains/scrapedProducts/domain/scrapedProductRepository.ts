import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

export interface ScrapedProductRepository {
  getAllScrapedProductsEnabled(): Promise<ScrapedProduct[]>;
  getScrapedProductById(idProduct: number): Promise<ScrapedProduct>;
  getScrapedProductByCategory(idCategory: number): Promise<ScrapedProduct[]>;
  getScrapedProductByList(idList: number): Promise<ScrapedProduct[]>;
}

export type QueryProductScrapedFunction =
  | 'getAllScrapedProductsEnabled'
  | 'getScrapedProductById'
  | 'getScrapedProductByCategory'
  | 'getScrapedProductByList';
