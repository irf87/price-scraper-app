import React from 'react';
import {
  StackScreenProps,
  ProductDetailStackPramList,
} from '@navigation/navigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductDetailData from '@screens/Products/ProductDetail/ProductDetailData';
import ProductDetailReport from '@screens/Products/ProductDetail/ProductDetailReport';
import ProductScrapperSettings from '@screens/Products/ProductDetail/ProductScrapperSettings';

const Tab = createBottomTabNavigator<ProductDetailStackPramList>();

interface Props extends StackScreenProps<'ProductDetail'> {}

function ProductDetailTabNavigation({route}: Props) {
  const productParams = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        initialParams={productParams}
        name="ProductDetailData"
        options={{
          title: 'Detalle',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }}
        component={ProductDetailData}
      />
      <Tab.Screen
        name="ProductDetailReport"
        options={{
          title: 'Tendencia',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={size}
            />
          ),
        }}
        component={ProductDetailReport}
      />
      <Tab.Screen
        initialParams={productParams}
        name="ScrapperProductoSetting"
        options={{
          title: 'Configuración',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
        component={ProductScrapperSettings}
      />
    </Tab.Navigator>
  );
}

export default ProductDetailTabNavigation;
