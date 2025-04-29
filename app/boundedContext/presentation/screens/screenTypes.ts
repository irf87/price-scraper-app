export const SCREEN_NAMES = {
  CONFIG_SERVER: 'ConfigServer',
  PRODUCT_SCRAPED_LIST: 'ProductScrapedList',
  LISTS: 'Lists',
  CATEGORIES: 'Categories',
  PRODUCT_DETAIL: 'ProductDetail',
  PRODUCTS: 'Products',
  ITEM_DETAIL: 'ItemDetail',
  ITEM: 'Item',
} as const;

export const SCRAPED_PRODUCT_DETAIL_SCREEN = {
  PRODUCT_DETAIL_DATA: 'ProductDetailData',
  PRODUCT_DETAIL_REPORT: 'ProductDetailReport',
  SCRAPER_PRODUCT_SETTINGS: 'ScrapedProductSettings',
} as const;

export type ScreenNames = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
export type ScrapedProductDetailScreenNames =
  (typeof SCRAPED_PRODUCT_DETAIL_SCREEN)[keyof typeof SCRAPED_PRODUCT_DETAIL_SCREEN];
