import React, {useState, useMemo} from 'react';
import {View} from 'react-native';

import DropDownSelector, {
  DropDownHeight,
} from '@design-system/atoms/selector/DropDownSelector/DropDownSelector';
import type {DropDownSelectorOption} from '@design-system/atoms/selector/DropDownSelector/DropDownSelector';
import {Item as ItemComponent} from '@design-system/atoms/items/Item';
import {Item} from '@domains/items/domain/item';

import styles from './linkedProductStyles';

interface Props {
  items: Item[];
  onItemSelected: (itemId: number) => void;
  label: string;
  placeholder: string;
}

const LinkedItem = ({items, onItemSelected, label, placeholder}: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const options: DropDownSelectorOption[] = useMemo(
    () =>
      items.map(item => ({
        value: item.id,
        title: item.name,
        imageUrl: item.urlImgCover,
      })),
    [items],
  );

  const handleSelectionChange = (value: string | number) => {
    const itemId = Number(value);
    const foundItem = items.find(item => item.id === itemId);
    if (foundItem) {
      setSelectedItem(foundItem);
      onItemSelected(itemId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <DropDownSelector
          options={options}
          value={selectedItem?.id}
          onChange={handleSelectionChange}
          label={label}
          placeholder={placeholder}
          heightVariant={DropDownHeight.HIGH}
        />
        {selectedItem && (
          <ItemComponent
            imageUrl={selectedItem.urlImgCover || ''}
            title={selectedItem.name}
            description={selectedItem.description}
            onPress={() => {}}
          />
        )}
      </View>
    </View>
  );
};

export default LinkedItem;
