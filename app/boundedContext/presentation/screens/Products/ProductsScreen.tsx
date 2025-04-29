import React, {useMemo} from 'react';
import {View, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useProductSearch} from '@domains/products/application/useProductSearch';
import {productsItemAdapter} from '@domains/products/application/productsItemAdapter';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navigation/navigationHeader/NavigationHeader';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';
import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';

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
    <View style={styles.container}>
      <NavigationHeader
        title={t('navigation.products')}
        toggleDrawer={toggleDrawer}
        spin={spin}
      />

      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      {productState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      <VirtualizedItemList
        items={adaptedItems}
        onPressItem={handleOnPressItem}
        onRefetch={refetchProducts}
        refreshing={productState.isFetching}
      />
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
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
  },
});

export default ProductsScreen;
