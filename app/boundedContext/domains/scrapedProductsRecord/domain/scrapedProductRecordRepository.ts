import {ScrapedProductRecords} from './scrapedProductRecord';

export interface ScrapedProductRecordRepository {
  getScrapedProductRecords(
    scrapedProductId: number,
  ): Promise<ScrapedProductRecords>;
}
