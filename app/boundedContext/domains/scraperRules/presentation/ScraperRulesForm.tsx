import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput, Switch, Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from '@core/i18n';

function ScraperRulesForm() {
  const theme = useTheme();
  const {t} = useTranslation();
  const [priceLessThan, setPriceLessThan] = useState('');
  const [priceGreaterThan, setPriceGreaterThan] = useState('');
  const [notifyAvailability, setNotifyAvailability] = useState(false);
  const [notifyPrice, setNotifyPrice] = useState(false);
  const [notifyStock, setNotifyStock] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving scraper rules:', {
      priceLessThan,
      priceGreaterThan,
      notifyAvailability,
      notifyPrice,
      notifyStock,
    });
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        <Text
          variant="titleLarge"
          style={{marginBottom: 16, color: theme.colors.primary}}>
          {t('scraperRules.title')}
        </Text>

        <TextInput
          label={t('scraperRules.priceLessThan')}
          placeholder={t('scraperRules.priceLessThanPlaceholder')}
          value={priceLessThan}
          onChangeText={setPriceLessThan}
          mode="outlined"
          keyboardType="numeric"
          style={{marginBottom: 16}}
        />

        <TextInput
          label={t('scraperRules.priceGreaterThan')}
          placeholder={t('scraperRules.priceGreaterThanPlaceholder')}
          value={priceGreaterThan}
          onChangeText={setPriceGreaterThan}
          mode="outlined"
          keyboardType="numeric"
          style={{marginBottom: 24}}
        />

        <View style={{gap: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              {t('scraperRules.notifyAvailability')}
            </Text>
            <Switch
              value={notifyAvailability}
              onValueChange={setNotifyAvailability}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              {t('scraperRules.notifyPrice')}
            </Text>
            <Switch value={notifyPrice} onValueChange={setNotifyPrice} />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              {t('scraperRules.notifyStock')}
            </Text>
            <Switch value={notifyStock} onValueChange={setNotifyStock} />
          </View>
        </View>

        <Button mode="contained" onPress={handleSave} style={{marginTop: 24}}>
          {t('common.save')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default ScraperRulesForm;
