import React from 'react';
import {View, Image, Linking, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-paper';

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
      <View>
        <View style={style.descriptionContainter}>
          <Image
            style={style.img}
            source={{uri: productDetail?.urlImg || ''}}
          />
          <Text variant="bodyMedium" style={style.description}>
            {productDetail?.description}
          </Text>
        </View>
        <Text variant="bodySmall">
          Última actualización: {productDetail?.date}
        </Text>
        <View style={style.currentPriceSection}>
          <Text variant="titleSmall" style={style.currentPrice}>
            Precio actual:
          </Text>
          <Text variant="titleSmall">{productDetail.price}</Text>
        </View>
        <View style={style.priceBehaviourSection}>
          <View>
            <Text variant="bodySmall">Precio Minimo</Text>
            <Text variant="bodySmall">{productScrapedRecord?.minPrice}</Text>
          </View>
          <View>
            <Text variant="bodySmall">Precio Máximo</Text>
            <Text variant="bodySmall">{productScrapedRecord?.maxPrice}</Text>
          </View>
          <View>
            <Text variant="bodySmall">Precio promedio</Text>
            <Text variant="bodySmall">{productScrapedRecord?.avgPrice}</Text>
          </View>
        </View>
        <View style={style.buttonSection}>
          <Text variant="bodySmall">{productDetail?.urlScrapedDomainName}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            Linking.openURL(productDetail?.urlToScrape);
          }}>
          Abrir en el navegador
        </Button>
      </View>
    </ScrollView>
  );
}

export default ProductScrapedDetail;
