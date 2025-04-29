import {Item} from '@domains/items/domain/item';
import {normalizeString} from '@utils/strings/normalizeStrings';

export const searchItems = (items: Item[], searchTerm: string): Item[] => {
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
