import React from 'react';
import {ScrollView} from 'react-native';

import ModalBottomSheet, {
  ModalHeight,
} from '@design-system/atoms/modals/ModalBottomSheet/ModalBottomSheet';
import styles from './styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  handleColor?: string;
  height?: ModalHeight;
}

function ModalBottomSheetForContent({
  isVisible,
  onClose,
  children,
  title,
  handleColor,
  height = 'default',
}: Props) {
  return (
    <ModalBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={title}
      handleColor={handleColor}
      height={height}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </ModalBottomSheet>
  );
}

export default ModalBottomSheetForContent;
