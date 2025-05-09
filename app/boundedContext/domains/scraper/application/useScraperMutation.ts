import {useMutation} from 'react-query';
import {useTranslation} from '@core/i18n';
import {api} from '@infrastructure/repositories/axiosBase';

import {ScraperRepositoryImp} from '@domains/scraper/infrastructure/scraperRepositoryImp';
import {ScraperUseCase} from '@domains/scraper/application/scraperUseCase';
import {
  ScraperUpdates,
  ScraperWithOptionalId,
} from '@domains/scraper/domain/scraper';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

const scraperUseCase = new ScraperUseCase(new ScraperRepositoryImp(api));

export const useScraperMutation = () => {
  const {t} = useTranslation();
  const setSnackbarOptions = useSnackbarStore(state => state.setOptions);
  const showSnackbar = useSnackbarStore(state => state.show);

  const createMutation = useMutation<
    ScraperWithOptionalId,
    Error,
    ScraperWithOptionalId
  >({
    mutationFn: (scraper: ScraperWithOptionalId) =>
      scraperUseCase.createScraper(scraper),
    onSuccess: () => {
      setSnackbarOptions({type: 'success', message: t('common.success')});
      showSnackbar();
    },
    onError: error => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
      console.error('Error creating scraper:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (scraper: ScraperUpdates) =>
      scraperUseCase.updataScraper(scraper),
    onSuccess: () => {
      setSnackbarOptions({type: 'success', message: t('common.success')});
      showSnackbar();
    },
    onError: () => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
    },
  });

  return {
    createScraper: (scraper: ScraperWithOptionalId) =>
      createMutation.mutateAsync(scraper),
    createScraperState: {
      isLoading: createMutation.isLoading,
      isError: createMutation.isError,
      isSuccess: createMutation.isSuccess,
    },
    updateScraper: updateMutation.mutate,
    updateScraperState: {
      isLoading: updateMutation.isLoading,
      isError: updateMutation.isError,
      isSuccess: updateMutation.isSuccess,
    },
  };
};
