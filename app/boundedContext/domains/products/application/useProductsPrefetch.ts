import {useQueryClient} from 'react-query';
import {
  PRODUCTS_QUERY_KEY,
  PRODUCTS_CACHE_TIME,
} from '@domains/products/infrastructure/config/productsConfig';
import {getProductUseCase} from '@domains/products/infrastructure/factories/productUseCaseFactory';

export const useProductsPrefetch = () => {
  const queryClient = useQueryClient();
  const productUseCase = getProductUseCase();

  const prefetchProducts = async () => {
    await queryClient.prefetchQuery(
      PRODUCTS_QUERY_KEY,
      () => productUseCase.getProducts(),
      {
        staleTime: PRODUCTS_CACHE_TIME,
        cacheTime: PRODUCTS_CACHE_TIME,
      },
    );
  };

  return {
    prefetchProducts,
  };
};
