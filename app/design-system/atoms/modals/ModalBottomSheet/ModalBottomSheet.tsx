import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import styles from './styles';

export type ModalHeight = 'small' | 'medium' | 'default' | 'higher' | 'full';

const HEIGHT_MAP: Record<ModalHeight, number> = {
  small: 0.3,
  medium: 0.5,
  default: 0.7,
  higher: 0.8,
  full: 0.9,
};

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  handleColor?: string;
  height?: ModalHeight;
}

function ModalBottomSheet({
  isVisible,
  onClose,
  children,
  title,
  handleColor,
  height = 'default',
}: Props) {
  const handleStyle: ViewStyle[] = [styles.handle];
  if (handleColor) {
    handleStyle.push({backgroundColor: handleColor});
  }

  const containerStyle: ViewStyle[] = [
    styles.container,
    {
      height: `${HEIGHT_MAP[height] * 100}%`,
      justifyContent: 'flex-end',
      marginTop: 'auto',
      marginBottom: 0,
    },
  ];

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={containerStyle}
        dismissable>
        <View style={styles.header}>
          <View style={handleStyle} />
          {title && (
            <Text variant="titleMedium" style={styles.title}>
              {title}
            </Text>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text variant="bodyLarge">✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>{children}</View>
      </Modal>
    </Portal>
  );
}

export default ModalBottomSheet;
