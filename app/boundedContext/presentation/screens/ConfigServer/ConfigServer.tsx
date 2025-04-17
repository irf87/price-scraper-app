/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import {Text, TextInput, Button} from 'react-native-paper';

import {AppStackParamList} from '@navigation/navigationTypes';
import useLocalStorage from '@infrastructure/storage/useLocalStorage';
import {updateAxiosBaseUrl} from '@infrastructure/repositories/axiosBase';

import style from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParamList>;
}

const ConfigServer = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [urlServer, setUrlServer] = useState('');
  const {saveData, getData} = useLocalStorage();

  function handleOnAddServer() {
    saveData('urlServer', urlServer);
    updateAxiosBaseUrl();
    setTimeout(() => {
      navigation.navigate('ProductList');
    }, 300);
  }

  useEffect(() => {
    const server = getData('urlServer');
    if (server) {
      navigation.navigate('ProductList');
    }
  }, []);

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
