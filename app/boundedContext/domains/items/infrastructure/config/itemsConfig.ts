/**
 * Configuration constants for the items domain
 * These constants are used across the items domain for React Query configuration
 */

export const ITEMS_QUERY_KEYS = {
  LIST: 'items-list',
  CATEGORY: 'items-category',
} as const;

export const ITEMS_CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day in milliseconds

export type ItemType = (typeof ITEMS_QUERY_KEYS)[keyof typeof ITEMS_QUERY_KEYS];
