import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ProductScrapedFormatted} from '@domains/products/application/useProducts';
import {useProductsScraped} from '@domains/products/application/useProducts';

import ProductsScrapedList from '@domains/products/presentation/ProductsScrapedList/ProductsScrapedList';

function ProductList() {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {productsScrapedState, productsScraped, refetchProductScraped} =
    useProductsScraped();

  function handleOnPressProduct(productScraped: ProductScrapedFormatted) {
    navigate('ProductDetail', productScraped);
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

export default ProductList;
