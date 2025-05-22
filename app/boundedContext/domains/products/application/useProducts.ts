/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery, useQueryClient, useMutation} from 'react-query';

import {
  Product,
  ProductWithOptionalId,
  ProductWithRequiredId,
} from '@domains/products/domain/product';
import {
  PRODUCTS_QUERY_KEY,
  PRODUCTS_CACHE_TIME,
} from '@domains/products/infrastructure/config/productsConfig';
import {getProductUseCase} from '@domains/products/infrastructure/factories/productUseCaseFactory';

export function useProductsList(forceRefetch = false) {
  const queryClient = useQueryClient();
  const productUseCase = getProductUseCase();

  const {data, isError, isFetched, isFetching, isLoading, isSuccess, refetch} =
    useQuery<Product[], Error>(
      PRODUCTS_QUERY_KEY,
      () => productUseCase.getProducts(),
      {
        staleTime: PRODUCTS_CACHE_TIME,
        cacheTime: PRODUCTS_CACHE_TIME,
        refetchOnWindowFocus: false,
        refetchOnMount: !forceRefetch,
        refetchOnReconnect: !forceRefetch,
      },
    );

  const invalidateCache = () => {
    queryClient.invalidateQueries(PRODUCTS_QUERY_KEY);
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
  const productUseCase = getProductUseCase();

  type MutationContext = {
    previousProducts: Product[] | undefined;
  };

  const mutation = useMutation<
    Product,
    Error,
    ProductWithOptionalId,
    MutationContext
  >(product => productUseCase.createProduct(product), {
    onMutate: async newProduct => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(PRODUCTS_QUERY_KEY);

      // Snapshot the previous value
      const previousProducts =
        queryClient.getQueryData<Product[]>(PRODUCTS_QUERY_KEY);

      // Optimistically update to the new value
      if (previousProducts) {
        queryClient.setQueryData<Product[]>(PRODUCTS_QUERY_KEY, [
          ...previousProducts,
          newProduct as Product,
        ]);
      }

      return {previousProducts};
    },
    onError: (error, newProduct, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCTS_QUERY_KEY, context.previousProducts);
      }
      // Log the error or handle it appropriately
      console.error('Error creating product:', error);
    },
    onSuccess: newProduct => {
      queryClient.invalidateQueries(PRODUCTS_QUERY_KEY);
    },
  });

  return {
    createProduct: (product: ProductWithOptionalId) =>
      mutation.mutateAsync(product),
    createProductState: {
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
    },
  };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const productUseCase = getProductUseCase();

  type MutationContext = {
    previousProducts: Product[] | undefined;
  };

  const mutation = useMutation<
    Product,
    Error,
    ProductWithRequiredId,
    MutationContext
  >(product => productUseCase.updateProduct(product), {
    onMutate: async updatedProduct => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(PRODUCTS_QUERY_KEY);

      // Snapshot the previous value
      const previousProducts =
        queryClient.getQueryData<Product[]>(PRODUCTS_QUERY_KEY);

      // Optimistically update to the new value
      if (previousProducts) {
        queryClient.setQueryData<Product[]>(
          PRODUCTS_QUERY_KEY,
          previousProducts.map(p =>
            p.id === updatedProduct.id ? (updatedProduct as Product) : p,
          ),
        );
      }

      return {previousProducts};
    },
    onError: (error, updatedProduct, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProducts) {
        queryClient.setQueryData(PRODUCTS_QUERY_KEY, context.previousProducts);
      }
      // Log the error or handle it appropriately
      console.error('Error updating product:', error);
    },
    onSuccess: updatedProduct => {
      queryClient.invalidateQueries(PRODUCTS_QUERY_KEY);
    },
  });

  return {
    updateProduct: (product: ProductWithRequiredId) =>
      mutation.mutateAsync(product),
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
