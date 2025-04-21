import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {
  TextInput,
  Switch,
  Text,
  Button,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import {useTranslation} from '@core/i18n';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {scraperRulesSchema, ScraperRulesFormData} from './scraperRulesSchema';
import {ScraperRule} from '../domain/scraperRules';

interface Props {
  scraperRule?: ScraperRule;
  onSubmit?: (data: ScraperRulesFormData) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

function ScraperRulesForm({
  scraperRule,
  onSubmit,
  isLoading = false,
  isSuccess = false,
  isError = false,
}: Props) {
  console.log('scraperRule', scraperRule);
  const theme = useTheme();
  const {t} = useTranslation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>(
    'success',
  );

  // Show snackbar when operation completes
  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage(t('common.success'));
      setSnackbarType('success');
      setSnackbarVisible(true);
    } else if (isError) {
      setSnackbarMessage(t('common.error'));
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  }, [isSuccess, isError, t]);

  // Auto-hide snackbar after 60 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (snackbarVisible) {
      timer = setTimeout(() => {
        setSnackbarVisible(false);
      }, 60000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [snackbarVisible]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ScraperRulesFormData>({
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

        <Controller
          control={control}
          name="priceLessThan"
          render={({field: {onChange, value}}) => (
            <TextInput
              label={t('scraperRules.priceLessThan')}
              placeholder={t('scraperRules.priceLessThanPlaceholder')}
              value={value || ''}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="numeric"
              style={{marginBottom: 16}}
              error={!!errors.priceLessThan}
            />
          )}
        />
        {errors.priceLessThan && (
          <Text style={{color: 'red', marginBottom: 16}}>
            {errors.priceLessThan.message}
          </Text>
        )}

        <Controller
          control={control}
          name="priceGreaterThan"
          render={({field: {onChange, value}}) => (
            <TextInput
              label={t('scraperRules.priceGreaterThan')}
              placeholder={t('scraperRules.priceGreaterThanPlaceholder')}
              value={value || ''}
              onChangeText={onChange}
              mode="outlined"
              keyboardType="numeric"
              style={{marginBottom: 24}}
              error={!!errors.priceGreaterThan}
            />
          )}
        />
        {errors.priceGreaterThan && (
          <Text style={{color: 'red', marginBottom: 16}}>
            {errors.priceGreaterThan.message}
          </Text>
        )}

        <View style={{gap: 16}}>
          <Controller
            control={control}
            name="notifyAvailability"
            render={({field: {onChange, value}}) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text variant="bodyLarge" style={{flex: 1}}>
                  {t('scraperRules.notifyAvailability')}
                </Text>
                <Switch value={value} onValueChange={onChange} />
              </View>
            )}
          />

          <Controller
            control={control}
            name="notifyPrice"
            render={({field: {onChange, value}}) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text variant="bodyLarge" style={{flex: 1}}>
                  {t('scraperRules.notifyPrice')}
                </Text>
                <Switch value={value} onValueChange={onChange} />
              </View>
            )}
          />

          <Controller
            control={control}
            name="notifyStock"
            render={({field: {onChange, value}}) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text variant="bodyLarge" style={{flex: 1}}>
                  {t('scraperRules.notifyStock')}
                </Text>
                <Switch value={value} onValueChange={onChange} />
              </View>
            )}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(handleFormSubmit) as any}
          style={{marginTop: 24}}
          loading={isLoading}
          disabled={isLoading}>
          {isLoading ? t('common.loading') : t('common.save')}
        </Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={60000}
        style={{
          backgroundColor:
            snackbarType === 'success'
              ? theme.colors.primary
              : theme.colors.error,
        }}>
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

export default ScraperRulesForm;
