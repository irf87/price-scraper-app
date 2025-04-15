declare module '@domains/products/presentation/ProductScrapedDetail/ProductScrapedDetail' {
  import { FC } from 'react';
  
  interface ProductScrapedDetailProps {
    productDetail: {
      urlToScrape: string;
      price: string;
      description: string;
      name: string;
      urlImg: string;
      date: string;
      urlScrapedDomainName: string;
    };
    productScrapedRecord: {
      minPrice: string;
      maxPrice: string;
      avgPrice: string;
      lastDateSync: string;
      records: any[];
    };
  }
  
  const ProductScrapedDetail: FC<ProductScrapedDetailProps>;
  export default ProductScrapedDetail;
} 