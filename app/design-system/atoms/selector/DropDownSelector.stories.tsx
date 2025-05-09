import React, {useState} from 'react';
import {View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nextProvider} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import {i18n} from '@core/i18n';
import DropDownSelector, {DropDownSelectorOption} from './DropDownSelector';

export default {
  title: 'Atoms/DropDownSelector',
  component: DropDownSelector,
  decorators: [
    (Story: React.FC) => (
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

const options: DropDownSelectorOption[] = [
  {
    value: 'walk',
    title: 'Walking',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    value: 'wheelchair',
    title: 'By wheelchair',
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    value: 'cycling',
    title: 'Cycling',
  },
  {
    value: 'driving',
    title: 'Driving',
  },
  {
    value: 'horse',
    title: 'Horse riding',
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export const Default = () => {
  const [value, setValue] = useState<string | number>('walk');
  return (
    <DropDownSelector
      options={options}
      value={value}
      onChange={setValue}
      label="Transport mode"
      placeholder="Select mode"
    />
  );
};

export const WithReactHookForm = () => {
  const {control, handleSubmit} = useForm<{mode: string | number}>({
    defaultValues: {mode: 'cycling'},
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <View>
      <Controller
        control={control}
        name="mode"
        render={({field: {onChange, value}}) => (
          <DropDownSelector
            options={options}
            value={value}
            onChange={onChange}
            label="Transport mode"
            placeholder="Select mode"
          />
        )}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{marginTop: 16}}>
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </View>
    </View>
  );
};
