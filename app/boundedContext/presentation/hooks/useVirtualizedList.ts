import {useMemo} from 'react';

interface VirtualizedListConfig {
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  removeClippedSubviews?: boolean;
}

export const useVirtualizedList = (config: VirtualizedListConfig = {}) => {
  const {
    initialNumToRender = 10,
    maxToRenderPerBatch = 10,
    windowSize = 5,
    removeClippedSubviews = true,
  } = config;

  const listProps = useMemo(
    () => ({
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
    }),
    [
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      removeClippedSubviews,
    ],
  );

  return {
    listProps,
  };
};

export default useVirtualizedList;
