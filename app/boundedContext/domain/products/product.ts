export interface Product {
  id: number;
  name: string;
  description?: string;
  urlInfo?: string;
  urlImg?: string;
}

export interface ProductScraped extends Product {
  productScrapedId: number;
  urlToScrape: string;
  price: number | string;
  date: string;
}

export const getDomain = (url?: string) => {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error('Error al analizar la URL:', error);
    return '';
  }
}