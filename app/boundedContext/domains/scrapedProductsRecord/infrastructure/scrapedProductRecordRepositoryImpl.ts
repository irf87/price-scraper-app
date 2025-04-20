import {AxiosInstance} from 'axios';
import {ScrapedProductRecordRepository} from '@domains/scrapedProductsRecord/domain/scrapedProductRecordRepository';
import {ScrapedProductRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';

export class ScrapedProductRecordRepositoryImpl
  implements ScrapedProductRecordRepository
{
  constructor(private readonly api: AxiosInstance) {}

  async getScrapedProductRecords(
    scrapedProductId: number,
  ): Promise<ScrapedProductRecords> {
    const response = await this.api.get<ScrapedProductRecords>(
      `reports/product-scraped?id=${scrapedProductId}`,
    );
    return response.data;
  }
}
