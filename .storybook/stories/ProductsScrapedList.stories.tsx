import type {Meta, StoryObj} from '@storybook/react';

import ProductList from '@domains/products/presentation/ProductsScrapedList/ProductsScrapedList';

const defaultArray = [
  {
		"id": 1,
		"productScrapedId": 1,
		"name": "SSD Kingston NV1 NVMe, 250GB, PCI Express 3.0, M.2",
		"description": "El disco SSD PCIe NVMe NV1 de Kingston es un solución para el almacenamiento sustancial que ofrece velocidades de lectura / escritura de hasta 2.100 / 1.700 MB/s, que entre triplica y cuadriplica la de los discos SSD basados en SATA, y es 35 veces más rápida que un disco duro tradicional. NV1 consume menos electricidad, genera menos calor y su tiempo de arranque es más rápido.",
		"urlInfo": "https://www.kingston.com/latam/ssd/nv1-nvme-pcie-ssd",
		"urlImg": "https://m.media-amazon.com/images/I/71rTa0S8xDS._AC_SX679_.jpg",
		"urlToScrape": "https://www.cyberpuerta.mx/Computo-Hardware/Discos-Duros-SSD-NAS/SSD/SSD-Kingston-NV1-NVMe-250GB-PCI-Express-3-0-M-2.html",
		"urlScrapedDomainName": "cyberpuerta",
		"enable": 0,
		"updateAt": "",
		"lastDateSync": null,
		"price": '$300.00',
		"date": "2024-03-27T20:31:08.245Z",
	},
	{
		"id": 2,
		"productScrapedId": 2,
		"name": "SSD Acer SA100, 120GB, SATA III, 2.5",
		"description": "Disco de estado solido de la marca ACER.",
		"urlInfo": "",
		"urlImg": "https://http2.mlstatic.com/D_NQ_NP_679585-MLM47205912693_082021-O.webp",
		"urlToScrape": "https://www.cyberpuerta.mx/Computo-Hardware/Discos-Duros-SSD-NAS/SSD/SSD-Acer-SA100-120GB-SATA-III-2-5.html",
		"urlScrapedDomainName": "cyberpuerta",
		"enable": 0,
		"updateAt": "",
		"lastDateSync": null,
		"price": '$300.00',
		"date": "2024-03-27T20:31:08.245Z",
	},
	{
		"id": 3,
		"productScrapedId": 3,
		"name": "iPhone 12 6.1 pulgadas, 128gb",
		"description": "El chip A14 Bionic, el más rápido en un smartphone. Una pantalla OLED de borde a borde. Un nuevo frente de Ceramic Shield, cuatro veces más resistente a las caídas. Además, ahora el modo Noche viene en todas las cámaras. El iPhone 12 lo tiene todo.",
		"urlInfo": "https://www.apple.com/mx/shop/buy-iphone/iphone-12",
		"urlImg": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1617130317000",
		"urlToScrape": "https://www.apple.com/mx/shop/buy-iphone/iphone-12",
		"urlScrapedDomainName": "apple",
		"enable": 0,
		"updateAt": "",
		"lastDateSync": null,
		"price": '$300.00',
		"date": "2024-03-27T20:31:08.245Z",
	},
];

const meta = {
  title: '@components/List/ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    productsScrapedList: defaultArray,
    onPressProduct: () => {},
  },
};