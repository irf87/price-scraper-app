import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const FooterSectionDrawer = ({children}: Props) => {
  return <View style={styles.footer}>{children}</View>;
};
const styles = StyleSheet.create({
  footer: {
    padding: 8,
  },
});

export default FooterSectionDrawer;
