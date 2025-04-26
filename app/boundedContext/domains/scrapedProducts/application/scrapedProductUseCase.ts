import {ScrapedProductRepository} from '@domains/scrapedProducts/domain/scrapedProductRepository';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {ScrapedProductAdapter} from './scrapedProductAdapter';

export class ScrapedProductsUseCase {
  constructor(
    private readonly scrapedProductRepository: ScrapedProductRepository,
  ) {}

  async getAllScrapedProductsEnabled(): Promise<ScrapedProduct[]> {
    const products =
      await this.scrapedProductRepository.getAllScrapedProductsEnabled();
    return ScrapedProductAdapter.formatProducts(products);
  }

  async getScrapedProductByCategory(
    idCategory: number,
  ): Promise<ScrapedProduct[]> {
    const products =
      await this.scrapedProductRepository.getScrapedProductByCategory(
        idCategory,
      );
    return ScrapedProductAdapter.formatProducts(products);
  }

  async getScrapedProductByList(idList: number): Promise<ScrapedProduct[]> {
    const products =
      await this.scrapedProductRepository.getScrapedProductByList(idList);
    return ScrapedProductAdapter.formatProducts(products);
  }

  async getScrepedProductsByIdProduct(
    idProduct: number,
  ): Promise<ScrapedProduct[]> {
    const products =
      await this.scrapedProductRepository.getScrepedProductsByIdProduct(
        idProduct,
      );
    return ScrapedProductAdapter.formatProducts(products || []);
  }
}
