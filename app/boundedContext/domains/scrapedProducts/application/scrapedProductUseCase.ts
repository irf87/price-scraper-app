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

  async getScrapedProductById(idProduct: number): Promise<ScrapedProduct> {
    const product = await this.scrapedProductRepository.getScrapedProductById(
      idProduct,
    );
    return ScrapedProductAdapter.formatProduct(product);
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
}
