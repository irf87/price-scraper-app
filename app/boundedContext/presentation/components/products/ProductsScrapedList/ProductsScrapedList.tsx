/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, View, Image, RefreshControl} from 'react-native';

import {Divider, Text, TouchableRipple} from 'react-native-paper';

import {ProductScrapedFormated} from '@application/products/useProducts';

import style from './styles';

interface Props {
  productsScrapedList: ProductScrapedFormated[];
  onPressProduct: (productScrapedFormated: ProductScrapedFormated) => void;
  onRefetch: () => void;
}

function ProductsScrapedList({
  productsScrapedList,
  onPressProduct,
  onRefetch,
}: Props) {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefetch} />
      }>
      {productsScrapedList.map(productScraped => (
        <TouchableRipple
          key={productScraped.productScrapedId}
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => onPressProduct(productScraped)}>
          <>
            <View style={style.container}>
              <Image
                style={style.img}
                source={{uri: productScraped?.urlImg || ''}}
              />
              <View style={style.item}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={style.itemText}
                  variant="titleSmall">
                  {productScraped.name}
                </Text>
                <Text variant="labelMedium">
                  {productScraped.urlScrapedDomainName}
                </Text>
              </View>
              <View style={style.price}>
                <Text variant="labelMedium">{productScraped.price}</Text>
              </View>
            </View>
            <Divider bold />
          </>
        </TouchableRipple>
      ))}
    </ScrollView>
  );
}

export default ProductsScrapedList;
