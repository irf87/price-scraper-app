import {ScrapedProductRecordRepository} from '@domains/scrapedProductsRecord/domain/scrapedProductRecordRepository';
import {ScrapedProductRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';
import {ScrapedProductRecordAdapter} from './scrapedProductRecordAdapter';

export class ScrapedProductRecordUseCase {
  constructor(
    private readonly scrapedProductRecordRepository: ScrapedProductRecordRepository,
  ) {}

  async getScrapedProductRecords(
    scrapedProductId: number,
  ): Promise<ScrapedProductRecords> {
    const records =
      await this.scrapedProductRecordRepository.getScrapedProductRecords(
        scrapedProductId,
      );

    return ScrapedProductRecordAdapter.formatScrapedProductRecords(records);
  }
}
