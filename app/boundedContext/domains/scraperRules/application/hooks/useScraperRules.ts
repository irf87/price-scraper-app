import {useQuery, useMutation, useQueryClient} from 'react-query';
import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';
import {ScraperRulesUseCase} from '../scraperRulesUseCase';

export const useScraperRule = (
  scraperRulesUseCase: ScraperRulesUseCase,
  id: number,
) => {
  const {data, isError, isFetching} = useQuery({
    queryKey: ['scraperRule', id],
    queryFn: () => scraperRulesUseCase.getScraperRuleByScraperId(id),
    enabled: !!id,
  });

  return {
    scraperRules: data || [],
    scraperRulesState: {
      isError,
      isFetching,
    },
  };
};

export const useScraperRuleMutation = (
  scraperRulesUseCase: ScraperRulesUseCase,
) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (scraperRule: ScraperRule) =>
      scraperRulesUseCase.createScraperRule(scraperRule),
    onSuccess: (data: ScraperRule) => {
      queryClient.invalidateQueries({queryKey: ['scraperRule', data.id]});
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({id, scraperRule}: {id: number; scraperRule: ScraperRule}) =>
      scraperRulesUseCase.updateScraperRule(id, scraperRule),
    onSuccess: (data: ScraperRule) => {
      queryClient.invalidateQueries({queryKey: ['scraperRule', data.id]});
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
