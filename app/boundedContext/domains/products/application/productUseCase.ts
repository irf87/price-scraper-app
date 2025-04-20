import {ProductRepository} from '@domains/products/domain/productRepository';
import {
  ProductWithRequiredId,
  ProductWithOptionalId,
} from '@domains/products/domain/product';

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts() {
    return this.productRepository.getProducts();
  }

  async createProduct(product: ProductWithOptionalId) {
    return this.productRepository.create(product);
  }

  async updateProduct(product: ProductWithRequiredId) {
    return this.productRepository.update(product);
  }
}
