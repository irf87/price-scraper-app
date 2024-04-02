import { ScrollView, View, Image } from 'react-native';

import { Divider, Text, TouchableRipple } from 'react-native-paper';

import { ProductScrapedFormated } from '@application/products/useProducts';

import style from './styles';

interface Props {
  productsScrapedList: ProductScrapedFormated[];
  onPressProduct: (productScrapedFormated: ProductScrapedFormated) => void;
}

function ProductsScrapedList({ productsScrapedList, onPressProduct }: Props) {

  return (
    <ScrollView>
      {productsScrapedList.map((productScraped) => (
        <TouchableRipple
          key={productScraped.productScrapedId}
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => onPressProduct(productScraped)}
        >
          <>
            <View style={style.container}>
              <Image style={style.img} source={{ uri: productScraped?.urlImg || '' }} />
              <View style={style.item}>
                <Text numberOfLines={1} ellipsizeMode='head' variant="titleSmall">{productScraped.name}</Text>
                <Text variant="labelMedium">{productScraped.urlScrapedDomainName}</Text>
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
  )

}

export default ProductsScrapedList;