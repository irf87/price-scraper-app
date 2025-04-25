import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDrawer} from '@hooks/useDrawer';
import Drawer from '@components/Drawer/Drawer';
import NavigationHeader from '@design-system/atoms/navagation/navigationHeader/NavigationHeader';

const CategoriesScreen = () => {
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={t('navigation.categories')}
        toggleDrawer={toggleDrawer}
        spin={spin}
      />

      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      <View style={styles.content}>
        <Text>{t('navigation.categories')} Screen Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
