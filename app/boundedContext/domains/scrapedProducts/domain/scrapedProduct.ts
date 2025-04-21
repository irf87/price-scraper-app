import {Product} from '@domains/products/domain/product';

export interface ScrapedProduct extends Product {
  productScrapedId: number;
  urlToScrape: string;
  price: number | string;
  date: string;
  urlScrapedDomainName?: string;
  enable: boolean;
}
