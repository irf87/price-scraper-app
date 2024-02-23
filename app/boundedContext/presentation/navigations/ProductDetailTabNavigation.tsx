import { StackScreenProps, ProductDetailStackPramList } from '@domain/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProductDetailData from '@screens/Products/ProductDetail/ProductDetailData';
import ProductDetailReport from '@screens/Products/ProductDetail/ProductDetailReport';

const Tab = createBottomTabNavigator<ProductDetailStackPramList>();

interface Props extends StackScreenProps<'ProductDetail'> {}

function ProductDetailTabNavigation({ route }: Props) {
  const productParams = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen initialParams={productParams} name="ProductDetailData" options={{ title: 'Descripción'}} component={ProductDetailData} />
      <Tab.Screen name="ProductDetailReport" options={{ title: 'Tendencia'}} component={ProductDetailReport} />
    </Tab.Navigator>
  );
}

export default ProductDetailTabNavigation;
