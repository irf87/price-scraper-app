import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChartIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="chart-areaspline" color={color} size={size} />
);

export default ChartIcon;
