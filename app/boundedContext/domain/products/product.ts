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
  if (!url) {
    return '';
  }
  const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
  const match = regex.exec(url);

  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
};
