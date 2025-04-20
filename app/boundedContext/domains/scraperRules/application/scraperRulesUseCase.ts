import {ScraperRulesRepository} from '@domains/scraperRules/domain/scraperRulesRepository';
import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';

export class ScraperRulesUseCase {
  constructor(
    private readonly scraperRulesRepository: ScraperRulesRepository,
  ) {}

  async getScraperRuleByScraperId(id: number): Promise<ScraperRule> {
    return this.scraperRulesRepository.getScraperRuleByScraperId(id);
  }

  async createScraperRule(scraperRule: ScraperRule): Promise<ScraperRule> {
    return this.scraperRulesRepository.createScraperRule(scraperRule);
  }

  async updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRule> {
    return this.scraperRulesRepository.updateScraperRule(id, scraperRule);
  }
}
