import {ScraperRulesRepository} from '@domains/scraperRules/domain/scraperRulesRepository';
import {
  ScraperRule,
  ScraperRuleWithOptionalId,
} from '@domains/scraperRules/domain/scraperRules';
import {ScraperRulesAdapter} from '@domains/scraperRules/application/scraperRulesAdapter';

export class ScraperRulesUseCase {
  constructor(private readonly repository: ScraperRulesRepository) {}

  async getScraperRuleByScraperId(id: number): Promise<ScraperRule> {
    const scraperRuleFromApi = await this.repository.getScraperRuleByScraperId(
      id,
    );
    return ScraperRulesAdapter.fromApi(scraperRuleFromApi);
  }

  async createScraperRule(
    scraperRule: ScraperRuleWithOptionalId,
  ): Promise<ScraperRule> {
    const scraperRuleFromApi = await this.repository.createScraperRule(
      scraperRule,
    );
    return ScraperRulesAdapter.fromApi(scraperRuleFromApi);
  }

  async updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRule> {
    const scraperRuleFromApi = await this.repository.updateScraperRule(
      id,
      scraperRule,
    );
    return ScraperRulesAdapter.fromApi(scraperRuleFromApi);
  }
}
