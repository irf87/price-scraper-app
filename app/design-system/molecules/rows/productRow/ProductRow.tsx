import React from 'react';
import {View, Image} from 'react-native';

import {Text} from 'react-native-paper';

import style from './styles';

interface Props {
  urlImg?: string;
  name: string;
  urlScrapedDomainName: string;
  price: string;
}

function ProductRow({urlImg, name, urlScrapedDomainName, price}: Props) {
  return (
    <View style={style.container}>
      <Image
        style={style.img}
        source={{uri: urlImg || ''}}
        resizeMode="cover"
      />
      <View style={style.item}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={style.itemText}
          variant="titleMedium">
          {name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          variant="bodySmall"
          style={{opacity: 0.7}}>
          {urlScrapedDomainName}
        </Text>
      </View>
      <View style={style.price}>
        <Text variant="titleMedium">{price}</Text>
      </View>
    </View>
  );
}

export default ProductRow;
