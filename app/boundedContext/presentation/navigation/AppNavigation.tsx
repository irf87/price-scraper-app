// @ts-nocheck
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import ProductScrapedList from '@screens/ScrapedProducts/List/ScrapedProductsListScreen';
import ConfigServer from '@screens/ConfigServer/ConfigServer';

import ProductsScreen from '@screens/Products/ProductsScreen';
import ItemDetailScreen from '@screens/ItemDetailScreen/ItemDetailScreen';
import Items from '@screens/Items/ItemsScreen';

import {SCREEN_NAMES} from '@screens/screenTypes';

import ProductDetailTabNavigation from '@navigation/ProductDetailTabNavigation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName={SCREEN_NAMES.CONFIG_SERVER}>
      <Stack.Screen
        name={SCREEN_NAMES.CONFIG_SERVER}
        options={{title: t('navigation.server')}}
        component={ConfigServer}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PRODUCT_SCRAPED_LIST}
        options={{headerShown: false}}
        component={ProductScrapedList}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PRODUCT_DETAIL}
        options={{title: t('scrapedProducts.productDetail')}}
        component={ProductDetailTabNavigation}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PRODUCTS}
        options={{headerShown: false}}
        component={ProductsScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ITEM_DETAIL}
        options={({route}: {route: NavigationRoute<'ItemDetail'>}) => ({
          title: route?.params?.screenTitle,
        })}
        component={ItemDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ITEM}
        options={{headerShown: false}}
        component={Items}
      />
    </Stack.Navigator>
  );
}
