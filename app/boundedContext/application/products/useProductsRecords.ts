import dayjs from 'dayjs';
import { useQuery  } from 'react-query';
import { getProductScrapedRecords } from '@repositories/products';

import { getDomain } from '@domain/products/product';
import { ProductScrapedRecords } from '@domain/products/productRecords';
import { convertToPrice } from '@domain/currencies/currency';


const QUERY = 'product-scraped-records';

export function useProductScrapedRecords (productScrapedId: number) {
  const { data, isError, isFetched, isFetching } = useQuery(`${QUERY}`, () => getProductScrapedRecords(productScrapedId), 
  { 
    select: (productScrapedRecords) => {
      const [objet] = productScrapedRecords;
      objet.minPrice = convertToPrice(objet.minPrice);
      objet.maxPrice = convertToPrice(objet.maxPrice);
      objet.avgPrice = convertToPrice(objet.avgPrice);
      return objet;
    },
  });

  return {
    productScrapedRecordsState: {
      isError,
      isFetched,
      isFetching,
    },
    productScrapedRecords: data,
  }
}