import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {StackScreenProductDetailProps} from '@navigation/navigationTypes';

import ScraperSettings from '@domains/scrapedProducts/presentation/ScraperSettingsForm';
import ScraperRules from '@domains/scraperRules/presentation/ScraperRulesForm';
import {useScraperRule} from '@domains/scraperRules/application/useScraperRules';
import {useScraperRuleMutation} from '@domains/scraperRules/application/useScraperRules';
import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';
import {ScraperSettingsFormData} from '@domains/scrapedProducts/presentation/scraperSettingsSchema';
import {ScraperRulesFormData} from '@domains/scraperRules/presentation/scraperRulesSchema';

interface Props
  extends StackScreenProductDetailProps<'ScrapedProductSettings'> {}

function ProductScrapperSettings({route}: Props) {
  const {scrapedId, enable, urlToScrape} = route.params;
  const {scraperRules, scraperRulesState} = useScraperRule(scrapedId);
  const {
    createScraperRule,
    updateScraperRule,
    createScraperRuleState,
    updateScraperRuleState,
  } = useScraperRuleMutation();
  console.log('scraperRules', scraperRules);

  const handleScraperSettingsSubmit = (data: ScraperSettingsFormData) => {
    console.log('Scraper settings submitted:', data);
    // TODO: Implement scraper settings update
  };

  const handleScraperRulesSubmit = (data: ScraperRulesFormData) => {
    if (scraperRules) {
      // Update existing rule
      const updatedRule: ScraperRule = {
        ...scraperRules,
        notifyPriceSmallerEqualThan: data.priceLessThan
          ? Number(data.priceLessThan)
          : null,
        notifyPriceMoreEqualThan: data.priceGreaterThan
          ? Number(data.priceGreaterThan)
          : null,
        notifyAvailabilityChanges: data.notifyAvailability,
        notifyPriceChanges: data.notifyPrice,
        notifyStockChanges: data.notifyStock,
      };
      updateScraperRule({id: scraperRules.id, scraperRule: updatedRule});
    } else {
      // Create new rule
      const newRule: ScraperRule = {
        id: 0, // This will be set by the backend
        productScrapedId: scrapedId,
        match: '',
        notifyWhenIsAvailable: false,
        notifyPriceSmallerEqualThan: data.priceLessThan
          ? Number(data.priceLessThan)
          : null,
        notifyPriceMoreEqualThan: data.priceGreaterThan
          ? Number(data.priceGreaterThan)
          : null,
        notifyStockChanges: data.notifyStock,
        notifyPriceChanges: data.notifyPrice,
        notifyAvailabilityChanges: data.notifyAvailability,
      };
      createScraperRule(newRule);
    }
  };

  // Determine loading and success/error states
  const isLoading =
    createScraperRuleState.isLoading || updateScraperRuleState.isLoading;
  const isSuccess =
    createScraperRuleState.isSuccess || updateScraperRuleState.isSuccess;
  const isError =
    createScraperRuleState.isError || updateScraperRuleState.isError;

  return (
    <View style={{flex: 1}}>
      <ScraperSettings
        enable={enable}
        urlToScrape={urlToScrape}
        onSubmit={handleScraperSettingsSubmit}
      />

      {scraperRulesState.isFetching ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScraperRules
          scraperRule={scraperRules || undefined}
          onSubmit={handleScraperRulesSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </View>
  );
}

export default ProductScrapperSettings;
