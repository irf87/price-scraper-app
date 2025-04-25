import React from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './itemStyles';

interface Props {
  text: string;
  colorIcon?: string;
  iconName: string;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<ViewStyle>;
}

const ItemDrawer = ({
  text,
  iconName,
  colorIcon = '#1a73e8',
  onPress,
  customStyle,
  customTextStyle,
}: Props) => {
  return (
    <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
      <View style={customStyle || styles.iconContainer}>
        <Icon name={iconName} size={24} color={colorIcon} />
      </View>
      <Text style={customTextStyle || styles.sectionText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ItemDrawer;
