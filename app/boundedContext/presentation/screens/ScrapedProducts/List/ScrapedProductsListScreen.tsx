import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {useTheme, AnimatedFAB} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {useDrawer} from '@hooks/useDrawer';

import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navigation/navigationHeader/NavigationHeader';
import CreateScraperModal from '@domains/scraper/presentation/CreateScraperModal';
import SnackbarInternal from '@components/SnackbarInternal/SnackbarInternal';

import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

import {SCREEN_NAMES} from '@screens/screenTypes';

interface Props {
  route: {params: {queryFunction: QueryProductScrapedFunction}};
}

function ScrapedProductsListScreen({route}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {queryFunction} = route.params;

  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {
    data: productsScraped,
    isFetching,
    refetch: refetchProductScraped,
  } = useProductsScrapedList({queryFunction});
  const {isOpen, toggleDrawer, spin} = useDrawer();

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleOnPressProduct(productScraped: ScrapedProduct) {
    navigate(SCREEN_NAMES.PRODUCT_DETAIL, productScraped);
  }

  const handleCreatePress = () => {
    setShowModal(true);
  };

  const handleScroll = (scrollingDown: boolean) => {
    setIsScrollingDown(scrollingDown);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <NavigationHeader
        title={t('scrapedProducts.activeScrappers')}
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
        onScroll={handleScroll}
      />
      <AnimatedFAB
        icon="plus"
        label={t('common.create')}
        onPress={handleCreatePress}
        style={styles.fab}
        color={theme.colors.primary}
        extended={!isScrollingDown}
      />
      <CreateScraperModal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
      />
      <SnackbarInternal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});

export default ScrapedProductsListScreen;
