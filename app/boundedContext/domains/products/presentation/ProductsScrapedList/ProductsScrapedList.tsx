import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {ScrollView, RefreshControl} from 'react-native';

import {ProductScrapedFormatted} from '@domains/products/application/useProducts';

import ProductRow from '@design-system/molecules/rows/productRow/ProductRow';

interface Props {
  productsScrapedList: ProductScrapedFormatted[];
  onPressProduct: (productScrapedFormatted: ProductScrapedFormatted) => void;
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
      {productsScrapedList.map(productScraped => (
        <TouchableRipple
          key={productScraped.productScrapedId}
          rippleColor="rgba(0, 0, 0, .12)"
          onPress={() => onPressProduct(productScraped)}>
          <ProductRow
            urlImg={productScraped.urlImg}
            name={productScraped.name}
            urlScrapedDomainName={productScraped.urlScrapedDomainName || ''}
            price={productScraped.price.toString()}
          />
        </TouchableRipple>
      ))}
    </ScrollView>
  );
}

export default ProductsScrapedList;
