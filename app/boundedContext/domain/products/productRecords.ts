export interface ProductScrapedRecord {
  id: string;
  price: number;
  availability: number;
  stock: number;
  date: string;
}

export interface ProductScrapedRecords {
  _id: string;
  productId: number;
  productScrapedId: number;
  productName: string;
  marketplace: string;
  minPrice: number | string;
  maxPrice: number | string;
  avgPrice: number | string;
  lastDateSync: string;
  records: ProductScrapedRecord[];
}