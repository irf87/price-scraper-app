import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {DeleteIcon} from '@design-system/atoms/icons';

import {useScraperDelete} from '@domains/scraper/application/useScraperDelete';
import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import useLoaderStore from '@components/Loader/useLoader';

import {SCREEN_NAMES} from '@screens/screenTypes';

interface ProductDetailHeaderRightProps {
  id?: number;
  navigation: NativeStackNavigationProp<AppStackParamList>;
}

const ProductDetailHeaderRight = ({
  id,
  navigation,
}: ProductDetailHeaderRightProps) => {
  console.log('id', id);
  const {t} = useTranslation();
  const {setLoading} = useLoaderStore();
  const {deleteScraper} = useScraperDelete();
  const {refetch: refetchProductScraped} = useProductsScrapedList({
    queryFunction: 'getAllScrapedProductsEnabled',
  });

  async function handleOnPress() {
    if (id) {
      setLoading(true);
      await deleteScraper(id);
      refetchProductScraped();
      setLoading(false);
      navigation.navigate(SCREEN_NAMES.PRODUCT_SCRAPED_LIST, {
        queryFunction: 'getAllScrapedProductsEnabled',
      });
    }
  }
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          t('scrapedProducts.remove.title'),
          t('scrapedProducts.remove.confirmQuestion'),
          [
            {text: t('cancel'), style: 'cancel'},
            {
              text: t('delete'),
              style: 'destructive',
              onPress: handleOnPress,
            },
          ],
        );
      }}
      style={{marginRight: 16}}>
      <DeleteIcon size={24} color="red" />
    </TouchableOpacity>
  );
};

export default ProductDetailHeaderRight;
