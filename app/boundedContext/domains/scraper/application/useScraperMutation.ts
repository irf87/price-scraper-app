import {useMutation} from 'react-query';
import {useTranslation} from '@core/i18n';
import {api} from '@infrastructure/repositories/axiosBase';

import {ScraperRepositoryImp} from '@domains/scraper/infrastructure/scraperRepositoryImp';
import {ScraperUseCase} from '@domains/scraper/application/scraperUseCase';
import {ScraperUpdates} from '@domains/scraper/domain/scraper';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

const scraperUseCase = new ScraperUseCase(new ScraperRepositoryImp(api));

export const useScraperMutation = () => {
  const {t} = useTranslation();
  const setSnackbarOptions = useSnackbarStore(state => state.setOptions);
  const showSnackbar = useSnackbarStore(state => state.show);

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
    updateScraper: updateMutation.mutate,
    updateScraperState: {
      isLoading: updateMutation.isLoading,
      isError: updateMutation.isError,
      isSuccess: updateMutation.isSuccess,
    },
  };
};
