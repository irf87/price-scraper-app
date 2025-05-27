import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Controller, useFormContext} from 'react-hook-form';
import {Item} from '@domains/items/domain/item';

const FormFields = ({translatePrefix}: {translatePrefix: string}) => {
  const {t} = useTranslation();
  const {control} = useFormContext<Partial<Item>>();

  return (
    <View style={styles.section}>
      <Controller
        control={control}
        name="name"
        rules={{required: true}}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <TextInput
            mode="outlined"
            label={t(`${translatePrefix}.form.name`)}
            value={value}
            onChangeText={onChange}
            error={!!error}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value}}) => (
          <TextInput
            mode="outlined"
            label={t(`${translatePrefix}.form.description`)}
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
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
  input: {
    marginBottom: 16,
  },
});

export default FormFields;
