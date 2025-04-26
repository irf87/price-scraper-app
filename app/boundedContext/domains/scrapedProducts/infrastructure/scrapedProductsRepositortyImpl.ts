import {AxiosInstance} from 'axios';
import {ScrapedProductRepository} from '@domains/scrapedProducts/domain/scrapedProductRepository';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

export class ScrapedProductRepositoryImpl implements ScrapedProductRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getAllScrapedProductsEnabled(): Promise<ScrapedProduct[]> {
    const response = await this.api.get('products/scraped');
    return response.data;
  }

  async getScrapedProductByCategory(
    idCategory: number,
  ): Promise<ScrapedProduct[]> {
    const response = await this.api.get(
      `product-category/scraped-product/${idCategory}`,
    );
    return response.data;
  }

  async getScrapedProductByList(idList: number): Promise<ScrapedProduct[]> {
    const response = await this.api.get(
      `product-list/scraped-product${idList}`,
    );
    return response.data;
  }

  async getScrepedProductsByIdProduct(
    idProduct: number,
  ): Promise<ScrapedProduct[]> {
    const response = await this.api.get(
      `products/scraped-product/${idProduct}`,
    );
    return response.data;
  }
}
