export interface Scraper {
  id: number;
  productId: number;
  urlToScrape: string;
  priceDomSelector: string;
  stockDomSelector?: string;
  availableDomSelector?: string;
  enable: boolean;
  gettingMode: 'FETCH' | 'RENDER';
}

export type ScraperUpdates = Pick<Scraper, 'id' | 'urlToScrape' | 'enable'> &
  Partial<Omit<Scraper, 'id' | 'urlToScrape' | 'enable'>>;

export interface ScraperUpdateResponseApi {
  success: boolean;
}
