import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useProductsList} from '@domains/products/application/useProducts';
import {productsItemAdapter} from '@domains/products/application/productsItemAdapter';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navagation/navigationHeader/NavigationHeader';
import ItemList from '@design-system/molecules/list/itemList/ItemList';

const ProductsScreen = () => {
  const {productState, products, refetchProducts} = useProductsList();
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const {t} = useTranslation();

  function handleOnPressItem(itemId: string | number) {
    console.log(`go to ${itemId}`);
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

      <View>
        <ItemList
          items={productsItemAdapter(products)}
          onPressItem={handleOnPressItem}
          onRefetch={refetchProducts}
        />
      </View>
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
