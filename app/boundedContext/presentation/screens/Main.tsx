import { ActivityIndicator, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppStackParamList } from '@domain/navigation';
import { ProductScrapedFormated } from '@application/products/useProducts';
import { useProductsScraped } from '@application/products/useProducts';

import ProductsScrapedList from '@components/products/ProductsScrapedList/ProductsScrapedList';


function Main () {
  const { navigate } = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { productsScrapedState, productsScraped } = useProductsScraped();

  function handleOnPressProduct(productScraped: ProductScrapedFormated) {
    navigate('ProductDetail', productScraped);
    // navigate('ProductDetail');
  }

  return (
    <SafeAreaView>
      { productsScrapedState.isFetching && <ActivityIndicator style={{paddingTop: 24}} color="black" />}
      <ProductsScrapedList onPressProduct={handleOnPressProduct} productsScrapedList={productsScraped || []} />
    </SafeAreaView>
  )
}

export default Main;