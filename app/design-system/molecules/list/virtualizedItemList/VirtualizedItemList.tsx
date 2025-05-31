import React, {useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {Item} from '@design-system/atoms/items/Item';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';
import useVirtualizedList from '@hooks/useVirtualizedList';

interface Props {
  items: ItemProps[];
  onPressItem: (item: ItemProps) => void;
  onRefetch: () => void;
  refreshing?: boolean;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
  keyExtractor?: (item: ItemProps) => string;
  onScroll?: (isScrollingDown: boolean) => void;
}

const VirtualizedItemList = ({
  items,
  onPressItem,
  onRefetch,
  refreshing = false,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 5,
  removeClippedSubviews = true,
  keyExtractor = (item: ItemProps) => item.id.toString(),
  onScroll,
}: Props) => {
  const {listProps} = useVirtualizedList({
    initialNumToRender,
    maxToRenderPerBatch,
    windowSize,
    removeClippedSubviews,
  });
  const [lastScrollY, setLastScrollY] = useState(0);

  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => (
      <Item
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}
        onPress={() => onPressItem(item)}
      />
    ),
    [onPressItem],
  );

  const ItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (onScroll) {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const isScrollingDown = currentScrollY > lastScrollY;
        onScroll(isScrollingDown);
        setLastScrollY(currentScrollY);
      }
    },
    [lastScrollY, onScroll],
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
      }
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      {...listProps}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default VirtualizedItemList;
