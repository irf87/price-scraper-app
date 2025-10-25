import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text, Divider, Switch} from 'react-native-paper';
import {useForm, FormProvider} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {ITEMS_QUERY_KEYS} from '@domains/items/infrastructure/config/itemsConfig';
import useScraperCreator, {
  FormData,
} from '@domains/scraper/application/useScraperCreator';
import {useLinkingItemToProduct} from '@domains/items/application/hooks/useLinkingItemToProduct';
import useLinkingItemFactory from '@domains/items/application/hooks/useLinkingItemFactory';
import ScraperRulesFormFields from '@domains/scraperRules/presentation/ScraperRulesFormFields';
import FormScraperFields from './FormScraperFields';

import styles from './formScraperStyles';
import LinkedProduct from './LinkedProduct';
import LinkedItem from './LinkedItem';

interface FormScraperProps {
  onFormStateChange?: (isValid: boolean) => void;
  setIsCreating: (isCreating: boolean) => void;
  onDismissMoal: () => void;
}

export interface FormScraperRef {
  submit: () => void;
}

const FormScraper = forwardRef<FormScraperRef, FormScraperProps>(
  ({onFormStateChange, setIsCreating, onDismissMoal}, ref) => {
    const {t} = useTranslation();
    const [manualSearch, setManualSearch] = useState(false);
    const [hideSelectors, setHideSelectors] = useState<boolean>(true);
    const [hasDetail, setHasDetail] = useState<boolean>(false);

    const {
      repositoryAssignment: repositoryAssignmentList,
      repositoryItem: repositoryItemList,
    } = useLinkingItemFactory(ITEMS_QUERY_KEYS.LIST);
    const {
      repositoryAssignment: repositoryAssignmentCategory,
      repositoryItem: repositoryItemCategory,
    } = useLinkingItemFactory(ITEMS_QUERY_KEYS.CATEGORY);

    const {
      url,
      setUrl,
      productDetail,
      productId,
      setProductId,
      productsFound,
      wasAutoSearched,
      isLoadingGetDataByUrl,
      getDataByUrl,
      handleCreateScraper,
      resetProductSearch,
      creatingScraper,
    } = useScraperCreator();

    const {
      items: listItems,
      assignItemMutation: assignItemMutationList,
      selectItem: selectItemList,
      selectedItemId: selectedItemIdList,
    } = useLinkingItemToProduct(
      repositoryAssignmentList,
      repositoryItemList,
      ITEMS_QUERY_KEYS.LIST,
    );

    const {
      items: categoryItems,
      assignItemMutation: assignItemMutationCategory,
      selectItem: selectItemCategory,
      selectedItemId: selectedItemIdCategory,
    } = useLinkingItemToProduct(
      repositoryAssignmentCategory,
      repositoryItemCategory,
      ITEMS_QUERY_KEYS.CATEGORY,
    );

    const form = useForm<FormData>({
      mode: 'onChange',
    });

    const {
      handleSubmit,
      setValue,
      formState: {isValid},
    } = form;

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(async data => {
        const result = await handleCreateScraper(data);
        if (result?.scraperId) {
          if (selectedItemIdList) {
            await assignItemMutationList.mutate({
              targetProductId: result.productId,
            });
          }
          if (selectedItemIdCategory) {
            await assignItemMutationCategory.mutate({
              targetProductId: result.productId,
            });
          }
          onDismissMoal();
        }
      }),
    }));

    const handleSelectExistingProduct = () => {
      resetProductSearch();
      setManualSearch(true);
    };

    const handleAutoFill = async () => {
      const selectorsResponse = await getDataByUrl();
      if (selectorsResponse) {
        setValue('priceDomSelector', selectorsResponse.priceDomSelector);
        setValue('stockDomSelector', selectorsResponse?.stockDomSelector || '');
        setValue(
          'availableDomSelector',
          selectorsResponse?.availableDomSelector || '',
        );
        setHasDetail(true);
      }
    };

    useEffect(() => {
      onFormStateChange?.(
        isValid && (Boolean(productId) || Boolean(productDetail?.name)),
      );
    }, [isValid, onFormStateChange, productId, productDetail?.name]);

    useEffect(() => {
      setIsCreating(creatingScraper);
    }, [creatingScraper, setIsCreating]);

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.legend}>{t('scrapedProducts.form.legend')}</Text>
          <TextInput
            mode="outlined"
            placeholder={t('scrapedProducts.form.urlPlaceholder')}
            value={url}
            onChangeText={setUrl}
            style={styles.input}
            onSubmitEditing={handleAutoFill}
            returnKeyType="go"
          />
          <Button
            disabled={isLoadingGetDataByUrl}
            loading={isLoadingGetDataByUrl}
            mode="contained"
            onPress={handleAutoFill}
            style={styles.autoFillButton}>
            {t('scrapedProducts.form.autoFill')}
          </Button>
        </View>

        <Divider style={styles.divider} />

        <FormProvider {...form}>
          <View style={styles.switchContainer}>
            <Switch value={hideSelectors} onValueChange={setHideSelectors} />
            <Text style={styles.switchLabel}>
              {t('scrapedProducts.form.hide_selectors')}
            </Text>
          </View>
          <View style={hideSelectors ? styles.hidden : null}>
            <FormScraperFields />
          </View>

          <Divider style={styles.divider} />

          {hasDetail && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {t('scrapedProducts.form.linkedProduct')}
                </Text>
                {!manualSearch && (
                  <Button
                    mode="outlined"
                    onPress={handleSelectExistingProduct}
                    style={styles.selectExistingButton}>
                    {t('scrapedProducts.form.selectAnExistingProduct')}
                  </Button>
                )}
                <LinkedProduct
                  productDetail={productDetail}
                  wasSearch={manualSearch || wasAutoSearched}
                  productsFound={productsFound}
                  onProductSelected={productIdSelected => {
                    setProductId(productIdSelected);
                  }}
                />
              </View>

              <Divider style={styles.divider} />
            </>
          )}

          {listItems.length > 0 && (
            <>
              <LinkedItem
                items={listItems}
                onItemSelected={itemIdSelected => {
                  selectItemList(itemIdSelected);
                }}
                label={t('scrapedProducts.form.linkToListLabel')}
                placeholder={t('scrapedProducts.form.linkToListPlaceholder')}
              />

              <Divider style={styles.divider} />
            </>
          )}

          {categoryItems.length > 0 && (
            <>
              <LinkedItem
                items={categoryItems}
                onItemSelected={itemIdSelected => {
                  selectItemCategory(itemIdSelected);
                }}
                label={t('scrapedProducts.form.linkToCategoryLabel')}
                placeholder={t(
                  'scrapedProducts.form.linkToCategoryPlaceholder',
                )}
              />

              <Divider style={styles.divider} />
            </>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('scrapedProducts.form.scraperRules')}
            </Text>
            <ScraperRulesFormFields />
          </View>
        </FormProvider>
      </View>
    );
  },
);

export default FormScraper;
