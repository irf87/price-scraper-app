import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';

import {StackScreenProductDetailProps} from '@navigation/navigationTypes';

import {useProductScrapedRecords} from '@domains/products/application/useProductsRecords';

import ProductScrapedDetail from '@domains/products/presentation/ProductScrapedDetail/ProductScrapedDetail';

interface Props extends StackScreenProductDetailProps<'ProductDetailData'> {}

function ProductDetailData({route}: Props) {
  const productParams = route.params;
  const {productScrapedRecordsState, productScrapedRecords} =
    useProductScrapedRecords(productParams?.productScrapedId);

  return (
    <SafeAreaView style={{padding: 16}}>
      {productScrapedRecordsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      {productScrapedRecords && (
        <ProductScrapedDetail
          productDetail={productParams}
          productScrapedRecord={productScrapedRecords}
        />
      )}
    </SafeAreaView>
  );
}

export default ProductDetailData;
