import {useState, useEffect, useMemo} from 'react';
import {Product} from '@domains/products/domain/product';
import {useProductsList} from './useProducts';

import {searchByNameOrDescription} from '@utils/strings/searchByNameOrDescription';

/**
 * Hook for searching products by name or description
 * @param initialSearchTerm Initial search term (optional)
 * @returns Search functionality and results
 */
export const useProductSearch = (initialSearchTerm = '') => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const {products, productState, refetchProducts} = useProductsList();

  // Reset search when products are refetched
  useEffect(() => {
    if (productState.isFetching) {
      setSearchTerm('');
    }
  }, [productState.isFetching]);

  // Memoize search results to avoid unnecessary recalculations
  const searchResults = useMemo(() => {
    return searchByNameOrDescription<Product>(products, searchTerm);
  }, [products, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    productState,
    refetchProducts,
  };
};
