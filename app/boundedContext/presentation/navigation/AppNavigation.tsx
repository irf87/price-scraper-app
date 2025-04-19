// @ts-nocheck
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import ProductScrapedList from '@screens/ScrapedProducts/ScrapedProductsListScreen';
import ConfigServer from '@screens/ConfigServer/ConfigServer';
import ListScreen from '@screens/Lists/ListScreen';
import CategoriesScreen from '@screens/Categories/CategoriesScreen';

import ProductDetailTabNavigation from '@navigation/ProductDetailTabNavigation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator initialRouteName="ConfigServer">
      <Stack.Screen
        name="ConfigServer"
        options={{title: t('navigation.server')}}
        component={ConfigServer}
      />
      <Stack.Screen
        name="ProductScrapedList"
        options={{headerShown: false}}
        component={ProductScrapedList}
      />
      <Stack.Screen
        name="Lists"
        options={{headerShown: false}}
        component={ListScreen}
      />
      <Stack.Screen
        name="Categories"
        options={{headerShown: false}}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{title: t('scrapedProducts.productDetail')}}
        component={ProductDetailTabNavigation}
      />
    </Stack.Navigator>
  );
}
