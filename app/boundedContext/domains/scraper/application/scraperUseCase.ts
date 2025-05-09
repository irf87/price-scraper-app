import {
  Scraper,
  ScraperUpdates,
  ScraperUpdateResponseApi,
  ScraperSelectors,
  ProductDetailBySelectorsProps,
  ProductDetailBySelectorsResponse,
  ScraperWithOptionalId,
} from '@domains/scraper/domain/scraper';
import {ScraperRepository} from '@domains/scraper/domain/scraperRepository';
export class ScraperUseCase {
  constructor(private readonly repository: ScraperRepository) {}

  async createScraper(scraper: ScraperWithOptionalId): Promise<Scraper> {
    return await this.repository.createScraper(scraper);
  }

  async updataScraper(
    scraper: ScraperUpdates,
  ): Promise<ScraperUpdateResponseApi> {
    return await this.repository.updataScraper(scraper);
  }

  async getScraperSelectorsByUrl(url: string): Promise<ScraperSelectors> {
    return await this.repository.getScraperSelectorsByUrl(url);
  }

  async getProductDetailByScraper(
    props: ProductDetailBySelectorsProps,
  ): Promise<ProductDetailBySelectorsResponse> {
    return await this.repository.getProductDetailByScraper(props);
  }
}
