import {useQuery} from 'react-query';
import {
  getProductRequest,
  getProductScrapedRequest,
} from '@domains/products/infrastructure/products';

import {ProductScraped, getDomain} from '@domains/products/domain/product';
import {convertToPrice} from '@utils/currency';

import {stringDateFormatted} from '@utils/date';

export interface ProductScrapedFormatted extends ProductScraped {
  urlScrapedDomainName?: string;
}

const QUERY = 'products';

export function useProducts() {
  const {data, isError, isFetched, isFetching} = useQuery(QUERY, () =>
    getProductRequest(),
  );
  return {
    productState: {
      isError,
      isFetched,
      isFetching,
    },
    products: data || [],
  };
}

export function useProductsScraped() {
  const {data, isError, isFetched, isFetching, refetch} = useQuery(
    `${QUERY}-scraped`,
    () => getProductScrapedRequest(),
    {
      select: dataProductScraped => {
        const newProductScrapedFormatted: ProductScrapedFormatted[] =
          dataProductScraped.map(productScraped => {
            return {
              ...productScraped,
              urlScrapedDomainName: getDomain(productScraped.urlToScrape),
              date: stringDateFormatted(productScraped.date),
              price: convertToPrice(productScraped.price),
            };
          });
        return newProductScrapedFormatted;
      },
    },
  );

  return {
    productsScrapedState: {
      isError,
      isFetched,
      isFetching,
    },
    productsScraped: data || [],
    refetchProductScraped: refetch,
  };
}
