import {useQuery, useQueryClient} from 'react-query';
import {getProductScrapedRecords} from '@repositories/products';

import {convertToPrice} from '@domain/currencies/currency';
import {ProductScrapedRecords} from '@domain/products/productRecords';

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

export function useGetStoredProductScrapedRecords() {
  const queryClient = useQueryClient();
  const productScrapedRecord = queryClient.getQueryData<ProductScrapedRecords>([
    QUERY,
  ]);
  function getRecords() {
    if (productScrapedRecord?.records) {
      return productScrapedRecord.records.map(records => {
        return {
          id: records.id,
          date: new Date(records.date),
          price: records.price,
        };
      });
    } else {
      return [];
    }
  }
  return {
    productScrapedRecord,
    getRecords,
  };
}
