import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useTranslation} from '@core/i18n';
import {api} from '@infrastructure/repositories/axiosBase';

import {ScraperRulesRepositoryImpl} from '@domains/scraperRules/infrastructure/scraperRulesRepositoryImpl';
import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';
import {ScraperRulesUseCase} from '@domains/scraperRules/application/scraperRulesUseCase';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

const scraperRulesUseCase = new ScraperRulesUseCase(
  new ScraperRulesRepositoryImpl(api),
);

export const useScraperRule = (id: number) => {
  const {data, isError, isFetching} = useQuery({
    queryKey: ['scraperRule', id],
    queryFn: () => scraperRulesUseCase.getScraperRuleByScraperId(id),
    enabled: !!id,
  });

  return {
    scraperRules: data,
    scraperRulesState: {
      isError,
      isFetching,
    },
  };
};

export const useScraperRuleMutation = () => {
  const {t} = useTranslation();
  const setSnackbarOptions = useSnackbarStore(state => state.setOptions);
  const showSnackbar = useSnackbarStore(state => state.show);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (scraperRule: ScraperRule) =>
      scraperRulesUseCase.createScraperRule(scraperRule),
    onSuccess: () => {
      setSnackbarOptions({type: 'success', message: t('common.success')});
      showSnackbar();
      queryClient.invalidateQueries({queryKey: ['scraperRule']});
    },
    onError: () => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({id, scraperRule}: {id: number; scraperRule: ScraperRule}) =>
      scraperRulesUseCase.updateScraperRule(id, scraperRule),
    onSuccess: () => {
      setSnackbarOptions({type: 'success', message: t('common.success')});
      showSnackbar();
      queryClient.invalidateQueries({queryKey: ['scraperRule']});
    },
    onError: () => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
    },
  });

  return {
    createScraperRule: createMutation.mutate,
    createScraperRuleState: {
      isLoading: createMutation.isLoading,
      isError: createMutation.isError,
      isSuccess: createMutation.isSuccess,
    },
    updateScraperRule: updateMutation.mutate,
    updateScraperRuleState: {
      isLoading: updateMutation.isLoading,
      isError: updateMutation.isError,
      isSuccess: updateMutation.isSuccess,
    },
  };
};
