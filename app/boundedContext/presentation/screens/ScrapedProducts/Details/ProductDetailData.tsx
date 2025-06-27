import React from 'react';
import {ActivityIndicator} from 'react-native';
import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';

import {StackScreenProductDetailProps} from '@navigation/navigationTypes';

import {useScrapedProductRecord} from '@domains/scrapedProductsRecord/application/useScrapedProductRecord';
import ProductScrapedDetail from '@domains/scrapedProducts/presentation/ScrapedProductDetail/ProductScrapedDetail';

interface Props extends StackScreenProductDetailProps<'ProductDetailData'> {}

function ProductDetailData({route}: Props) {
  const productParams = route.params;
  const {scrapedProductRecordsState, scrapedProductRecords} =
    useScrapedProductRecord(productParams?.productScrapedId);
  return (
    <ScreenLayout showHeader={false}>
      {scrapedProductRecordsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      {scrapedProductRecords && (
        <ProductScrapedDetail
          productDetail={productParams}
          productScrapedRecord={scrapedProductRecords}
        />
      )}
    </ScreenLayout>
  );
}

export default ProductDetailData;
