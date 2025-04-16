import {RouteProp, ParamListBase} from '@react-navigation/native';

import {ProductScrapedFormatted} from '@domains/products/application/useProducts';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamList = {
  ConfigServer: undefined;
  ProductDetail: ProductScrapedFormatted;
  ProductList: undefined;
  Lists: undefined;
  Categories: undefined;
};

export type ProductDetailStackPramList = {
  ProductDetailData: ProductScrapedFormatted;
  ProductDetailReport: undefined;
};

export type NavigationRoute<T extends string> = RouteProp<ParamListBase, T>;

export type StackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
export type StackScreenProductDetailProps<
  T extends keyof ProductDetailStackPramList,
> = NativeStackScreenProps<ProductDetailStackPramList, T>;
