import {useMutation} from 'react-query';
import {useTranslation} from '@core/i18n';
import {api} from '@infrastructure/repositories/axiosBase';

import {ScraperRepositoryImp} from '@domains/scraper/infrastructure/scraperRepositoryImp';
import {ScraperUseCase} from '@domains/scraper/application/scraperUseCase';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

const scraperUseCase = new ScraperUseCase(new ScraperRepositoryImp(api));

export const useScraperDelete = () => {
  const {t} = useTranslation();
  const setSnackbarOptions = useSnackbarStore(state => state.setOptions);
  const showSnackbar = useSnackbarStore(state => state.show);

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => scraperUseCase.removeScraper(id),
    onSuccess: () => {
      setSnackbarOptions({type: 'success', message: t('common.success')});
      showSnackbar();
    },
    onError: error => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
      console.error('Error deleting scraper:', error);
    },
  });

  return {
    deleteScraper: (id: number) => deleteMutation.mutateAsync(id),
    deleteScraperState: {
      isLoading: deleteMutation.isLoading,
      isError: deleteMutation.isError,
      isSuccess: deleteMutation.isSuccess,
    },
  };
};
