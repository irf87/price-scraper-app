import React from 'react';
import { View, TouchableOpacity, Text, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

export interface DropDownOption {
  label: string;
  onPress: () => void;
  icon?: string;
}

interface DropDownProps {
  options: DropDownOption[];
  onClose: () => void;
}

export const DropDown: React.FC<DropDownProps> = ({ options, onClose }) => {
  return (
    <Modal transparent visible onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index < options.length - 1 && styles.optionBorder,
              ]}
              onPress={() => {
                option.onPress();
                onClose();
              }}>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}; 