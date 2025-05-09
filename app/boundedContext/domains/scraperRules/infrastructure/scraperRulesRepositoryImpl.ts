import {AxiosInstance} from 'axios';
import {ScraperRulesRepository} from '@domains/scraperRules/domain/scraperRulesRepository';
import {
  ScraperRule,
  ScraperRuleWithOptionalId,
  ScraperRuleFromApi,
} from '@domains/scraperRules/domain/scraperRules';

export class ScraperRulesRepositoryImpl implements ScraperRulesRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getScraperRuleByScraperId(id: number): Promise<ScraperRuleFromApi> {
    const response = await this.api.get(`/notifications/product-scraped/${id}`);
    return response.data;
  }

  async createScraperRule(
    scraperRule: ScraperRuleWithOptionalId,
  ): Promise<ScraperRuleFromApi> {
    const response = await this.api.post('/notifications', scraperRule);
    return response.data;
  }

  async updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRuleFromApi> {
    const response = await this.api.put(`/notifications/${id}`, scraperRule);
    return response.data;
  }
}
