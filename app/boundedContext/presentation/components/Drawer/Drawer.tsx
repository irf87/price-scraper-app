import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import MenuDrawer from '@design-system/molecules/drawer/menuDrawer/MenuDrawer';

import {AppStackParamList} from '@navigation/navigationTypes';
import {SCREEN_NAMES} from '@screens/screenTypes';

type DrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer: React.FC<DrawerProps> = ({isOpen, toggleDrawer}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {t} = useTranslation();

  const handleNavigation = (screen: keyof AppStackParamList, params?: any) => {
    toggleDrawer();
    navigation.navigate(screen, params);
  };

  return (
    <MenuDrawer
      isOpen={isOpen}
      onRequestClose={toggleDrawer}
      onPress={toggleDrawer}
      title={t('drawer.sections')}>
      <MenuDrawer.Section>
        <MenuDrawer.Item
          text={t('drawer.scrapedProducts')}
          iconName="shopping-cart"
          onPress={() =>
            handleNavigation(SCREEN_NAMES.PRODUCT_SCRAPED_LIST, {
              queryFunction: 'getAllScrapedProductsEnabled',
            })
          }
        />
        <MenuDrawer.Item
          text={t('drawer.lists')}
          iconName="list"
          onPress={() => handleNavigation(SCREEN_NAMES.LISTS)}
        />
        <MenuDrawer.Item
          text={t('drawer.categories')}
          iconName="category"
          onPress={() => handleNavigation(SCREEN_NAMES.CATEGORIES)}
        />
      </MenuDrawer.Section>

      <MenuDrawer.Divider />

      <MenuDrawer.Footer>
        <MenuDrawer.Item
          // customStyle={styles.setupItem}
          customTextStyle={styles.setupText}
          text={t('drawer.setup')}
          iconName="settings"
          colorIcon="#5f6368"
          onPress={() => handleNavigation(SCREEN_NAMES.CONFIG_SERVER)}
        />
      </MenuDrawer.Footer>
    </MenuDrawer>
  );
};

const styles = StyleSheet.create({
  setupText: {
    fontSize: 16,
    color: '#5f6368',
    letterSpacing: 0.1,
    marginLeft: 12,
  },
});

export default Drawer;
