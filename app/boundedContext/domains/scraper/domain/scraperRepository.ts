import {
  Scraper,
  ScraperUpdates,
  ScraperWithOptionalId,
  ScraperUpdateResponseApi,
  ScraperSelectors,
  ProductDetailBySelectorsProps,
  ProductDetailBySelectorsResponse,
} from '@domains/scraper/domain/scraper';

export interface ScraperRepository {
  updataScraper(scraper: ScraperUpdates): Promise<ScraperUpdateResponseApi>;
  createScraper(scraper: ScraperWithOptionalId): Promise<Scraper>;
  getScraperSelectorsByUrl(url: string): Promise<ScraperSelectors>;
  getProductDetailByScraper(
    props: ProductDetailBySelectorsProps,
  ): Promise<ProductDetailBySelectorsResponse>;
}
