import React from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  imageUrl?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}
import {styles} from './styles';

const ItemSectionWrapper = ({
  children,
  imageUrl,
  title,
  description,
}: Props) => {
  return (
    <View style={styles.container}>
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </View>
      )}

      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};

export default ItemSectionWrapper;
