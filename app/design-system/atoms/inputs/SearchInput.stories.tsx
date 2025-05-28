import React, {useState} from 'react';
import {View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nextProvider} from 'react-i18next';
import {i18n} from '@core/i18n';
import SearchInput from './SearchInput';

export default {
  title: 'Design System/Atoms/SearchInput',
  component: SearchInput,
  decorators: [
    Story => (
      <I18nextProvider i18n={i18n}>
        <PaperProvider>
          <View style={{padding: 16}}>
            <Story />
          </View>
        </PaperProvider>
      </I18nextProvider>
    ),
  ],
};

// Default story
export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      value={value}
      onChangeText={setValue}
      placeholder="Search..."
    />
  );
};

// With custom placeholder
export const CustomPlaceholder = () => {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      value={value}
      onChangeText={setValue}
      placeholder="Type to search..."
    />
  );
};

// With initial value
export const WithInitialValue = () => {
  const [value, setValue] = useState('Initial search term');
  return (
    <SearchInput
      value={value}
      onChangeText={setValue}
      placeholder="Search..."
    />
  );
};
