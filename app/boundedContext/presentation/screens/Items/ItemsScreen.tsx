import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '@navigation/navigationTypes';

import {ActivityIndicator} from 'react-native';
import Drawer from '@components/Drawer/Drawer';

import VirtualizedItemList from '@design-system/molecules/list/virtualizedItemList';
import {ItemProps} from '@design-system/molecules/list/itemList/ItemList';

import {useDrawer} from '@hooks/useDrawer';
import {useItemList} from '@domains/items/application/hooks/useItem';
import {itemsAdapter} from '@domains/items/application/itemsAdapter';

import {ItemScreenProps} from './ScreenProps';
import {
  useItemRepository,
  useGetQueryFunctionForProduct,
} from '@domains/items/application/hooks/useItemRepository';
import CreateUpdateItemModal from '@domains/items/presentation/CreateUpdateItemModal';
import {Item} from '@domains/items/domain/item';
import useItemCase from '@domains/items/application/hooks/useItemCase';
import FloatingButton from '@design-system/atoms/buttons/floatingButton/FloatingButton';
import ScreenLayout from '@design-system/templates/screenLayout/ScreenLayout';
import {SCREEN_NAMES} from '@screens/screenTypes';

interface Props {
  route: {params: ItemScreenProps};
}

const ItemsScreen = ({route}: Props) => {
  const {t} = useTranslation();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const {screenTitle, screenType} = route.params;
  const {isOpen, toggleDrawer, spin} = useDrawer();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const {title, queryFunction} = useGetQueryFunctionForProduct(screenType);

  const {items, itemsState, refetchItems, searchTerm, setSearchTerm} =
    useItemList(useItemRepository(screenType), screenType);

  const itemUseCase = useItemCase(screenType);

  function handleOnPressItem(item: ItemProps) {
    navigate(SCREEN_NAMES.ITEM_DETAIL, {
      queryFunction: queryFunction,
      item,
      screenTitle: t(title),
    });
  }

  const adaptedItems = useMemo(() => {
    return itemsAdapter(items || []);
  }, [items]);

  return (
    <ScreenLayout
      showHeader
      headerTitle={screenTitle}
      onToggleDrawer={toggleDrawer}
      spin={spin}>
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />

      <ScreenLayout.SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={`${t(
          'search.placeholder',
        )} ${screenTitle.toLowerCase()} ...`}
      />

      {itemsState.isFetching && (
        <ActivityIndicator style={{paddingTop: 24}} color="black" />
      )}

      <VirtualizedItemList
        items={adaptedItems}
        onPressItem={handleOnPressItem}
        onRefetch={refetchItems}
        refreshing={itemsState.isFetching}
      />

      <FloatingButton
        icon="plus"
        label={t('common.create')}
        extended
        onPress={() => {
          setSelectedItem(undefined);
          setIsModalVisible(true);
        }}
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
    </ScreenLayout>
  );
};

export default ItemsScreen;
