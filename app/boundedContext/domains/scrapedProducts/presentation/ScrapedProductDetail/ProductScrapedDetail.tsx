import React, {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  Linking,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Card, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '@navigation/navigationTypes';
import {SCREEN_NAMES} from '@screens/screenTypes';
import {scrapedProductToItemAdapter} from '@domains/products/application/adapters/scrapedProductToItem.adapter';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {ScrapedProductRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';
import ModalBottomSheetForText from '@design-system/molecules/modals/ModalBottomSheetForText/ModalBottomSheetForText';
import ModalBottomSheet from '@design-system/atoms/modals/ModalBottomSheet/ModalBottomSheet';

import style from './styles';

interface Props {
  productDetail: Readonly<ScrapedProduct>;
  productScrapedRecord: Readonly<ScrapedProductRecords>;
}

const screenHeight = Dimensions.get('window').height;

function ProductScrapedDetail({productDetail, productScrapedRecord}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  const handleTextLayout = useCallback((event: any) => {
    const {lines} = event.nativeEvent;
    setIsTextTruncated(lines.length > 10);
  }, []);

  const handleNavigation = () => {
    const item = scrapedProductToItemAdapter(productDetail);
    navigate(SCREEN_NAMES.ITEM_DETAIL, {
      queryFunction: 'getScrapedProductByProductId',
      item,
      screenTitle: t('navigation.products'),
    });
  };

  return (
    <ScrollView>
      <View style={[style.container, {minHeight: screenHeight}]}>
        <View style={style.lastUpdateContainer}>
          <Text variant="bodySmall" style={style.lastUpdateText}>
            {t('scrapedProducts.detail.lastUpdate', {
              date: productDetail?.date,
            })}
          </Text>
        </View>
        <View style={style.productNameContainer}>
          <Text variant="titleLarge" style={style.productName}>
            {productDetail?.name}
          </Text>
        </View>
        <Button mode="text" icon="arrow-right" onPress={handleNavigation}>
          {t('common.go')}
        </Button>
        <View style={style.imageContainer}>
          <TouchableOpacity
            style={style.img}
            onPress={() => {
              if (productDetail.urlImg) {
                setIsImageModalVisible(true);
              }
            }}>
            <Image
              source={{uri: productDetail?.urlImg || ''}}
              style={style.touchableImageContent}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={style.descriptionContainer}>
          <Text
            variant="bodyMedium"
            style={style.description}
            numberOfLines={10}
            ellipsizeMode="tail"
            onTextLayout={handleTextLayout}>
            {productDetail?.description}
          </Text>
          {isTextTruncated && (
            <Button
              mode="text"
              onPress={() => setIsDescriptionModalVisible(true)}
              style={style.readMoreButton}>
              {t('common.readMore')}
            </Button>
          )}
        </View>
        <View style={style.currentPriceSection}>
          <Text variant="titleMedium" style={style.currentPriceLabel}>
            {t('scrapedProducts.detail.currentPrice')}
          </Text>
          <Text variant="headlineMedium" style={style.currentPriceValue}>
            {productDetail.price}
          </Text>
        </View>
        <View style={style.priceBehaviourSection}>
          <Card style={style.priceCard}>
            <Card.Content style={style.priceCardContent}>
              <Text style={style.priceCardIcon}>📉</Text>
              <Text variant="bodySmall" style={style.priceCardTitle}>
                {t('scrapedProducts.detail.minPrice')}
              </Text>
              <Text
                variant="bodyMedium"
                style={style.priceCardValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {productScrapedRecord?.minPrice}
              </Text>
            </Card.Content>
          </Card>
          <Card style={style.priceCard}>
            <Card.Content style={style.priceCardContent}>
              <Text style={style.priceCardIcon}>📈</Text>
              <Text variant="bodySmall" style={style.priceCardTitle}>
                {t('scrapedProducts.detail.maxPrice')}
              </Text>
              <Text
                variant="bodyMedium"
                style={style.priceCardValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {productScrapedRecord?.maxPrice}
              </Text>
            </Card.Content>
          </Card>
          <Card style={style.priceCard}>
            <Card.Content style={style.priceCardContent}>
              <Text style={style.priceCardIcon}>⚖️</Text>
              <Text variant="bodySmall" style={style.priceCardTitle}>
                {t('scrapedProducts.detail.avgPrice')}
              </Text>
              <Text
                variant="bodyMedium"
                style={style.priceCardValue}
                numberOfLines={1}
                ellipsizeMode="tail">
                {productScrapedRecord?.avgPrice}
              </Text>
            </Card.Content>
          </Card>
        </View>
        <View style={style.buttonSection}>
          <Text variant="bodySmall">{productDetail?.urlScrapedDomainName}</Text>
          <Button
            mode="contained"
            onPress={() => {
              Linking.openURL(productDetail?.urlToScrape || '');
            }}>
            {t('scrapedProducts.detail.visitWebsite')}
          </Button>
        </View>
      </View>
      <ModalBottomSheetForText
        isVisible={isDescriptionModalVisible}
        onClose={() => setIsDescriptionModalVisible(false)}
        text={productDetail?.description || ''}
        title={productDetail?.name}
        handleColor={theme.colors.primary}
      />
      <ModalBottomSheet
        isVisible={isImageModalVisible}
        onClose={() => setIsImageModalVisible(false)}
        title={productDetail?.name}
        height="full">
        <Image
          source={{uri: productDetail.urlImg || ''}}
          style={style.modalImage}
        />
      </ModalBottomSheet>
    </ScrollView>
  );
}

export default ProductScrapedDetail;
