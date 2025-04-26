import {useQuery} from 'react-query';
import {useTranslation} from 'react-i18next';

import {api} from '@infrastructure/repositories/axiosBase';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {ScrapedProductRepositoryImpl} from '@domains/scrapedProducts/infrastructure/scrapedProductsRepositortyImpl';
import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';
import {ScrapedProductsUseCase} from '@domains/scrapedProducts/application/scrapedProductUseCase';

const scrapedProductUseCase = new ScrapedProductsUseCase(
  new ScrapedProductRepositoryImpl(api),
);

interface UseProductsScrapedListProps {
  queryFunction: QueryProductScrapedFunction;
  id?: number;
  enabled?: boolean;
}

export const useProductsScrapedList = ({
  queryFunction,
  id,
  enabled = true,
}: UseProductsScrapedListProps) => {
  console.log('id to', id);
  const {t} = useTranslation();
  const queryKey = [queryFunction, id];

  const fetchData = async () => {
    switch (queryFunction) {
      case 'getAllScrapedProductsEnabled':
        return scrapedProductUseCase.getAllScrapedProductsEnabled();
      case 'getScrapedProductByCategory':
        if (id === undefined) {
          throw new Error(t('scrapedProducts.errors.categoryIdRequired'));
        }
        return scrapedProductUseCase.getScrapedProductByCategory(id);
      case 'getScrapedProductByList':
        if (id === undefined) {
          throw new Error(t('scrapedProducts.errors.listIdRequired'));
        }
        return scrapedProductUseCase.getScrapedProductByList(id);
      case 'getScrapedProductByProductId':
        if (id === undefined) {
          throw new Error(t('scrapedProducts.errors.categoryIdRequired'));
        }
        return scrapedProductUseCase.getScrepedProductsByIdProduct(id);
      default:
        throw new Error(
          t('scrapedProducts.errors.unknownQueryFunction', {
            function: queryFunction,
          }),
        );
    }
  };

  return useQuery<ScrapedProduct[], Error>(queryKey, fetchData, {
    enabled,
  });
};
