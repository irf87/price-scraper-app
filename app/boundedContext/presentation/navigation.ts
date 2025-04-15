import { RouteProp, ParamListBase } from '@react-navigation/native';

import { ProductScrapedFormated } from 'boundedContext/products/application/useProducts';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Main: undefined;
  ConfigServer: undefined;
  ProductDetail: ProductScrapedFormated;
};

export type ProductDetailStackPramList = {
  ProductDetailData: ProductScrapedFormated;
  ProductDetailReport: undefined;
}

export type NavigationRoute<T extends string> = RouteProp<ParamListBase, T>;

export type StackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;
export type StackScreenProductDetailProps<T extends keyof ProductDetailStackPramList> = NativeStackScreenProps<ProductDetailStackPramList, T>;

