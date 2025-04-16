// @ts-nocheck
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductList from '@screens/Products/List/ProductList';
import ConfigServer from '@screens/ConfigServer/ConfigServer';

import ProductDetailTabNavigation from '@navigation/ProductDetailTabNavigation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="ConfigServer">
      <Stack.Screen
        name="ConfigServer"
        options={{title: 'Servidor'}}
        component={ConfigServer}
      />
      <Stack.Screen
        name="ProductList"
        options={{title: 'Productos activos'}}
        component={ProductList}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{title: 'Detalle del producto'}}
        component={ProductDetailTabNavigation}
      />
    </Stack.Navigator>
  );
}
