import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {useDrawer} from '@hooks/useDrawer';

import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navagation/navigationHeader/NavigationHeader';

import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

import {SCREEN_NAMES} from '@screens/screenTypes';

interface Props {
  route: {params: {queryFunction: QueryProductScrapedFunction}};
}

function ScrapedProductsListScreen({route}: Props) {
  const {queryFunction} = route.params;
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {
    data: productsScraped,
    isFetching,
    refetch: refetchProductScraped,
  } = useProductsScrapedList({queryFunction});
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const theme = useTheme();
  const {t} = useTranslation();

  function handleOnPressProduct(productScraped: ScrapedProduct) {
    navigate(SCREEN_NAMES.PRODUCT_DETAIL, productScraped);
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <NavigationHeader
        title={t('scrapedProducts.activeProducts')}
        toggleDrawer={toggleDrawer}
        spin={spin}
      />

      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      {isFetching && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScrapedProductsListScreen;
