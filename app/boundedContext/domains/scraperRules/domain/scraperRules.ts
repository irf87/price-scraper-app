export interface ScraperRule {
  id: number;
  productScrapedId: number;
  match: string;
  notifyWhenIsAvailable: number;
  notifyPriceMoreEqualThan?: number | null;
  notifyPriceSmallerEqualThan?: number | null;
  notifyStockChanges: number;
  notifyPriceChanges: number;
  notifyAvailabilityChanges: number;
  notifyMatchDate?: string | null;
  notifyAvailabilityChangesDate?: string | null;
  notifyWhenIsAvailableDate?: string | null;
  notifyPriceMoreEqualThanDate?: string | null;
  notifyPriceSmallerEqualThanDate?: string | null;
  notifyStockChangesDate?: string | null;
  notifyPriceChangesDate?: string | null;
}
