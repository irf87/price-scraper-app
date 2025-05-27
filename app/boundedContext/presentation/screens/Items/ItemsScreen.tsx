import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme, AnimatedFAB} from 'react-native-paper';
import Drawer from '@components/Drawer/Drawer';

import NavigationHeader from '@design-system/atoms/navigation/navigationHeader/NavigationHeader';
import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';
import SearchInput from '@design-system/atoms/inputs/SearchInput';

import {useDrawer} from '@hooks/useDrawer';
import {useItemList} from '@domains/items/application/hooks/useItem';
import {itemsAdapter} from '@domains/items/application/itemsAdapter';

import {ItemScreenProps} from './ScreenProps';
import {useItemRepository} from '../../../domains/items/application/hooks/useItemRepository';
import CreateUpdateItemModal from '@domains/items/presentation/CreateUpdateItemModal';
import {Item} from '@domains/items/domain/item';
import useItemCase from '@domains/items/application/hooks/useItemCase';
import SnackbarInternal from '@components/SnackbarInternal/SnackbarInternal';

interface Props {
  route: {params: ItemScreenProps};
}

const ItemsScreen = ({route}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {screenTitle, screenType} = route.params;
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  const {items, itemsState, refetchItems, searchTerm, setSearchTerm} =
    useItemList(useItemRepository(screenType), screenType);

  const itemUseCase = useItemCase(screenType);

  function handleOnPressItem(item: ItemProps) {
    setSelectedItem(item as unknown as Item);
    setIsModalVisible(true);
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

      <View style={styles.searchContainer}>
        <SearchInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={`${t(
            'search.placeholder',
          )} ${screenTitle.toLowerCase()} ...`}
        />
      </View>

      {itemsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <VirtualizedItemList
        items={adaptedItems}
        onPressItem={handleOnPressItem}
        onRefetch={refetchItems}
        refreshing={itemsState.isFetching}
      />

      <AnimatedFAB
        icon="plus"
        label={t('common.create')}
        extended
        onPress={() => {
          setSelectedItem(undefined);
          setIsModalVisible(true);
        }}
        style={styles.fab}
        color={theme.colors.primary}
      />

      <CreateUpdateItemModal
        visible={isModalVisible}
        onDismiss={() => {
          setIsModalVisible(false);
          setSelectedItem(undefined);
        }}
        type={screenType}
        item={selectedItem}
        itemUseCase={itemUseCase}
      />
      <SnackbarInternal />
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
  searchContainer: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});

export default ItemsScreen;
