import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import useVirtualizedList from '@hooks/useVirtualizedList';

import ProductItem from './ProductScrapedItem';

interface Props {
  productsScrapedList: ScrapedProduct[];
  onPressProduct: (scrapedProduct: ScrapedProduct) => void;
  onRefetch: () => void;
  refreshing?: boolean;
}

function ProductsScrapedList({
  productsScrapedList,
  onPressProduct,
  onRefetch,
  refreshing = false,
}: Props) {
  const {listProps} = useVirtualizedList();

  const renderItem = useCallback(
    ({item}: {item: ScrapedProduct}) => (
      <ProductItem scrapedProduct={item} onPress={() => onPressProduct(item)} />
    ),
    [onPressProduct],
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
