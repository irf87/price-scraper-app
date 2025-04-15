import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from 'boundedContext/presentation/navigation';
import {ProductScrapedFormated} from 'boundedContext/products/application/useProducts';
import {useProductsScraped} from 'boundedContext/products/application/useProducts';

import ProductsScrapedList from '@components/products/ProductsScrapedList/ProductsScrapedList';

function Main() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {productsScrapedState, productsScraped, refetchProductScraped} =
    useProductsScraped();

  function handleOnPressProduct(productScraped: ProductScrapedFormated) {
    navigate('ProductDetail', productScraped);
    // navigate('ProductDetail');
  }

  return (
    <SafeAreaView>
      {productsScrapedState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      <ProductsScrapedList
        onPressProduct={handleOnPressProduct}
        onRefetch={refetchProductScraped}
        productsScrapedList={productsScraped || []}
      />
    </SafeAreaView>
  );
}

export default Main;
