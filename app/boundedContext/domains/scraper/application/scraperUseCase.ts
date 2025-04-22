import {
  ScraperUpdates,
  ScraperUpdateResponseApi,
} from '@domains/scraper/domain/scraper';
import {ScraperRepository} from '@domains/scraper/domain/scraperRepository';
export class ScraperUseCase {
  constructor(private readonly repository: ScraperRepository) {}

  async updataScraper(
    scraper: ScraperUpdates,
  ): Promise<ScraperUpdateResponseApi> {
    return await this.repository.updataScraper(scraper);
  }
}
