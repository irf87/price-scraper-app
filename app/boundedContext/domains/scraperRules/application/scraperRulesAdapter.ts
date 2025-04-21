/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ScraperRule,
  ScraperRuleFromApi,
} from '@domains/scraperRules/domain/scraperRules';

export class ScraperRulesAdapter {
  static fromApi(scraperRuleFromApi: ScraperRuleFromApi): ScraperRule {
    // Create a copy of the object without the date properties
    const {
      notifyWhenIsAvailable,
      notifyStockChanges,
      notifyPriceChanges,
      notifyAvailabilityChanges,
      notifyMatchDate,
      notifyAvailabilityChangesDate,
      notifyWhenIsAvailableDate,
      notifyPriceMoreEqualThanDate,
      notifyPriceSmallerEqualThanDate,
      notifyStockChangesDate,
      notifyPriceChangesDate,
      ...otherProps
    } = scraperRuleFromApi;

    return {
      ...otherProps,
      match:
        !scraperRuleFromApi.match || scraperRuleFromApi.match === "'"
          ? ''
          : scraperRuleFromApi.match,
      notifyWhenIsAvailable: notifyWhenIsAvailable === 1,
      notifyStockChanges: notifyStockChanges === 1,
      notifyPriceChanges: notifyPriceChanges === 1,
      notifyAvailabilityChanges: notifyAvailabilityChanges === 1,
    };
  }

  static toApi(scraperRule: ScraperRule): ScraperRuleFromApi {
    return {
      ...scraperRule,
      notifyWhenIsAvailable: scraperRule.notifyWhenIsAvailable ? 1 : 0,
      notifyStockChanges: scraperRule.notifyStockChanges ? 1 : 0,
      notifyPriceChanges: scraperRule.notifyPriceChanges ? 1 : 0,
      notifyAvailabilityChanges: scraperRule.notifyAvailabilityChanges ? 1 : 0,
    };
  }
}
