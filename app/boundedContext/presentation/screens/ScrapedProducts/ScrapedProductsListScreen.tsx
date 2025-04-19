import React, {useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {useProductsScrapedList} from '@domains/scrapedProducts/application/useProductsScrapedList';
import {useDrawer} from '@hooks/useDrawer';

import ProductsScrapedList from '@domains/scrapedProducts/presentation/ProductsScrapedList/ProductsScrapedList';
import Drawer from '@components/Drawer/Drawer';

import {QueryProductScrapedFunction} from '@domains/scrapedProducts/domain/scrapedProductRepository';

interface Props {
  route: {params: {queryFunction: QueryProductScrapedFunction}};
}

import styles, {DRAWER_WIDTH} from './styles';

function ScrapedProductsListScreen({route}: Props) {
  const {queryFunction} = route.params;
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {
    data: productsScraped,
    isFetching,
    refetch: refetchProductScraped,
  } = useProductsScrapedList({queryFunction});
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const {t} = useTranslation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  function handleOnPressProduct(productScraped: ScrapedProduct) {
    navigate('ProductDetail', productScraped);
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Icon name="menu" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>{t('scrapedProducts.activeProducts')}</Text>
      </View>

      <Modal visible={isOpen} transparent onRequestClose={toggleDrawer}>
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.drawerContainer,
                  {transform: [{translateX: slideAnim}]},
                ]}>
                <View style={styles.drawerHeader}>
                  <TouchableOpacity
                    onPress={toggleDrawer}
                    style={styles.closeButton}>
                    <Icon name="close" size={24} color="#5f6368" />
                  </TouchableOpacity>
                </View>
                <Drawer onClose={toggleDrawer} />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}
      <ProductsScrapedList
        onPressProduct={handleOnPressProduct}
        onRefetch={refetchProductScraped}
        productsScrapedList={productsScraped || []}
      />
    </SafeAreaView>
  );
}

export default ScrapedProductsListScreen;
