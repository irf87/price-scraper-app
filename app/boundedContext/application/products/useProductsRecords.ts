import {useQuery} from 'react-query';
import {getProductScrapedRecords} from '@repositories/products';

import {convertToPrice} from '@domain/currencies/currency';

const QUERY = 'product-scraped-records';

export function useProductScrapedRecords(productScrapedId: number) {
  const {data, isError, isFetched, isFetching} = useQuery(
    `${QUERY}`,
    () => getProductScrapedRecords(productScrapedId),
    {
      select: productScrapedRecords => {
        const object = productScrapedRecords;
        object.minPrice = convertToPrice(object.minPrice);
        object.maxPrice = convertToPrice(object.maxPrice);
        object.avgPrice = convertToPrice(object.avgPrice);
        return object;
      },
    },
  );

  return {
    productScrapedRecordsState: {
      isError,
      isFetched,
      isFetching,
    },
    productScrapedRecords: data,
  };
}
