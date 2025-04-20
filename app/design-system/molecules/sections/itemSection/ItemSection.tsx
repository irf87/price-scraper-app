import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {Item} from '@design-system/atoms/items/Item';
import {DropDown} from '@design-system/atoms/dropDown/DropDown';
import {styles} from './styles';

interface ItemSectionProps {
  imageUrl?: string;
  title: string;
  description?: string;
  items: Array<{
    id: string;
    imageUrl?: string;
    title: string;
    description: string;
  }>;
  onUpdateItem?: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
}

export const ItemSection: React.FC<ItemSectionProps> = ({
  imageUrl,
  title,
  description,
  items,
  onUpdateItem,
  onDeleteItem,
}) => {
  const {t} = useTranslation();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleOptionsPress = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleCloseDropdown = () => {
    setSelectedItemId(null);
  };

  const dropdownOptions = [
    {
      label: t('common.edit'),
      onPress: () => {
        if (selectedItemId && onUpdateItem) {
          onUpdateItem(selectedItemId);
        }
      },
    },
    {
      label: t('common.delete'),
      onPress: () => {
        if (selectedItemId && onDeleteItem) {
          onDeleteItem(selectedItemId);
        }
      },
    },
  ];

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

      <View style={styles.itemsContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.itemWrapper}>
            <Item
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              showOptions={true}
              onOptionsPress={() => handleOptionsPress(item.id)}
            />
          </View>
        ))}
      </View>

      {selectedItemId && (
        <DropDown options={dropdownOptions} onClose={handleCloseDropdown} />
      )}
    </View>
  );
};
