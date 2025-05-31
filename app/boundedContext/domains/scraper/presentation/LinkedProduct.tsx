import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import DropDownSelector from '@design-system/atoms/selector/DropDownSelector/DropDownSelector';
import type {DropDownSelectorOption} from '@design-system/atoms/selector/DropDownSelector/DropDownSelector';
import {Controller, useFormContext} from 'react-hook-form';

import {Product} from '@domains/products/domain/product';
import {ProductDetailBySelectorsResponse} from '@domains/scraper/domain/scraper';
import {Item} from '@design-system/atoms/items/Item';

import styles from './linkedProductStyles';

interface Props {
  productDetail?: ProductDetailBySelectorsResponse;
  wasSearch: boolean;
  productsFound: Product[];
  onProductSelected?: (productId: number) => void;
}

const LinkedProduct = ({
  productDetail,
  wasSearch,
  productsFound,
  onProductSelected,
}: Props) => {
  const {control, setValue} = useFormContext();

  const options: DropDownSelectorOption[] = productsFound.map(product => ({
    value: product.id,
    title: product.name,
    imageUrl: product.urlImg,
  }));

  useEffect(() => {
    if (wasSearch && productsFound.length === 1) {
      const productId = productsFound[0].id;
      setValue('linkedProductId', productId);
      onProductSelected?.(productId);
    }
  }, [wasSearch, productsFound, onProductSelected, setValue]);

  return (
    <View style={styles.container}>
      {productDetail?.name && (
        <View style={styles.contentContainer}>
          <Item
            imageUrl={productDetail?.urlImg || ''}
            title={productDetail.name}
            description={productDetail.description}
            onPress={() => {}}
          />
          {wasSearch && productsFound.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.sectionTitle}>Select a product to link:</Text>
              {control ? (
                <Controller
                  control={control}
                  name="linkedProductId"
                  render={({field: {onChange, value}}) => (
                    <DropDownSelector
                      options={options}
                      value={value}
                      onChange={val => {
                        onChange(val);
                        onProductSelected?.(Number(val));
                      }}
                      label="Product"
                      placeholder="Select product"
                    />
                  )}
                />
              ) : (
                <DropDownSelector
                  options={options}
                  value={undefined}
                  onChange={val => onProductSelected?.(Number(val))}
                  label="Product"
                  placeholder="Select product"
                />
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default LinkedProduct;
