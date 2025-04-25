import React from 'react';
import {View, StyleSheet} from 'react-native';

const DividerDrawer = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E8EAED',
    marginVertical: 8,
    marginHorizontal: 24,
  },
});

export default DividerDrawer;
