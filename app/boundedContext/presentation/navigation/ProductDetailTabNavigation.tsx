import React from 'react';
import {
  StackScreenProps,
  ProductDetailStackPramList,
} from '@navigation/navigationTypes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import ProductDetailData from '@screens/ScrapedProducts/Details/ProductDetailData';
import ProductDetailReport from '@screens/ScrapedProducts/Chart/ProductDetailReport';
import ProductScrapperSettings from '@screens/ScrapedProducts/Settings/ProductScrapperSettings';

import {SCRAPED_PRODUCT_DETAIL_SCREEN} from '@screens/screenTypes';

const Tab = createBottomTabNavigator<ProductDetailStackPramList>();

interface Props extends StackScreenProps<'ProductDetail'> {}

const DetailIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="shopping" color={color} size={size} />
);

const TrendIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="chart-areaspline" color={color} size={size} />
);

const SettingsIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="cog" color={color} size={size} />
);

function ProductDetailTabNavigation({route}: Props) {
  const {t} = useTranslation();
  const productParams = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        initialParams={productParams}
        name={SCRAPED_PRODUCT_DETAIL_SCREEN.PRODUCT_DETAIL_DATA}
        options={{
          title: t('scrapedProducts.screens.detail'),
          tabBarIcon: DetailIcon,
        }}
        component={ProductDetailData}
      />
      <Tab.Screen
        name={SCRAPED_PRODUCT_DETAIL_SCREEN.PRODUCT_DETAIL_REPORT}
        options={{
          title: t('scrapedProducts.screens.trend'),
          tabBarIcon: TrendIcon,
        }}
        component={ProductDetailReport}
      />
      <Tab.Screen
        name={SCRAPED_PRODUCT_DETAIL_SCREEN.SCRAPER_PRODUCT_SETTINGS}
        initialParams={{
          scrapedId: productParams.productScrapedId,
          enable: productParams.enable,
          urlToScrape: productParams.urlToScrape,
        }}
        options={{
          title: t('scrapedProducts.screens.settings'),
          tabBarIcon: SettingsIcon,
        }}
        component={ProductScrapperSettings}
      />
    </Tab.Navigator>
  );
}

export default ProductDetailTabNavigation;
