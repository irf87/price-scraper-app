import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useProductsList} from '@domains/products/application/useProducts';
import {productsItemAdapter} from '@domains/products/application/productsItemAdapter';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navagation/navigationHeader/NavigationHeader';
import ItemList, {
  ItemProps,
} from '@design-system/molecules/list/itemList/ItemList';

import {SCREEN_NAMES} from '@screens/screenTypes';

const ProductsScreen = () => {
  const {t} = useTranslation();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {productState, products, refetchProducts} = useProductsList();
  const {isOpen, toggleDrawer, spin} = useDrawer();

  function handleOnPressItem(item: ItemProps) {
    navigate(SCREEN_NAMES.ITEM_DETAIL, {
      queryFunction: 'getScrapedProductByProductId',
      item,
      screenTitle: t('navigation.products'),
    });
  }
  return (
    <View style={styles.container}>
      <NavigationHeader
        title={t('navigation.products')}
        toggleDrawer={toggleDrawer}
        spin={spin}
      />

      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
      {productState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      <ItemList
        items={productsItemAdapter(products)}
        onPressItem={handleOnPressItem}
        onRefetch={refetchProducts}
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
});

export default ProductsScreen;
