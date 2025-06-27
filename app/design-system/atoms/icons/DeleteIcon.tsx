import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="delete" color={color} size={size} />
);

export default DeleteIcon;
