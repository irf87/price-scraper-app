import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import ItemSectionWrapper from '@design-system/molecules//sections/itemSectionWrapper/ItemSectionWrapper';
import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';

import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

import {SCREEN_NAMES} from '@screens/screenTypes';
import {ItemDetailScreenProps} from './ScreenProps';

interface Props {
  route: {params: ItemDetailScreenProps};
}

const ItemDetailScreen = ({route}: Props) => {
  const {queryFunction, item} = route.params;

  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const {
    data,
    isFetching,
    refetch: refetchProductScraped,
  } = useProductsScrapedList({queryFunction, id: Number(item.id)});

  function handleOnPressProduct(productScraped: ScrapedProduct) {
    navigate(SCREEN_NAMES.PRODUCT_DETAIL, productScraped);
  }

  return (
    <View style={styles.container}>
      {isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <ItemSectionWrapper
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}>
        <ProductsScrapedList
          onPressProduct={handleOnPressProduct}
          onRefetch={refetchProductScraped}
          productsScrapedList={data || []}
          refreshing={isFetching}
        />
      </ItemSectionWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemDetailScreen;
