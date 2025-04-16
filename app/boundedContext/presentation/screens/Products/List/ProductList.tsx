import React, {useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '@navigation/navigationTypes';
import {ProductScrapedFormatted} from '@domains/products/application/useProducts';
import {useProductsScraped} from '@domains/products/application/useProducts';
import {useDrawer} from '@hooks/useDrawer';

import ProductsScrapedList from '@domains/products/presentation/ProductsScrapedList/ProductsScrapedList';
import Drawer from '@components/Drawer/Drawer';

const {width} = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

function ProductList() {
  const {navigate} = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {productsScrapedState, productsScraped, refetchProductScraped} =
    useProductsScraped();
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  function handleOnPressProduct(productScraped: ProductScrapedFormatted) {
    navigate('ProductDetail', productScraped);
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Icon name="menu" size={24} color="#000" />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>Productos activos</Text>
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

      {productsScrapedState.isFetching && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 12,
  },
});

export default ProductList;
