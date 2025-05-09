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

export interface ScraperSelectors {
  priceDomSelector: string;
  stockDomSelector?: string;
  availableDomSelector?: string;
  productNameDomSelector?: string;
  productDescriptionDomSelector?: string;
  imageProductDomSelector?: string;
  gettingMode: 'FETCH' | 'RENDER';
}

export type ScraperUpdates = Pick<Scraper, 'id' | 'urlToScrape' | 'enable'> &
  Partial<Omit<Scraper, 'id' | 'urlToScrape' | 'enable'>>;

export interface ScraperWithOptionalId extends Omit<Scraper, 'id'> {
  id?: number;
}

export interface ScraperUpdateResponseApi {
  success: boolean;
}

export interface ProductDetailBySelectorsResponse {
  name: string;
  description: string;
  urlImg: string;
}

export interface ProductDetailBySelectorsProps {
  url: string;
  gettingMode: 'FETCH' | 'RENDER';
  productNameDomSelector: string;
  productDescriptionDomSelector?: string;
  imageProductDomSelector?: string;
}
