import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  Modal as PaperModal,
  Divider,
  Text,
  IconButton,
} from 'react-native-paper';

import styles from './styles';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  children: React.ReactNode;
  footerButtons?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  title,
  children,
  footerButtons,
}) => {
  return (
    <PaperModal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text variant="titleLarge" style={styles.title}>
              {title}
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={onDismiss}
              style={styles.closeButton}
            />
          </View>
          <Divider />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}>
          {children}
        </ScrollView>

        {footerButtons && (
          <View style={styles.footer}>
            <Divider />
            <View style={styles.footerContent}>{footerButtons}</View>
          </View>
        )}
      </View>
    </PaperModal>
  );
};

export default Modal;
