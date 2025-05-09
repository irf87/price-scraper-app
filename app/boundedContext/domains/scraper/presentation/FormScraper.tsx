import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text, Divider} from 'react-native-paper';
import {useForm, FormProvider} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import useScraperCreator, {
  FormData,
} from '@domains/scraper/application/useScraperCreator';
import ScraperRulesFormFields from '@domains/scraperRules/presentation/ScraperRulesFormFields';
import FormScraperFields from './FormScraperFields';

import styles from './formScraperStyles';
import LinkedProduct from './LinkedProduct';

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
        const scraperId = await handleCreateScraper(data);
        if (scraperId) {
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
          <FormScraperFields />

          <Divider style={styles.divider} />

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
