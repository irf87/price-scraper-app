import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AppStackParamList} from '@navigation/navigationTypes';
import {SCREEN_NAMES} from '@screens/screenTypes';

type DrawerProps = {
  onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({onClose}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {t} = useTranslation();

  const handleNavigation = (screen: keyof AppStackParamList, params?: any) => {
    onClose();
    navigation.navigate(screen, params);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('drawer.sections')}</Text>
      </View>

      <View style={styles.sections}>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() =>
            handleNavigation(SCREEN_NAMES.PRODUCT_SCRAPED_LIST, {
              queryFunction: 'getAllScrapedProductsEnabled',
            })
          }>
          <View style={styles.iconContainer}>
            <Icon name="shopping-cart" size={24} color="#1a73e8" />
          </View>
          <Text style={styles.sectionText}>{t('drawer.scrapedProducts')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => handleNavigation(SCREEN_NAMES.LISTS)}>
          <View style={styles.iconContainer}>
            <Icon name="list" size={24} color="#1a73e8" />
          </View>
          <Text style={styles.sectionText}>{t('drawer.lists')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => handleNavigation(SCREEN_NAMES.CATEGORIES)}>
          <View style={styles.iconContainer}>
            <Icon name="category" size={24} color="#1a73e8" />
          </View>
          <Text style={styles.sectionText}>{t('drawer.categories')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.setupItem}
          onPress={() => handleNavigation(SCREEN_NAMES.CONFIG_SERVER)}>
          <View style={styles.iconContainer}>
            <Icon name="settings" size={24} color="#5f6368" />
          </View>
          <Text style={styles.setupText}>{t('drawer.setup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#202124',
    letterSpacing: 0.25,
  },
  sections: {
    paddingVertical: 8,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 4,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#202124',
    letterSpacing: 0.1,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EAED',
    marginVertical: 8,
    marginHorizontal: 24,
  },
  footer: {
    padding: 8,
  },
  setupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 4,
  },
  setupText: {
    fontSize: 16,
    color: '#5f6368',
    letterSpacing: 0.1,
    marginLeft: 12,
  },
});

export default Drawer;
