import {useMutation, useQueryClient} from 'react-query';
import {useTranslation} from '@core/i18n';
import {Item, ItemWithOptionalId} from '@domains/items/domain/item';
import {ItemUseCase} from '@domains/items/application/itemUseCase';
import {ItemType} from '@domains/items/infrastructure/config/itemsConfig';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

export const useCreateUpdateItem = (
  itemUseCase: ItemUseCase,
  queryKey: ItemType,
) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();

  const setSnackbarOptions = useSnackbarStore(state => state.setOptions);
  const showSnackbar = useSnackbarStore(state => state.show);

  const mutation = useMutation({
    mutationFn: async (data: ItemWithOptionalId) => {
      if (data.id) {
        return itemUseCase.updateItem(data as Item);
      }
      return itemUseCase.createItem(data);
    },
    onSuccess: (response, variables) => {
      // Update the cache with the new item
      queryClient.setQueryData(queryKey, (oldData: Item[] | undefined) => {
        if (!oldData) {
          return [response];
        }

        if (variables.id) {
          // Update existing item
          return oldData.map(item =>
            item.id === variables.id ? response : item,
          );
        }
        setSnackbarOptions({type: 'success', message: t('common.success')});
        showSnackbar();
        // Add new item
        return [...oldData, response];
      });
    },
    onError: error => {
      setSnackbarOptions({type: 'error', message: t('common.error')});
      showSnackbar();
      console.error('Error creating/updating item:', error);
    },
  });

  return {
    createUpdateItem: mutation.mutateAsync,
    createUpdateItemState: {
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
    },
  };
};
