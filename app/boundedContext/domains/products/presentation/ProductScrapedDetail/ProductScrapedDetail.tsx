import React from 'react';
import {View, Image, Linking, ScrollView} from 'react-native';
import {Text, Button, Card} from 'react-native-paper';

import {ProductScrapedFormatted} from '@domains/products/application/useProducts';
import {ProductScrapedRecords} from '@domains/products/domain/productRecords';

import style from './styles';

interface Props {
  productDetail: Readonly<ProductScrapedFormatted>;
  productScrapedRecord: Readonly<ProductScrapedRecords>;
}

function ProductScrapedDetail({productDetail, productScrapedRecord}: Props) {
  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.lastUpdateContainer}>
          <Text variant="bodySmall" style={style.lastUpdateText}>
            Última actualización: {productDetail?.date}
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
            Precio actual:
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
                Precio Mínimo
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
                Precio Máximo
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
                Precio Promedio
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
              Linking.openURL(productDetail?.urlToScrape);
            }}
            style={style.button}>
            Abrir en el navegador
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductScrapedDetail;
