import { StackScreenProductDetailProps } from '@domain/navigation';

import {  SafeAreaView, ActivityIndicator } from 'react-native';

import { useProductScrapedRecords } from '@application/products/useProductsRecords';

import ProductScrapedDetail from '@components/products/ProductScrapedDetail/ProductScrapedDetail';

interface Props extends StackScreenProductDetailProps<'ProductDetailData'> {}

function ProductDetailData({ route }: Props) {
  const productParams = route.params;
  const { productScrapedRecordsState, productScrapedRecords} = useProductScrapedRecords(productParams?.productScrapedId);

  return (
    <SafeAreaView style={{ padding: 16 }}>
      { productScrapedRecordsState.isFetching && <ActivityIndicator style={{paddingTop: 24}} color="black" />}
      {productScrapedRecords && <ProductScrapedDetail productDetail={productParams} productScrapedRecord={productScrapedRecords} />}
    </SafeAreaView>
  )
}

export default ProductDetailData;
