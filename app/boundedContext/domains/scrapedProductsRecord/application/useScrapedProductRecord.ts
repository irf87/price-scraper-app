import {useQuery, useQueryClient} from 'react-query';
import {api} from '@infrastructure/repositories/axiosBase';
import {ScrapedProductRecordUseCase} from '@domains/scrapedProductsRecord/application/scrapedProductRecordUseCase';
import {ScrapedProductRecordRepositoryImpl} from '@domains/scrapedProductsRecord/infrastructure/scrapedProductRecordRepositoryImpl';
import {ScrapedProductRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';

const QUERY_KEY = 'scraped-product-records';

const scrapedProductRecordUseCase = new ScrapedProductRecordUseCase(
  new ScrapedProductRecordRepositoryImpl(api),
);

export function useScrapedProductRecord(scrapedProductId: number) {
  const queryClient = useQueryClient();

  const {data, isFetching, isError, error, refetch} = useQuery<
    ScrapedProductRecords,
    Error
  >(QUERY_KEY, () =>
    scrapedProductRecordUseCase.getScrapedProductRecords(scrapedProductId),
  );

  const clearQueryData = () => {
    queryClient.removeQueries(QUERY_KEY);
  };

  const forceRefetch = () => {
    return refetch();
  };

  return {
    scrapedProductRecords: data,
    scrapedProductRecordsState: {
      isFetching,
      isError,
      error,
    },
    clearQueryData,
    forceRefetch,
  };
}

export function useGetStoredScrapedProductRecord() {
  const queryClient = useQueryClient();

  const getStoredData = () => {
    return queryClient.getQueryData<ScrapedProductRecords>(QUERY_KEY);
  };

  return {
    getStoredData,
  };
}
