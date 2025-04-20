import {AxiosInstance} from 'axios';
import {ScraperRulesRepository} from '@domains/scraperRules/domain/scraperRulesRepository';
import {ScraperRule} from '@domains/scraperRules/domain/scraperRules';

export class ScraperRulesRepositoryImpl implements ScraperRulesRepository {
  constructor(private readonly api: AxiosInstance) {}

  async getScraperRuleByScraperId(id: number): Promise<ScraperRule> {
    const response = await this.api.get(`/notifications/${id}`);
    return response.data;
  }

  async createScraperRule(scraperRule: ScraperRule): Promise<ScraperRule> {
    const response = await this.api.post('/notifications', scraperRule);
    return response.data;
  }

  async updateScraperRule(
    id: number,
    scraperRule: ScraperRule,
  ): Promise<ScraperRule> {
    const response = await this.api.put(`/notifications/${id}`, scraperRule);
    return response.data;
  }
}
