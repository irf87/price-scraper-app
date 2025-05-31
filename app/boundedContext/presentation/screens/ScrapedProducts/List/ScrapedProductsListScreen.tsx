import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {useDrawer} from '@hooks/useDrawer';
import {useProductsPrefetch} from '@domains/products/application/useProductsPrefetch';
import {useItemPrefetch} from '@domains/items/application/hooks/useItemPrefetch';

import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';
import Drawer from '@components/Drawer/Drawer';
import CreateScraperModal from '@domains/scraper/presentation/CreateScraperModal';
import FloatingButton from '@design-system/atoms/buttons/floatingButton/FloatingButton';
import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';

import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

import {SCREEN_NAMES} from '@screens/screenTypes';

interface Props {
  route: {params: {queryFunction: QueryProductScrapedFunction}};
}

function ScrapedProductsListScreen({route}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {queryFunction} = route.params;
  const {prefetchProducts} = useProductsPrefetch();
  const {prefetchItems} = useItemPrefetch();

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

  useEffect(() => {
    prefetchProducts();
  }, [prefetchProducts]);

  useEffect(() => {
    if (isOpen) {
      prefetchItems();
    }
  }, [isOpen, prefetchItems]);

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
    <ScreenLayout
      showHeader
      headerTitle={t('scrapedProducts.activeScrappers')}
      onToggleDrawer={toggleDrawer}
      spin={spin}
      backgroundColor={theme.colors.background}>
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
      <FloatingButton
        icon="plus"
        label={t('common.create')}
        onPress={handleCreatePress}
        extended={!isScrollingDown}
      />
      <CreateScraperModal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
      />
    </ScreenLayout>
  );
}

export default ScrapedProductsListScreen;
