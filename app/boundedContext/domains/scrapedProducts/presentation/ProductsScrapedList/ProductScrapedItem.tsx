import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {Animated} from 'react-native';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

import ProductRow from '@design-system/molecules/rows/productRow/ProductRow';

interface ProductItemProps {
  scrapedProduct: ScrapedProduct;
  onPress: () => void;
}

function ProductItem({scrapedProduct, onPress}: ProductItemProps) {
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
          urlImg={scrapedProduct.urlImg}
          name={scrapedProduct.name}
          urlScrapedDomainName={scrapedProduct.urlScrapedDomainName || ''}
          price={scrapedProduct.price.toString()}
        />
      </Animated.View>
    </TouchableRipple>
  );
}

export default ProductItem;
