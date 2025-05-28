import React, {useMemo} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useProductSearch} from '@domains/products/application/useProductSearch';
import {productsItemAdapter} from '@domains/products/application/productsItemAdapter';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';
import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';

import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';

import {SCREEN_NAMES} from '@screens/screenTypes';

const ProductsScreen = () => {
  const {t} = useTranslation();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    productState,
    refetchProducts,
  } = useProductSearch();
  const {isOpen, toggleDrawer, spin} = useDrawer();

  function handleOnPressItem(item: ItemProps) {
    navigate(SCREEN_NAMES.ITEM_DETAIL, {
      queryFunction: 'getScrapedProductByProductId',
      item,
      screenTitle: t('navigation.products'),
    });
  }

  const adaptedItems = useMemo(() => {
    return productsItemAdapter(searchResults);
  }, [searchResults]);

  return (
    <ScreenLayout
      showHeader
      headerTitle={t('navigation.products')}
      onToggleDrawer={toggleDrawer}
      spin={spin}>
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      <ScreenLayout.SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={`${t('search.placeholder')} ${t(
          'navigation.products',
        ).toLowerCase()} ...`}
      />

      {productState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <VirtualizedItemList
        items={adaptedItems}
        onPressItem={handleOnPressItem}
        onRefetch={refetchProducts}
        refreshing={productState.isFetching}
      />
    </ScreenLayout>
  );
};

export default ProductsScreen;
