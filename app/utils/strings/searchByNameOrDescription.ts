import {normalizeString} from '@utils/strings/normalizeStrings';

interface Searchable {
  name?: string;
  description?: string;
}

/**
 * Generic search function for objects with name and description
 * @param items The list of items to search in
 * @param searchTerm The term to search for
 * @returns The filtered list of items
 */
export const searchByNameOrDescription = <T extends Searchable>(
  items: T[],
  searchTerm: string,
): T[] => {
  if (!searchTerm.trim()) {
    return items;
  }

  const normalizedSearchTerm = normalizeString(searchTerm);

  return items.filter(item => {
    const normalizedName = normalizeString(item.name || '');
    const normalizedDescription = normalizeString(item.description || '');

    return (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedDescription.includes(normalizedSearchTerm)
    );
  });
};
