import {
  Product,
  ProductWithRequiredId,
  ProductWithOptionalId,
} from '@domains/products/domain/product';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  create(product: ProductWithOptionalId): Promise<Product>;
  update(product: ProductWithRequiredId): Promise<Product>;
}
