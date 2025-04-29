/**
 * Normalizes a string by removing accents and converting to lowercase
 * @param str The string to normalize
 * @returns The normalized string
 */
export const normalizeString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};
