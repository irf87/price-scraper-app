import React from 'react';

import {ScrollView, RefreshControl} from 'react-native';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

import ProductItem from './ProductScrapedItem';

interface Props {
  productsScrapedList: ScrapedProduct[];
  onPressProduct: (scrapedProduct: ScrapedProduct) => void;
  onRefetch: () => void;
}

function ProductsScrapedList({
  productsScrapedList,
  onPressProduct,
  onRefetch,
}: Props) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefetch} />
      }>
      {productsScrapedList.map(scrapedProduct => (
        <ProductItem
          key={scrapedProduct.productScrapedId}
          scrapedProduct={scrapedProduct}
          onPress={() => onPressProduct(scrapedProduct)}
        />
      ))}
    </ScrollView>
  );
}

export default ProductsScrapedList;
