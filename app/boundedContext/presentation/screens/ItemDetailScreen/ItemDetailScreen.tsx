import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

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
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <ItemSectionWrapper
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}>
        {queryFunction === 'getScrapedProductByProductId' && (
          <Button
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
      </ItemSectionWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default ItemDetailScreen;
