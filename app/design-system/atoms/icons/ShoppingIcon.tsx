import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShoppingIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="shopping" color={color} size={size} />
);

export default ShoppingIcon;
