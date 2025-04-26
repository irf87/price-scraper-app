import {RouteProp, ParamListBase} from '@react-navigation/native';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ItemDetailScreenProps} from '@screens/ItemDetailScreen/ScreenProps';

export type AppStackParamList = {
  ConfigServer: undefined;
  ProductDetail: ScrapedProduct;
  ProductScrapedList: {queryFunction: QueryProductScrapedFunction};
  Lists: undefined;
  Categories: undefined;
  Products: undefined;
  ItemDetail: ItemDetailScreenProps;
};

export type ProductDetailStackPramList = {
  ProductDetailData: ScrapedProduct;
  ProductDetailReport: undefined;
  ScrapedProductSettings: {
    scrapedId: number;
    enable: boolean;
    urlToScrape: string;
  };
};

export type NavigationRoute<T extends string> = RouteProp<ParamListBase, T>;

export type StackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
export type StackScreenProductDetailProps<
  T extends keyof ProductDetailStackPramList,
> = NativeStackScreenProps<ProductDetailStackPramList, T>;
