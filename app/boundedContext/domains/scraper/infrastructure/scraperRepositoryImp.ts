import {AxiosInstance} from 'axios';

import {ScraperRepository} from '@domains/scraper/domain/scraperRepository';
import {ScraperUpdates, ScraperUpdateResponseApi} from '../domain/scraper';

export class ScraperRepositoryImp implements ScraperRepository {
  constructor(private readonly api: AxiosInstance) {}

  async updataScraper(
    scraper: ScraperUpdates,
  ): Promise<ScraperUpdateResponseApi> {
    const response = await this.api.put(`/scraper/${scraper.id}`, scraper);
    return response.data;
  }
}
