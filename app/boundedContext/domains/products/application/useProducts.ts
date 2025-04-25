import {useQuery, useQueryClient, useMutation} from 'react-query';

import {api} from '@infrastructure/repositories/axiosBase';

import {ProductRepositoryImpl} from '@domains/products/infrastructure/productRepositoryImpl';
import {ProductUseCase} from '@domains/products/application/productUseCase';
import {
  Product,
  ProductWithOptionalId,
  ProductWithRequiredId,
} from '@domains/products/domain/product';

const productUseCase = new ProductUseCase(new ProductRepositoryImpl(api));

const QUERY_KEY = 'products';
const CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day in milliseconds

export function useProductsList(forceRefetch = false) {
  const queryClient = useQueryClient();

  const {data, isError, isFetched, isFetching, isLoading, isSuccess, refetch} =
    useQuery<Product[], Error>(QUERY_KEY, () => productUseCase.getProducts(), {
      staleTime: CACHE_TIME,
      cacheTime: CACHE_TIME,
      refetchOnWindowFocus: false,
      refetchOnMount: !forceRefetch,
      refetchOnReconnect: !forceRefetch,
    });

  const invalidateCache = () => {
    queryClient.invalidateQueries(QUERY_KEY);
  };

  return {
    productState: {
      isError,
      isFetched,
      isFetching,
      isLoading,
      isSuccess,
    },
    products: data || [],
    refetchProducts: refetch,
    invalidateProductsCache: invalidateCache,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Product[], Error, ProductWithOptionalId>(
    product => productUseCase.createProduct(product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    },
  );

  return {
    createProduct: mutation.mutate,
    createProductState: {
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
    },
  };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Product[], Error, ProductWithRequiredId>(
    product => productUseCase.updateProduct(product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    },
  );

  return {
    updateProduct: mutation.mutate,
    updateProductState: {
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
    },
  };
}

export function useProducts(forceRefetch = false) {
  const productsList = useProductsList(forceRefetch);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  return {
    ...productsList,
    ...createProduct,
    ...updateProduct,
  };
}
