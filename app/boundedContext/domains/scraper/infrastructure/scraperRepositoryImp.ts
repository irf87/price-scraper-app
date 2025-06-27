import {AxiosInstance} from 'axios';

import {ScraperRepository} from '@domains/scraper/domain/scraperRepository';
import {
  ScraperUpdates,
  ScraperWithOptionalId,
  ScraperUpdateResponseApi,
  ScraperSelectors,
  ProductDetailBySelectorsResponse,
  ProductDetailBySelectorsProps,
  Scraper,
} from '../domain/scraper';

export class ScraperRepositoryImp implements ScraperRepository {
  constructor(private readonly api: AxiosInstance) {}

  async updataScraper(
    scraper: ScraperUpdates,
  ): Promise<ScraperUpdateResponseApi> {
    const response = await this.api.put(`scraper/${scraper.id}`, scraper);
    return response.data;
  }

  async createScraper(scraper: ScraperWithOptionalId): Promise<Scraper> {
    console.log('new scraper Props', scraper);
    const response = await this.api.post('scraper', scraper);
    return response.data;
  }

  async getScraperSelectorsByUrl(url: string): Promise<ScraperSelectors> {
    const response = await this.api.post('scraper/suggest-selectors', {url});
    return response.data;
  }

  async getProductDetailByScraper(
    props: ProductDetailBySelectorsProps,
  ): Promise<ProductDetailBySelectorsResponse> {
    const response = await this.api.post(
      'scraper/product-details-by-selectors',
      props,
    );
    return response.data;
  }

  async deleteScraper(id: number): Promise<void> {
    await this.api.delete(`scraper/${id}`);
  }
}
