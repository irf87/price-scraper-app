import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  TextInput,
  Switch,
  Text,
  Divider,
  useTheme,
} from 'react-native-paper';

import {StackScreenProductDetailProps} from '@navigation/navigationTypes';

interface Props extends StackScreenProductDetailProps<'ScrapperProductoSetting'> {}

function ProductScrapperSettings({_route}: Props) {
  const theme = useTheme();
  const [url, setUrl] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [priceLessThan, setPriceLessThan] = useState('');
  const [priceGreaterThan, setPriceGreaterThan] = useState('');
  const [notifyAvailability, setNotifyAvailability] = useState(false);
  const [notifyPrice, setNotifyPrice] = useState(false);
  const [notifyStock, setNotifyStock] = useState(false);

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 16}}>
        <TextInput
          label="URL"
          placeholder="URL Scrapped"
          value={url}
          onChangeText={setUrl}
          mode="outlined"
          style={{marginBottom: 16}}
        />

        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
          <Text variant="bodyLarge">Enabled</Text>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            style={{marginLeft: 8}}
          />
        </View>

        <Divider style={{marginBottom: 24}} />

        <Text
          variant="titleMedium"
          style={{marginBottom: 16, color: theme.colors.primary}}>
          Reglas
        </Text>

        <TextInput
          label="Notificar cuando el precio sea menor o igual"
          placeholder="Menor o igual que"
          value={priceLessThan}
          onChangeText={setPriceLessThan}
          mode="outlined"
          keyboardType="numeric"
          style={{marginBottom: 16}}
        />

        <TextInput
          label="Notificar cuando el precio sea mayor o igual"
          placeholder="Mayor o igual que"
          value={priceGreaterThan}
          onChangeText={setPriceGreaterThan}
          mode="outlined"
          keyboardType="numeric"
          style={{marginBottom: 24}}
        />

        <View style={{gap: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              Notificar cambios de disponibilidad
            </Text>
            <Switch
              value={notifyAvailability}
              onValueChange={setNotifyAvailability}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              Notificar cambios de precio
            </Text>
            <Switch value={notifyPrice} onValueChange={setNotifyPrice} />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text variant="bodyLarge" style={{flex: 1}}>
              Notificar cambios de stock
            </Text>
            <Switch value={notifyStock} onValueChange={setNotifyStock} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductScrapperSettings; 