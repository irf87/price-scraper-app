import { StackScreenProps, ProductDetailStackPramList } from 'boundedContext/presentation/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductDetailData from '@screens/Products/ProductDetail/ProductDetailData';
import ProductDetailReport from '@screens/Products/ProductDetail/ProductDetailReport';

const Tab = createBottomTabNavigator<ProductDetailStackPramList>();

interface Props extends StackScreenProps<'ProductDetail'> {}

function ProductDetailTabNavigation({ route }: Props) {
  const productParams = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen 
        initialParams={productParams}
        name="ProductDetailData"
        options={{
          title: 'Detalle',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
        }} 
        component={ProductDetailData}
      />
      <Tab.Screen
        name="ProductDetailReport"
        options={{
          title: 'Tendencia',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-areaspline" color={color} size={size} />
          ),
        }}
        component={ProductDetailReport} />
    </Tab.Navigator>
  );
}

export default ProductDetailTabNavigation;
