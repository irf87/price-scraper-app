import React, {useEffect} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';

import {useSnackbarStore} from '@components/SnackbarInternal/useSnackbarStore';

const DEFAULT_DURATION = 6000;

interface Props {
  onDismiss?: () => void;
}

function SnackbarInternal({onDismiss = () => {}}: Props) {
  const theme = useTheme();
  const dismiss = useSnackbarStore(state => state.dismiss);
  const visible = useSnackbarStore(state => state.visible);
  const snackbarOptions = useSnackbarStore(state => state.snackbarOptions);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dismiss();
      }, DEFAULT_DURATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={DEFAULT_DURATION}
      style={{
        backgroundColor:
          snackbarOptions.type === 'success'
            ? theme.colors.primary
            : theme.colors.error,
      }}>
      {snackbarOptions.message}
    </Snackbar>
  );
}

export default SnackbarInternal;
