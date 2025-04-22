// @ts-nocheck
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import ProductScrapedList from '@screens/ScrapedProducts/List/ScrapedProductsListScreen';
import ConfigServer from '@screens/ConfigServer/ConfigServer';
import ListScreen from '@screens/Lists/ListScreen';
import CategoriesScreen from '@screens/Categories/CategoriesScreen';
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
        name={SCREEN_NAMES.LISTS}
        options={{headerShown: false}}
        component={ListScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CATEGORIES}
        options={{headerShown: false}}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PRODUCT_DETAIL}
        options={{title: t('scrapedProducts.productDetail')}}
        component={ProductDetailTabNavigation}
      />
    </Stack.Navigator>
  );
}
