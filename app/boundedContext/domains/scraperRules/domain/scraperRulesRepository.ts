import {
  ScraperRule,
  ScraperRuleFromApi,
} from '@domains/scraperRules/domain/scraperRules';

export interface ScraperRulesRepository {
  getScraperRuleByScraperId(id: number): Promise<ScraperRuleFromApi>;
  createScraperRule(scraperRule: ScraperRule): Promise<ScraperRuleFromApi>;
  updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRuleFromApi>;
}
