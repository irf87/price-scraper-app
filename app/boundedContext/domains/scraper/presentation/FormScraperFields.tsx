import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

interface FormData {
  priceDomSelector: string;
  stockDomSelector?: string;
  availableDomSelector?: string;
}

const FormScraperFields = () => {
  const {t} = useTranslation();
  const {control} = useFormContext<FormData>();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('scrapedProducts.form.scraperSelectors')}
      </Text>

      <Controller
        control={control}
        name="priceDomSelector"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInput
            mode="outlined"
            label={t('scrapedProducts.form.priceDomSelector')}
            value={value}
            onChangeText={onChange}
            error={!!error}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="stockDomSelector"
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label={t('scrapedProducts.form.stockDomSelector')}
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="availableDomSelector"
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label={t('scrapedProducts.form.availableDomSelector')}
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default FormScraperFields;
