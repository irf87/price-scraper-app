import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput, Switch, Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from '@core/i18n';

function ScraperSettingsForm() {
  const theme = useTheme();
  const {t} = useTranslation();
  const [url, setUrl] = useState('');
  const [enabled, setEnabled] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving scraper settings:', {url, enabled});
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        <Text
          variant="titleLarge"
          style={{marginBottom: 16, color: theme.colors.primary}}>
          {t('scrapedProducts.screens.settings')}
        </Text>

        <TextInput
          label={t('scrapedProducts.scraperSettings.url')}
          placeholder={t('scrapedProducts.scraperSettings.urlPlaceholder')}
          value={url}
          onChangeText={setUrl}
          mode="outlined"
          style={{marginBottom: 16}}
        />

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
            value={enabled}
            onValueChange={setEnabled}
            style={{marginLeft: 8}}
          />
        </View>

        <Button mode="contained" onPress={handleSave} style={{marginTop: 16}}>
          {t('common.save')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default ScraperSettingsForm;
