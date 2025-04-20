export interface ScrapedProductRecord {
  id: string;
  price: number;
  availability: number;
  stock: number;
  date: Date;
}

export interface ScrapedProductRecords {
  _id: string;
  productId: number;
  productScrapedId: number;
  productName: string;
  marketplace: string;
  minPrice: number | string;
  maxPrice: number | string;
  avgPrice: number | string;
  lastDateSync: Date;
  records: ScrapedProductRecord[];
}
