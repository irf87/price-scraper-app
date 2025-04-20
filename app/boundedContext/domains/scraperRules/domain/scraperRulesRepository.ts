import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';

export interface ScraperRulesRepository {
  getScraperRuleByScraperId(id: number): Promise<ScraperRule>;
  createScraperRule(scraperRule: ScraperRule): Promise<ScraperRule>;
  updateScraperRule(id: number, scraperRule: ScraperRule): Promise<ScraperRule>;
}
