import {
  ScraperUpdates,
  ScraperUpdateResponseApi,
} from '@domains/scraper/domain/scraper';

export interface ScraperRepository {
  updataScraper(scraper: ScraperUpdates): Promise<ScraperUpdateResponseApi>;
}
