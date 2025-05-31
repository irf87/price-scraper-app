// Base interface
export interface BaseScraper {
  id: number;
  productId: number;
  urlToScrape: string;
  enable: boolean;
  gettingMode: 'FETCH' | 'RENDER';
}

// Extended interface for price scraping
export interface PriceScraper extends BaseScraper {
  priceDomSelector: string;
}

// Extended interface for stock scraping
export interface StockScraper extends BaseScraper {
  stockDomSelector: string;
}

// Extended interface for availability scraping
export interface AvailabilityScraper extends BaseScraper {
  availableDomSelector: string;
}

// Combined interface for all selectors
export interface FullScraper
  extends PriceScraper,
    StockScraper,
    AvailabilityScraper {}

// Maintain backward compatibility by making Scraper an alias of FullScraper
export type Scraper = FullScraper;

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
