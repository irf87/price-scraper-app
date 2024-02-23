import { useQuery  } from 'react-query';
import { getProductRequest, getProductScrapedRequest } from '@repositories/products';

import { ProductScraped, getDomain } from '@domain/products/product';

export interface ProductScrapedFormated extends ProductScraped {
  urlScrapedDomainName?: string;
}

const QUERY = 'products';

export function useProducts () {
  const { data, isError, isFetched, isFetching } = useQuery(QUERY, () => getProductRequest());
  return {
    productState: {
      isError,
      isFetched,
      isFetching,
    },
    products: data || [],
  }
}

export function useProductsScraped () {
  const { data, isError, isFetched, isFetching } = useQuery(`${QUERY}-scraped`, () => getProductScrapedRequest(), 
  { select: (dataProductScraped) => {
    const newProductScrapedFormated: ProductScrapedFormated[] = dataProductScraped.map((productScraped) => {
      return {
        ...productScraped,
        urlScrapedDomainName: getDomain(productScraped.urlToScrape),
      }
    });
    return newProductScrapedFormated;
  }});

  return {
    productsScrapedState: {
      isError,
      isFetched,
      isFetching,
    },
    productsScraped: data || [],
  }
}