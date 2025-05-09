import React from 'react';
import {View} from 'react-native';
import {TextInput, Switch, Text} from 'react-native-paper';
import {useTranslation} from '@core/i18n';
import {Controller, useFormContext} from 'react-hook-form';
import {ScraperRulesFormData} from './scraperRulesSchema';

function ScraperRulesFormFields() {
  const {t} = useTranslation();
  const {
    control,
    formState: {errors},
  } = useFormContext<ScraperRulesFormData>();

  return (
    <>
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
    </>
  );
}

export default ScraperRulesFormFields; 