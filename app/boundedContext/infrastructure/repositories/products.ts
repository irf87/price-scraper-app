import { api } from '@infrastructure/repositories/axiosBase';
import { Product, ProductScraped } from '@domain/products/product';
import { ProductScrapedRecords } from '@domain/products/productRecords';

export async function getProductRequest() {
  const response = await api.get<Product[]>('products');
  return response.data;
}

export async function getProductScrapedRequest() {
  const response = await api.get<ProductScraped[]>('products/scraped');
  return response.data;
}

export async function getProductScrapedRecords(productScrapedId: number) {
  const response = await api.get<ProductScrapedRecords[]>(`reports/product-scraped/?id=${productScrapedId}`);
  return response.data;
}
