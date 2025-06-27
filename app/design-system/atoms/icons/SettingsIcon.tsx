import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="cog" color={color} size={size} />
);

export default SettingsIcon;
