import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useForm, FormProvider} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Modal from '@design-system/molecules/modals/Modal/Modal';
import {Item, ItemWithOptionalId} from '@domains/items/domain/item';
import {ItemUseCase} from '@domains/items/application/itemUseCase';

import {ItemType} from '@domains/items/infrastructure/config/itemsConfig';
import CreateUpdateFields from './CreateUpdateFields';
import {useCreateUpdateItem} from '../application/hooks/useCreateUpdateItem';

import {getTitleByType, getTranslatePreFix} from './getLabelsByType';

interface FormData {
  name: string;
  description: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().default(''),
});

interface CreateUpdateItemModalProps {
  visible: boolean;
  onDismiss: () => void;
  type: ItemType;
  item?: Item;
  itemUseCase: ItemUseCase;
}

const CreateUpdateItemModal: React.FC<CreateUpdateItemModalProps> = ({
  visible,
  onDismiss,
  type,
  item,
  itemUseCase,
}) => {
  const {t} = useTranslation();
  const {createUpdateItem, createUpdateItemState} = useCreateUpdateItem(
    itemUseCase,
    type,
  );
  const titleModal = useMemo(() => getTitleByType(type, !item), [type, item]);
  const prefix = useMemo(() => getTranslatePreFix(type), [type]);

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
    },
  });

  const handleDismiss = () => {
    methods.reset();
    onDismiss();
  };

  const onSubmit = async (data: FormData) => {
    try {
      const itemData: ItemWithOptionalId = item ? {id: item.id, ...data} : data;
      await createUpdateItem(itemData);
      handleDismiss();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleDismiss}
      title={t(titleModal)}
      footerButtons={
        <View style={{marginTop: 16, flexDirection: 'row', gap: 8}}>
          <Button mode="outlined" onPress={handleDismiss}>
            {t('common.cancel')}
          </Button>
          <Button
            loading={createUpdateItemState.isLoading}
            disabled={createUpdateItemState.isLoading}
            mode="contained"
            onPress={methods.handleSubmit(onSubmit)}>
            {item ? t('common.update') : t('common.create')}
          </Button>
        </View>
      }>
      <FormProvider {...methods}>
        <CreateUpdateFields translatePrefix={prefix} />
      </FormProvider>
    </Modal>
  );
};

export default CreateUpdateItemModal;
