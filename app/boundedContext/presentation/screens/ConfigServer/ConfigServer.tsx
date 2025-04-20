import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text, TextInput, Button} from 'react-native-paper';

import {AppStackParamList} from '@navigation/navigationTypes';
import useLocalStorage from '@infrastructure/storage/useLocalStorage';
import {updateAxiosBaseUrl} from '@infrastructure/repositories/axiosBase';
import {useTranslation} from 'react-i18next';

import {SCREEN_NAMES} from '@screens/screenTypes';

import style from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParamList>;
}

const ConfigServer = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {saveData, getData} = useLocalStorage();
  const [urlServer, setUrlServer] = useState(getData('urlServer') || '');

  function handleOnAddServer() {
    saveData('urlServer', urlServer);
    updateAxiosBaseUrl();
    setTimeout(() => {
      navigation.navigate(SCREEN_NAMES.PRODUCT_SCRAPED_LIST, {
        queryFunction: 'getAllScrapedProductsEnabled',
      });
    }, 300);
  }

  useEffect(() => {
    const server = getData('urlServer');
    if (server) {
      navigation.navigate(SCREEN_NAMES.PRODUCT_SCRAPED_LIST, {
        queryFunction: 'getAllScrapedProductsEnabled',
      });
    }
  }, [getData, navigation]);

  return (
    <SafeAreaView style={style.container}>
      <Text variant="bodyMedium">{t('configServer.serverUrl')}</Text>
      <View style={style.section}>
        <TextInput
          label={t('configServer.serverUrl')}
          keyboardType="url"
          style={style.input}
          onChangeText={text => setUrlServer(text)}
          value={urlServer}
        />
        <Button mode="contained" onPress={() => handleOnAddServer()}>
          {t('common.save')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ConfigServer;
