/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text, TextInput, Button} from 'react-native-paper';

import {AppStackParamList} from '@navigation/navigationTypes';
import useLocalStorage from '@infrastructure/storage/useLocalStorage';
import {updateAxiosBaseUrl} from '@infrastructure/repositories/axiosBase';

import style from './styles';

interface Props {
  navigation: NativeStackNavigationProp<AppStackParamList>;
}

const ConfigServer = ({navigation}: Props) => {
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
      <Text variant="bodyMedium">
        Ingresa la URL de tu servidor, ejemplo: http://198.168.1.0
      </Text>
      <View style={style.section}>
        <TextInput
          label="URL"
          keyboardType="url"
          style={style.input}
          onChangeText={text => setUrlServer(text)}
          value={urlServer}
        />
        <Button mode="contained" onPress={() => handleOnAddServer()}>
          Agregar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ConfigServer;
