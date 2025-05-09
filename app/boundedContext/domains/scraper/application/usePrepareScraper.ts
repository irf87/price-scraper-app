import {useQuery, useQueryClient} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';

import {ScraperRepositoryImp} from '@domains/scraper/infrastructure/scraperRepositoryImp';
import {ScraperUseCase} from '@domains/scraper/application/scraperUseCase';
import {ProductDetailBySelectorsProps} from '@domains/scraper/domain/scraper';

const scraperUseCase = new ScraperUseCase(new ScraperRepositoryImp(api));

const QUERY_KEY_SELECTORS = 'selectors-by-url';
const QUERY_KEY_PRODUCT_DETAIL = 'product-detail-by-selectors';

export const useGetSelectorsByUrl = (url = '', enabled = false) => {
  const queryClient = useQueryClient();

  const {data, isError, isFetching, isFetched, refetch} = useQuery({
    queryKey: [QUERY_KEY_SELECTORS, url],
    queryFn: () => scraperUseCase.getScraperSelectorsByUrl(url),
    enabled,
  });

  const clearSelectorsQueryData = () => {
    queryClient.removeQueries(QUERY_KEY_SELECTORS);
  };

  const forceRefetchSelectors = () => {
    return refetch();
  };

  const setUrlAndRefetch = async (newUrl: string) => {
    await queryClient.invalidateQueries([QUERY_KEY_SELECTORS, url]);
    queryClient.setQueryData([QUERY_KEY_SELECTORS, newUrl], null);
    return refetch();
  };

  return {
    selectors: data,
    selectorsState: {
      isError,
      isFetching,
      isFetched,
    },
    forceRefetchSelectors,
    clearSelectorsQueryData,
    setUrlAndRefetch,
  };
};

export const DEFAULT_PROPS_PRODUCT_DETAIL: ProductDetailBySelectorsProps = {
  url: '',
  gettingMode: 'FETCH',
  productNameDomSelector: '',
  productDescriptionDomSelector: '',
  imageProductDomSelector: '',
};

export const useGetProductDetailBySelectors = (
  initialProps: ProductDetailBySelectorsProps,
  enabled = false,
) => {
  const queryClient = useQueryClient();

  const {data, isError, isFetching, isFetched, refetch} = useQuery({
    queryKey: [QUERY_KEY_PRODUCT_DETAIL],
    queryFn: () => scraperUseCase.getProductDetailByScraper(initialProps),
    enabled,
  });

  const clearProductDetailQueryData = () => {
    queryClient.removeQueries(QUERY_KEY_PRODUCT_DETAIL);
  };

  const forceRefetchProductDetail = () => {
    return refetch();
  };

  const setPropsAndRefetch = async (
    newProps: ProductDetailBySelectorsProps,
  ) => {
    await queryClient.invalidateQueries([QUERY_KEY_PRODUCT_DETAIL]);

    queryClient.setQueryDefaults([QUERY_KEY_PRODUCT_DETAIL], {
      queryFn: () => scraperUseCase.getProductDetailByScraper(newProps),
    });

    return queryClient.fetchQuery({
      queryKey: [QUERY_KEY_PRODUCT_DETAIL],
      queryFn: () => scraperUseCase.getProductDetailByScraper(newProps),
    });
  };

  return {
    productDetail: data,
    productDetailState: {
      isError,
      isFetching,
      isFetched,
    },
    forceRefetchProductDetail,
    clearProductDetailQueryData,
    setPropsAndRefetch,
  };
};
