import React, {useMemo} from 'react';

import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Drawer from '@components/Drawer/Drawer';

import NavigationHeader from '@design-system/atoms/navigation/navigationHeader/NavigationHeader';
import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';

import {useDrawer} from '@hooks/useDrawer';
import {useItemList} from '@domains/items/application/useItem';
import {itemsAdapter} from '@domains/items/application/itemsAdapter';

import {ItemScreenProps} from './ScreenProps';
import {useItemRepository} from './useItemRepository';

interface Props {
  route: {params: ItemScreenProps};
}

const ItemsScreen = ({route}: Props) => {
  const {screenTitle, screenType} = route.params;
  const {isOpen, toggleDrawer, spin} = useDrawer();

  const {items, itemsState, refetchItems} = useItemList(
    useItemRepository(screenType),
    screenType,
  );

  function handleOnPressItem(item: ItemProps) {
    console.log(`item ${item.id} as been pressed`);
  }

  const adaptedItems = useMemo(() => {
    return itemsAdapter(items || []);
  }, [items]);

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={screenTitle}
        toggleDrawer={toggleDrawer}
        spin={spin}
      />
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      {itemsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <VirtualizedItemList
        items={adaptedItems}
        onPressItem={handleOnPressItem}
        onRefetch={refetchItems}
        refreshing={itemsState.isFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemsScreen;
