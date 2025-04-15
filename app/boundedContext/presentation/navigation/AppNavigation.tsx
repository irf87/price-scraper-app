// @ts-nocheck
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationRoute} from '@navigation/AppNavigation';

import Main from '@screens/Main';
import ConfigServer from '@screens/ConfigServer/ConfigServer';
// import ProductDetail from '@screens/Products/ProductDetail';
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
        name="Main"
        options={{title: 'Productos activos'}}
        component={Main}
      />
      <Stack.Screen
        name="ProductDetail"
        options={({route}: {route: NavigationRoute<'ProductDetail'>}) => ({
          title: route?.params?.name || 'Detalle del producto',
        })}
        component={ProductDetailTabNavigation}
      />
    </Stack.Navigator>
  );
}
