import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {getDomain} from '@domains/scrapedProducts/utils';
import {stringDateFormatted} from '@utils/date';
import {convertToPrice} from '@utils/currency';

export class ScrapedProductAdapter {
  static formatProduct(product: ScrapedProduct) {
    return {
      ...product,
      urlScrapedDomainName: getDomain(product.urlToScrape),
      date: stringDateFormatted(product.date),
      price: convertToPrice(product.price) as string,
    };
  }
  static formatProducts(products: ScrapedProduct[]) {
    return products.map(product => this.formatProduct(product));
  }
}
