import {Product} from '@domains/products/domain/product';

export const productsItemAdapter = (products: Product[]) => {
  return products.map(product => ({
    id: product.id,
    imageUrl: product.urlImg,
    title: product.name,
    description: product.description,
  }));
};
