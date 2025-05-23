import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import ModalBottomSheet from './ModalBottomSheet';

export default {
  title: 'Design System/Atoms/ModalBottomSheet',
  component: ModalBottomSheet,
};

export const Default = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <View style={{flex: 1}}>
      <ModalBottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title="Sample Modal">
        <Text>This is a sample content for the modal</Text>
      </ModalBottomSheet>
    </View>
  );
};

export const WithLongContent = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <View style={{flex: 1}}>
      <ModalBottomSheet
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title="Long Content Modal">
        <Text>
          {Array(20)
            .fill('This is a long content that should be scrollable. ')
            .join('')}
        </Text>
      </ModalBottomSheet>
    </View>
  );
}; 