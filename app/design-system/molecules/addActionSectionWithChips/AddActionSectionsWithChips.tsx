import React from 'react';
import {View} from 'react-native';
import {Text, Chip} from 'react-native-paper';
import Select from '@design-system/atoms/selector/Select/Select';

import styles from './styles';

export interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  selectedOptions: Option[];
  actionTitle: string;
  label?: string;
  onSelect: (value: string | number) => void;
  onRemove: (value: string | number) => void;
}

const AddActionSectionsWithChips = ({
  actionTitle,
  label,
  options,
  selectedOptions,
  onRemove,
  onSelect,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        {actionTitle}
      </Text>
      <Select label={label || ''} options={options} onSelect={onSelect} />
      <View style={styles.chipRow}>
        {selectedOptions.map(category => (
          <Chip
            key={category.value}
            style={styles.chip}
            onClose={() => onRemove(category.value)}>
            {category.label}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default AddActionSectionsWithChips;
