import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {ScrollView, RefreshControl, Animated} from 'react-native';

import {ProductScrapedFormatted} from '@domains/products/application/useProducts';

import ProductRow from '@design-system/molecules/rows/productRow/ProductRow';

interface Props {
  productsScrapedList: ProductScrapedFormatted[];
  onPressProduct: (productScrapedFormatted: ProductScrapedFormatted) => void;
  onRefetch: () => void;
}

interface ProductItemProps {
  product: ProductScrapedFormatted;
  onPress: () => void;
}

function ProductItem({product, onPress}: ProductItemProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableRipple
      rippleColor="rgba(0, 0, 0, .12)"
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <ProductRow
          urlImg={product.urlImg}
          name={product.name}
          urlScrapedDomainName={product.urlScrapedDomainName || ''}
          price={product.price.toString()}
        />
      </Animated.View>
    </TouchableRipple>
  );
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
        <ProductItem
          key={productScraped.productScrapedId}
          product={productScraped}
          onPress={() => onPressProduct(productScraped)}
        />
      ))}
    </ScrollView>
  );
}

export default ProductsScrapedList;
