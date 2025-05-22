import {api} from '@infrastructure/repositories/axiosBase';
import {ProductRepositoryImpl} from '@domains/products/infrastructure/productRepositoryImpl';
import {ProductUseCase} from '@domains/products/application/productUseCase';

let instance: ProductUseCase | null = null;

export const getProductUseCase = () => {
  if (!instance) {
    instance = new ProductUseCase(new ProductRepositoryImpl(api));
  }
  return instance;
};
