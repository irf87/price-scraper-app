import {useQuery} from 'react-query';
import {
  getProductRequest,
  getProductScrapedRequest,
} from '@repositories/products';

import {ProductScraped, getDomain} from '@domain/products/product';
import {convertToPrice} from '@domain/currencies/currency';

import {stringDateFormated} from '@utils/date';

export interface ProductScrapedFormated extends ProductScraped {
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
        const newProductScrapedFormated: ProductScrapedFormated[] =
          dataProductScraped.map(productScraped => {
            return {
              ...productScraped,
              urlScrapedDomainName: getDomain(productScraped.urlToScrape),
              date: stringDateFormated(productScraped.date),
              price: convertToPrice(productScraped.price),
            };
          });
        return newProductScrapedFormated;
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
