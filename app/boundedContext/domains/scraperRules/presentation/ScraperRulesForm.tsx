import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {useTranslation} from '@core/i18n';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {scraperRulesSchema, ScraperRulesFormData} from './scraperRulesSchema';
import {ScraperRule} from '../domain/scraperRules';
import ScraperRulesFormFields from './ScraperRulesFormFields';

interface Props {
  scraperRule?: ScraperRule;
  onSubmit?: (data: ScraperRulesFormData) => void;
  isLoading?: boolean;
}

function ScraperRulesForm({scraperRule, onSubmit, isLoading = false}: Props) {
  const theme = useTheme();
  const {t} = useTranslation();

  const methods = useForm<ScraperRulesFormData>({
    resolver: yupResolver(scraperRulesSchema) as any,
    defaultValues: {
      priceLessThan: scraperRule?.notifyPriceSmallerEqualThan?.toString() || '',
      priceGreaterThan: scraperRule?.notifyPriceMoreEqualThan?.toString() || '',
      notifyAvailability: scraperRule?.notifyAvailabilityChanges || false,
      notifyPrice: scraperRule?.notifyPriceChanges || false,
      notifyStock: scraperRule?.notifyStockChanges || false,
    },
  });

  const handleFormSubmit = (data: ScraperRulesFormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        <Text
          variant="titleLarge"
          style={{marginBottom: 16, color: theme.colors.primary}}>
          {t('scraperRules.title')}
        </Text>

        <FormProvider {...methods}>
          <ScraperRulesFormFields />
        </FormProvider>

        <Button
          mode="contained"
          onPress={methods.handleSubmit(handleFormSubmit) as any}
          style={{marginTop: 24}}
          loading={isLoading}
          disabled={isLoading}>
          {isLoading ? t('common.loading') : t('common.save')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default ScraperRulesForm;
