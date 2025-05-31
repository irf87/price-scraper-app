import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useItemAssignmentRepository} from '@domains/items/application/hooks/useItemRepository';
import {ITEMS_QUERY_KEYS} from '@domains/items/infrastructure/config/itemsConfig';
import {useItemAssignment} from '@domains/items/application/hooks/useItemAssignment';
import AddActionSectionsWithChips, {
  Option,
} from '@design-system/molecules/addActionSectionWithChips/AddActionSectionsWithChips';

interface Props {
  productId: number;
  listOptions: Option[];
  categoryOptions: Option[];
}

const ItemActionsPanel = ({productId, listOptions, categoryOptions}: Props) => {
  const {t} = useTranslation();

  const {options: categoriesAssigned, assignItem: assignCategory} =
    useItemAssignment(
      useItemAssignmentRepository(ITEMS_QUERY_KEYS.CATEGORY),
      ITEMS_QUERY_KEYS.CATEGORY,
      productId,
    );

  const {options: listsAssigned, assignItem: assignList} = useItemAssignment(
    useItemAssignmentRepository(ITEMS_QUERY_KEYS.LIST),
    ITEMS_QUERY_KEYS.LIST,
    productId,
  );

  // Filter out already assigned categories
  const filteredCategoryOptions = useMemo(
    () =>
      categoryOptions.filter(
        option => !categoriesAssigned.some(assigned => assigned.value === option.value),
      ),
    [categoryOptions, categoriesAssigned],
  );

  // Filter out already assigned lists
  const filteredListOptions = useMemo(
    () =>
      listOptions.filter(
        option => !listsAssigned.some(assigned => assigned.value === option.value),
      ),
    [listOptions, listsAssigned],
  );

  return (
    <View style={styles.container}>
      <AddActionSectionsWithChips
        label={t('items.actions.addCategoryLabel')}
        options={filteredCategoryOptions}
        selectedOptions={categoriesAssigned}
        actionTitle={t('items.actions.addCategory')}
        onSelect={value => assignCategory(Number(value))}
        onRemove={() => {}}
      />
      <AddActionSectionsWithChips
        label={t('items.actions.addToListLabel')}
        options={filteredListOptions}
        selectedOptions={listsAssigned}
        actionTitle={t('items.actions.addToList')}
        onSelect={value => assignList(Number(value))}
        onRemove={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});

export default ItemActionsPanel;
