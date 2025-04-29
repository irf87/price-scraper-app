import {AxiosInstance} from 'axios';
import {
  Product,
  ProductWithOptionalId,
  ProductWithRequiredId,
} from '@domains/products/domain/product';
import {ProductRepository} from '@domains/products/domain/productRepository';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getProducts(): Promise<Product[]> {
    const response = await this.api.get<Product[]>('products');
    return response.data;
  }

  async create(product: ProductWithOptionalId): Promise<Product> {
    const response = await this.api.post<Product>('products', product);
    return response.data;
  }

  async update(product: ProductWithRequiredId): Promise<Product> {
    const response = await this.api.put<Product>(
      `products/${product.id}`,
      product,
    );
    return response.data;
  }
}
