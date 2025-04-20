import React from 'react';
import {View, Image, Linking, ScrollView} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {ScrapedProduct} from '@domains/scrapedProducts/domain/scrapedProduct';
import {ProductScrapedRecords} from '@domains/scrapedProductsRecord/domain/scrapedProductRecord';

import style from './styles';

interface Props {
  productDetail: Readonly<ScrapedProduct>;
  productScrapedRecord: Readonly<ProductScrapedRecords>;
}

function ProductScrapedDetail({productDetail, productScrapedRecord}: Props) {
  const {t} = useTranslation();

  return (
    <ScrollView>
      <View style={style.container}>
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
        <View style={style.imageContainer}>
          <Image
            style={style.img}
            source={{uri: productDetail?.urlImg || ''}}
            resizeMode="cover"
          />
        </View>
        <View style={style.descriptionContainer}>
          <Text variant="bodyMedium" style={style.description}>
            {productDetail?.description}
          </Text>
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
    </ScrollView>
  );
}

export default ProductScrapedDetail;
