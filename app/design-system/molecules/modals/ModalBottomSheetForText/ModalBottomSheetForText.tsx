import React from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

import ModalBottomSheet from '@design-system/atoms/modals/ModalBottomSheet/ModalBottomSheet';
import styles from './styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  text: string;
  title?: string;
  handleColor?: string;
}

function ModalBottomSheetForText({
  isVisible,
  onClose,
  text,
  title,
  handleColor,
}: Props) {
  return (
    <ModalBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={title}
      handleColor={handleColor}>
      <ScrollView style={styles.scrollView}>
        <Text variant="bodyMedium" style={styles.text}>
          {text}
        </Text>
      </ScrollView>
    </ModalBottomSheet>
  );
}

export default ModalBottomSheetForText;
