import {create} from 'zustand';

type SnackbarOptions = {
  type: 'success' | 'error';
  message: string;
};

type SnackbarState = {
  visible: boolean;
  snackbarOptions: SnackbarOptions;
  show: () => void;
  dismiss: () => void;
  setOptions: (options: SnackbarOptions) => void;
};

export const useSnackbarStore = create<SnackbarState>(set => ({
  visible: false,
  snackbarOptions: {message: '', type: 'success'},
  show: () => set({visible: true}),
  dismiss: () => set({visible: false}),
  setOptions: (options: SnackbarOptions) =>
    set(state => ({
      snackbarOptions: {...state.snackbarOptions, ...options},
    })),
}));
