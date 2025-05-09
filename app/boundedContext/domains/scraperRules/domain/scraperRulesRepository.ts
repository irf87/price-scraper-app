import {
  ScraperRule,
  ScraperRuleFromApi,
  ScraperRuleWithOptionalId,
} from '@domains/scraperRules/domain/scraperRules';

export interface ScraperRulesRepository {
  getScraperRuleByScraperId(id: number): Promise<ScraperRuleFromApi>;
  createScraperRule(
    scraperRule: ScraperRuleWithOptionalId,
  ): Promise<ScraperRuleFromApi>;
  updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRuleFromApi>;
}
