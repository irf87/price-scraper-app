import { StackScreenProductDetailProps } from '@domain/navigation';

import { View, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface Props extends StackScreenProductDetailProps<'ProductDetailData'> {}

function ProductDetailData({ route }: Props) {
  const productParams = route.params;

  return (
    <SafeAreaView>
      <Text>Detalle: {productParams?.description}</Text>
      <View>
        <View>
          <Text variant="titleSmall">Precio Minimo</Text>
          <Text variant="titleSmall">$12.00</Text>
          <Text variant="titleSmall">Fecha</Text>
        </View>
        <View>
          <Text variant="titleSmall">Precio Máximo</Text>
          <Text variant="titleSmall">$14.00</Text>
          <Text variant="titleSmall">Fecha</Text>
        </View>
      </View>
      <View>
        <Text variant="labelMedium">{productParams?.urlScrapedDomainName}</Text>
        <Button mode="contained">Ir</Button>
      </View>
    </SafeAreaView>
  )
}

export default ProductDetailData;
