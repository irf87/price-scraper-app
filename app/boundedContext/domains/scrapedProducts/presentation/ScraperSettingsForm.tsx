import React from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput, Switch, Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from '@core/i18n';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  scraperSettingsSchema,
  ScraperSettingsFormData,
} from './scraperSettingsSchema';

interface Props {
  urlToScrape: string;
  enable: boolean;
  onSubmit?: (data: ScraperSettingsFormData) => void;
}

function ScraperSettingsForm({
  urlToScrape,
  enable: initialEnabled,
  onSubmit,
}: Props) {
  const theme = useTheme();
  const {t} = useTranslation();

  console.log('initialEnabled', initialEnabled);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ScraperSettingsFormData>({
    resolver: yupResolver(scraperSettingsSchema),
    defaultValues: {
      url: urlToScrape || '',
      enabled: initialEnabled || false,
    },
  });

  const handleFormSubmit = (data: ScraperSettingsFormData) => {
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
          {t('scrapedProducts.screens.settings')}
        </Text>

        <Controller
          control={control}
          name="url"
          render={({field: {onChange, value}}) => (
            <TextInput
              label={t('scrapedProducts.scraperSettings.url')}
              placeholder={t('scrapedProducts.scraperSettings.urlPlaceholder')}
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={{marginBottom: 16}}
              error={!!errors.url}
            />
          )}
        />
        {errors.url && (
          <Text style={{color: 'red', marginBottom: 16}}>
            {errors.url.message}
          </Text>
        )}

        <Controller
          control={control}
          name="enabled"
          render={({field: {onChange, value}}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 24,
              }}>
              <Text variant="bodyLarge">
                {t('scrapedProducts.scraperSettings.enabled')}
              </Text>
              <Switch
                value={value}
                onValueChange={onChange}
                style={{marginLeft: 8}}
              />
            </View>
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(handleFormSubmit)}
          style={{marginTop: 16}}>
          {t('common.save')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default ScraperSettingsForm;
