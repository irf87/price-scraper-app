import React from 'react';
import {useTheme, AnimatedFAB} from 'react-native-paper';

import styles from './styles';

interface Props {
  icon: string;
  label: string;
  onPress: () => void;
  extended?: boolean;
}

function FloatingButton({icon, label, onPress, extended = false}: Props) {
  const theme = useTheme();
  return (
    <AnimatedFAB
      icon={icon}
      label={label}
      onPress={onPress}
      style={styles.fab}
      color={theme.colors.primary}
      extended={extended}
    />
  );
}

export default FloatingButton;
