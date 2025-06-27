import {create} from 'zustand';

interface LoaderState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const useLoaderStore = create<LoaderState>(set => ({
  isLoading: false,
  setLoading: loading => set({isLoading: loading}),
}));

export default useLoaderStore;
