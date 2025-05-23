import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';

import {StackScreenProductDetailProps} from '@navigation/navigationTypes';

import {useScrapedProductRecord} from '@domains/scrapedProductsRecord/application/useScrapedProductRecord';
import ProductScrapedDetail from '@domains/scrapedProducts/presentation/ScrapedProductDetail/ProductScrapedDetail';

interface Props extends StackScreenProductDetailProps<'ProductDetailData'> {}

function ProductDetailData({route}: Props) {
  const productParams = route.params;
  const {scrapedProductRecordsState, scrapedProductRecords} =
    useScrapedProductRecord(productParams?.productScrapedId);
  return (
    <SafeAreaView>
      {scrapedProductRecordsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      {scrapedProductRecords && (
        <ProductScrapedDetail
          productDetail={productParams}
          productScrapedRecord={scrapedProductRecords}
        />
      )}
    </SafeAreaView>
  );
}

export default ProductDetailData;
