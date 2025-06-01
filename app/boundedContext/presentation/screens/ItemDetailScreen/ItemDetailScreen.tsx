import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useTheme, Button} from 'react-native-paper';
import {QueryClientProvider} from 'react-query';

import {AppStackParamList} from '@navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import ItemSectionWrapper from '@design-system/molecules//sections/itemSectionWrapper/ItemSectionWrapper';
import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';
import ItemActionsPanel from '@domains/products/presentation/ItemActionsPanel';
import ModalBottomSheetForContent from '@design-system/molecules/modals/ModalBottomSheetForContent/ModalBottomSheetForContent';

import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';

import {SCREEN_NAMES} from '@screens/screenTypes';
import {ItemDetailScreenProps} from './ScreenProps';
import {queryClient} from '@infrastructure/repositories/queryClient';
import {useGetItemsAsOptionsFromCache} from '@domains/items/application/hooks/useGetItemsAsOptionsFromCache';

import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';

interface Props {
  route: {params: ItemDetailScreenProps};
}

const ItemDetailScreen = ({route}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const {queryFunction, item} = route.params;
  const [isActionsPanelVisible, setIsActionsPanelVisible] = useState(false);
  const {getListOptions, getCategoryOptions} = useGetItemsAsOptionsFromCache();

  const listOptions = useMemo(() => getListOptions(), [getListOptions]);
  const categoryOptions = useMemo(
    () => getCategoryOptions(),
    [getCategoryOptions],
  );

  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const {
    data,
    isFetching,
    refetch: refetchProductScraped,
  } = useProductsScrapedList({queryFunction, id: Number(item.id)});

  function handleOnPressProduct(productScraped: ScrapedProduct) {
    navigate(SCREEN_NAMES.PRODUCT_DETAIL, productScraped);
  }

  return (
    <ScreenLayout showHeader={false} backgroundColor={theme.colors.background}>
      {isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <View style={styles.container}>
        <ItemSectionWrapper
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}>
          {queryFunction === 'getScrapedProductByProductId' && (
            <Button
              disabled={isFetching}
              mode="elevated"
              onPress={() => setIsActionsPanelVisible(true)}
              style={styles.actionButton}>
              {t('items.itemDetail.organize')}
            </Button>
          )}
          <ProductsScrapedList
            onPressProduct={handleOnPressProduct}
            onRefetch={refetchProductScraped}
            productsScrapedList={data || []}
            refreshing={isFetching}
          />
        </ItemSectionWrapper>
      </View>

      {queryFunction === 'getScrapedProductByProductId' && (
        <ModalBottomSheetForContent
          isVisible={isActionsPanelVisible}
          onClose={() => setIsActionsPanelVisible(false)}
          title={item.title}
          handleColor={theme.colors.primary}>
          <QueryClientProvider client={queryClient}>
            <ItemActionsPanel
              productId={Number(item.id)}
              listOptions={listOptions}
              categoryOptions={categoryOptions}
            />
          </QueryClientProvider>
        </ModalBottomSheetForContent>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
});

export default ItemDetailScreen;
