import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {DropDown} from './DropDown';

export default {
  title: 'Design System/Atoms/DropDown',
  component: DropDown,
};

export const Default = () => {
  const [isVisible, setIsVisible] = useState(false);

  const options = [
    {
      label: 'Edit',
      onPress: () => console.log('Edit pressed'),
    },
    {
      label: 'Delete',
      onPress: () => console.log('Delete pressed'),
    },
  ];

  return (
    <View style={{padding: 20}}>
      <Button title="Show Options" onPress={() => setIsVisible(true)} />
      {isVisible && (
        <DropDown options={options} onClose={() => setIsVisible(false)} />
      )}
    </View>
  );
};
