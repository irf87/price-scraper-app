import React, {useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import useVirtualizedList from '@hooks/useVirtualizedList';

import ProductItem from './ProductScrapedItem';

interface Props {
  productsScrapedList: ScrapedProduct[];
  onPressProduct: (scrapedProduct: ScrapedProduct) => void;
  onRefetch: () => void;
  refreshing?: boolean;
  onScroll?: (isScrollingDown: boolean) => void;
}

function ProductsScrapedList({
  productsScrapedList,
  onPressProduct,
  onRefetch,
  refreshing = false,
  onScroll,
}: Props) {
  const {listProps} = useVirtualizedList();
  const [lastScrollY, setLastScrollY] = useState(0);

  const renderItem = useCallback(
    ({item}: {item: ScrapedProduct}) => (
      <ProductItem scrapedProduct={item} onPress={() => onPressProduct(item)} />
    ),
    [onPressProduct],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScroll) {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const isScrollingDown = currentScrollY > lastScrollY;
        onScroll(isScrollingDown);
        setLastScrollY(currentScrollY);
      }
    },
    [lastScrollY, onScroll],
  );

  return (
    <FlatList
      data={productsScrapedList}
      renderItem={renderItem}
      keyExtractor={item => item.productScrapedId.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
      }
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      {...listProps}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default ProductsScrapedList;
