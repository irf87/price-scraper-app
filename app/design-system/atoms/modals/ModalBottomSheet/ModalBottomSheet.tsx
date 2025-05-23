import React from 'react';
import {View, Modal, TouchableOpacity, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';

import styles from './styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  handleColor?: string;
}

function ModalBottomSheet({
  isVisible,
  onClose,
  children,
  title,
  handleColor,
}: Props) {
  const handleStyle: ViewStyle[] = [styles.handle];
  if (handleColor) {
    handleStyle.push({backgroundColor: handleColor});
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
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
        </View>
      </View>
    </Modal>
  );
}

export default ModalBottomSheet;
