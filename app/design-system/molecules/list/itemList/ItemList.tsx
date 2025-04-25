import React from 'react';

import {ScrollView, RefreshControl} from 'react-native';

import {Item} from '@design-system/atoms/items/Item';

export interface ItemProps {
  id: string | number;
  imageUrl?: string;
  title: string;
  description?: string;
}

interface Props {
  items: ItemProps[];
  onPressItem: (itemId: string | number) => void;
  onRefetch: () => void;
}

const ItemList = ({items, onPressItem, onRefetch}: Props) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefetch} />
      }>
      {items.map(item => (
        <Item
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
          onPress={() => onPressItem(item.id)}
        />
      ))}
    </ScrollView>
  );
};

export default ItemList;
