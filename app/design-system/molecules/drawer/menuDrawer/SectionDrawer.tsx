import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const SectionDrawer = ({children}: Props) => {
  return <View style={styles.sections}>{children}</View>;
};
const styles = StyleSheet.create({
  sections: {
    paddingVertical: 8,
  },
});

export default SectionDrawer;
