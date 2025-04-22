import {ScrapedProductRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';
import {convertToPrice} from '@utils/currency';

export class ScrapedProductRecordAdapter {
  static formatScrapedProductRecords(
    records: ScrapedProductRecords,
  ): ScrapedProductRecords {
    return {
      ...records,
      minPrice: convertToPrice(records.minPrice) as string,
      maxPrice: convertToPrice(records.maxPrice) as string,
      avgPrice: convertToPrice(records.avgPrice) as string,
      records: records.records.map(record => ({
        ...record,
        date: new Date(record.date),
      })),
    };
  }
}
