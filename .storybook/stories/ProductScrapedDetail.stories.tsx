import type {Meta, StoryObj} from '@storybook/react';

import ProductScrapedDetail from '@domains/scrapedProducts/presentation/ScrapedProductDetail/ProductScrapedDetail';

const meta = {
  title: '@domains/scrapedProducts/ScrapedProductDetail',
  component: ProductScrapedDetail,
} satisfies Meta<typeof ProductScrapedDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    productDetail: {
      urlToScrape: 'https://www.amazon.com.mx/',
      price: '$5,350.00',
      description: 'Esto es la descripción del producto',
      name: 'El producto estrella',
      urlImg: 'https://uneg.edu.mx/wp-content/uploads/2023/04/P9-min.jpg',
      date: '31 Marzo 2024, 13:00',
      urlScrapedDomainName: 'Mercado libre'
    },
    productScrapedRecord: {
      minPrice: '$5,000.00',
      maxPrice: '$6,000.00',
      avgPrice: '$5,500.00',
      lastDateSync: '31 Marzo 2024, 13:00',
      records: [],
    },
  },
};