export interface Product {
  id: number;
  name: string;
  description?: string;
  urlInfo?: string;
  urlImg?: string;
}

export type ProductWithRequiredId = Pick<Product, 'id'> &
  Partial<Omit<Product, 'id'>>;

export interface ProductWithOptionalId extends Omit<Product, 'id'> {
  id?: number;
}
